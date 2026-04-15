import { useEffect } from "react";

function Popup({
  message,
  type = "info",
  onClose,
  onSuccess,
  autoClose = false,
  autoCloseTime = 2500
}) {
  if (!message) return null;

  const colors = {
    success: "#16a34a",
    error: "#dc2626",
    warning: "#f59e0b",
    info: "#2563eb"
  };

  const icons = {
    success: "✅",
    error: "❌",
    warning: "⚠️",
    info: "ℹ️"
  };

  const handleClose = () => {
    if (type === "success" && onSuccess) {
      onSuccess();
    }
    onClose();
  };

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(handleClose, autoCloseTime);
      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseTime, message, type]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999999
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "25px 30px",
          borderRadius: "10px",
          minWidth: "320px",
          textAlign: "center",
          borderLeft: `6px solid ${colors[type] || "gray"}`,
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
        }}
      >
        <p
          style={{
            marginBottom: "20px",
            fontSize: "16px",
            fontWeight: "500"
          }}
        >
          {icons[type]} {message}
        </p>

        {!autoClose && (
          <button
            onClick={handleClose}
            style={{
              padding: "8px 20px",
              border: "none",
              borderRadius: "6px",
              background: colors[type],
              color: "#fff",
              cursor: "pointer"
            }}
          >
            OK
          </button>
        )}
      </div>
    </div>
  );
}

export default Popup;