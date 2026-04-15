import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearMessages } from "./authSlice";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import Popup from "./Popup";
import "./auth.css";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [popup, setPopup] = useState({
    message: "",
    type: ""
  });

  const [shouldNavigate, setShouldNavigate] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setPopup({ message: "Email and password required", type: "error" });
      return;
    }

    dispatch(loginUser(form));
  };

  useEffect(() => {
    if (success) {
      setPopup({ message: success, type: "success" });
      setShouldNavigate(true);

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
        <h2 className="authsign">Login</h2>

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

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="link" onClick={() => navigate("/signup")}>
          Don't have account? Signup
        </p>
      </form>

      <Popup
        message={popup.message}
        type={popup.type}
        autoClose={true}
        onClose={() => setPopup({ message: "", type: "" })}
        onSuccess={() => {
          if (shouldNavigate) {
            navigate("/home");
          }
        }}
      />
    </div>
  );
}

export default Login;