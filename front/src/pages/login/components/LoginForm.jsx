import { useState } from "react";
import "./LoginForm.scss";
import { useNavigate } from "react-router-dom";
const LoginForm = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <form className="login-form container bg-white" onSubmit={handleSubmit}>
      <div className="form-group ">
        <label htmlFor="username">Identifiant :</label>
        <input
          id="username"
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Mot de passe :</label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Connexion</button>
    </form>
  );
};

export default LoginForm;
