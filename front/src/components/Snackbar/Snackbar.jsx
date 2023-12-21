import React, { useEffect } from "react";
import "./Snackbar.scss";
const Snackbar = ({ state, message, duration, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`snackbar-item ${state}`}
      style={{ animationDuration: duration + "ms" }}
    >
      <p>{message}</p>
    </div>
  );
};

export default Snackbar;
