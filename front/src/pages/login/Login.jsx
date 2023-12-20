import LoginForm from "./components/LoginForm";
import { useAuth } from "../../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const { setIsAuthenticated, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const handleLogin = async (data) => {
    try {
      const response = await fetch("http://localhost:8000/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("err");
      }
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/dashboard"} />;
  }
  return (
    <div className="login page">
      <LoginForm handleLogin={handleLogin} />
    </div>
  );
};

export default Login;
