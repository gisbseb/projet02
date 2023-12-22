import { NavLink } from "react-router-dom";
import "./Navbar.scss";
import { useAuth } from "../../context/AuthContext";
const logoUrl = "src/assets/logo.png";

const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated, logout } = useAuth();
  return (
    <nav className="navbar bg-white">
      <div>
        <NavLink to={"/"} className="hover-fade">
          <img className="logo" src={logoUrl} />
        </NavLink>
      </div>
      <ul>
        {!isAuthenticated ? (
          <li className="hover-fade">
            <NavLink to={"/connexion"}>Connexion</NavLink>
          </li>
        ) : (
          <>
            <li className="hover-fade">
              <NavLink to={"/dashboard"}>Dashboard</NavLink>
            </li>
            <li className="hover-fade" onClick={logout}>
              Déconnexion
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
