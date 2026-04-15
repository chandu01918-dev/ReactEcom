import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser, clearMessages } from "./authSlice";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import Popup from "./Popup";
import "./auth.css";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    joinAsSeller: true
  });

  const [popup, setPopup] = useState({
    message: "",
    type: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.firstName ||
      !form.lastName ||
      !form.username ||
      !form.email ||
      !form.password
    ) {
      setPopup({ message: "All fields are required", type: "error" });
      return;
    }

    if (form.password !== form.confirmPassword) {
      setPopup({ message: "Passwords do not match", type: "error" });
      return;
    }

    dispatch(signupUser(form));
  };

  useEffect(() => {
    if (success) {
      setPopup({ message: success, type: "success" });

      setTimeout(() => {
        dispatch(clearMessages());
      }, 0);
    }

    if (error) {
      setPopup({ message: error, type: "error" });

      setTimeout(() => {
        dispatch(clearMessages());
      }, 0);
    }
  }, [success, error, dispatch]);

  return (
    <div className="authPage">
      <form className="authBox" onSubmit={handleSubmit}>
        <h2 className="authsign">Create Account</h2>

        <div className="inputGroup">
          <FaUser className="inputIcon" />
          <input
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
          />
        </div>

        <div className="inputGroup">
          <FaUser className="inputIcon" />
          <input
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
          />
        </div>

        <div className="inputGroup">
          <FaUser className="inputIcon" />
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
          />
        </div>

        <div className="inputGroup">
          <FaEnvelope className="inputIcon" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="inputGroup">
          <FaLock className="inputIcon" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <div className="inputGroup">
          <FaLock className="inputIcon" />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Account"}
        </button>

        <p className="link" onClick={() => navigate("/login")}>
          Already have account? Login
        </p>
      </form>

      <Popup
        message={popup.message}
        type={popup.type}
        autoClose={true}
        onClose={() => setPopup({ message: "", type: "" })}
        onSuccess={() => navigate("/login")}
      />
    </div>
  );
}

export default Signup;