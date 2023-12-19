import { NavLink } from "react-router-dom";
import "./Navbar.scss";
const logoUrl = "src/assets/logo.png";
const userUrl = "src/assets/icones/user.png";
const AdminNavbar = () => {
  return (
    <nav className="navbar bg-white">
      <NavLink to={"/"} className="hover-fade">
        <img className="logo" src={logoUrl} />
      </NavLink>
      <ul>
        <li>
          <img className="icone hover-fade" src={userUrl} alt="utilisateur" />
        </li>
        <li>
          <NavLink to={"/"}>
            <button>Déconnexion</button>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
