import { useDispatch, useSelector } from "react-redux";
import { addAddress, updateAddress } from "../Address/addressSlice";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./AddressBook.css";

export default function AddressBook() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const addresses = useSelector((state) => state.address?.list || []);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    altPhone: "",
    house: "",
    street: "",
    city: "",
    pincode: "",
    district: "",
    
    state: "",
    type: "Home"
  });

  useEffect(() => {
    if (location.state?.address) {
      const a = location.state.address;
      setForm({
        name: a.name || "",
        phone: a.phone || "",
        altPhone: a.altPhone || "",
        house: a.house || "",
        street: a.street || "",
        city: a.city || "",
        pincode: a.pincode || "",
        district: a.district || "",
        state: a.state || "",
        type: a.type || "Home"
      });
      setEditingId(a.id);
    }
  }, [location.state]);

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value
    }));

    if (field === "pincode" && /^[0-9]{6}$/.test(value)) {
      fetch(`https://api.postalpincode.in/pincode/${value}`)
        .then((res) => res.json())
        .then((data) => {
          if (data[0].Status === "Success") {
            const post = data[0].PostOffice[0];
            setForm((prev) => ({
              ...prev,
              state: post.State,
              district: post.District,
              city: post.Block || post.Name
            }));
          } else {
            setForm((prev) => ({
              ...prev,
              state: "",
              district: ""
            }));
            alert("Invalid pincode");
          }
        });
    }
  };

  const isDuplicateAddress = () => {
    return addresses.some((a) => 
      a.id !== editingId &&
      a.house === form.house &&
      a.street === form.street &&
      a.city === form.city &&
      a.pincode === form.pincode &&
      a.district === form.district &&
      a.state === form.state
    );
  };

  const isTypeDuplicate = () => {
    if (form.type !== "Home" && form.type !== "Office") return false;
    return addresses.some((a) => 
      a.id !== editingId && a.type === form.type
    );
  };

  const isValidPhone = (num) => /^[0-9]{10}$/.test(num);
  const isValidPincode = (pin) => /^[0-9]{6}$/.test(pin);

  const handleAdd = () => {
    if (!form.name || !form.phone || !form.state || !form.district) {
      alert("Please fill all required fields");
      return;
    }

    if (!isValidPhone(form.phone)) {
      alert("Phone number must be exactly 10 digits");
      return;
    }

    if (form.altPhone && !isValidPhone(form.altPhone)) {
      alert("Alternate phone must be exactly 10 digits");
      return;
    }

    if (!isValidPincode(form.pincode)) {
      alert("Pincode must be exactly 6 digits");
      return;
    }

    if (isDuplicateAddress()) {
      alert("This address already exists");
      return;
    }

    if (isTypeDuplicate()) {
      alert(`${form.type} address already exists`);
      return;
    }

    if (editingId) {
      dispatch(updateAddress({ id: editingId, ...form }));
      setEditingId(null);
    } else {
      dispatch(addAddress(form));
    }

    setForm({
      name: "",
      phone: "",
      altPhone: "",
      house: "",
      street: "",
      city: "",
      pincode: "",
      district: "",
      state: "",
      type: "Home"
    });

    navigate("/address");
  };

  const handleBack = () => {
    navigate("/address");
  };

  return (
    <div className="address-wrapper">
      <div className="address-container">

        <button className="back-btn" onClick={handleBack}>
          Back to Address
       
        </button>
       

        <h2 className="title">
          {editingId ? "Edit Address" : "Add New Address"}
        </h2>

        <div className="address-form-card">
          <input placeholder="Full Name *" value={form.name} onChange={(e) => handleChange("name", e.target.value)} />
          <input placeholder="Phone Number *" value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} />
          <input placeholder="Alternate Phone" value={form.altPhone} onChange={(e) => handleChange("altPhone", e.target.value)} />
          <input placeholder="Flat / House No" value={form.house} onChange={(e) => handleChange("house", e.target.value)} />
          <input placeholder="Area / Street" value={form.street} onChange={(e) => handleChange("street", e.target.value)} />

          <div className="inline">
            <input placeholder="City" value={form.city} onChange={(e) => handleChange("city", e.target.value)} />
            <input placeholder="Pincode" value={form.pincode} onChange={(e) => handleChange("pincode", e.target.value)} />
          </div>

          <div className="inline">
            <input value={form.state} placeholder="State" disabled />
            <input value={form.district} placeholder="District" disabled />
          </div>

          <div className="type-group">
            {["Home", "Office", "Other"].map((t) => (
              <button
                key={t}
                type="button"
                className={`chip ${form.type === t ? "active" : ""}`}
                onClick={() => handleChange("type", t)}
              >
                {t}
              </button>
            ))}
          </div>

          <button className="primary-btn" onClick={handleAdd}>
            {editingId ? "Update Address" : "Save Address"}
          </button>

        </div>

      </div>
    </div>
  );
}