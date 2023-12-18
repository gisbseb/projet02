import { useState } from "react";
import "./LoginForm.scss";
const LoginForm = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form className="login-form container">
      <div className="form-group ">
        <label htmlFor="username">Identifiant</label>
        <input
          id="username"
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Mot de passe</label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
    </form>
  );
};

export default LoginForm;
