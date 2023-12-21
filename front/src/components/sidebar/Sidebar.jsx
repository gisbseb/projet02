import { useRef } from "react";
import "./sidebar.scss";
const Sidebar = ({ switchPage, currentPage }) => {
  const sidebarRef = useRef();

  const toggleMenu = (e, page) => {
    sidebarRef.current.classList.toggle("sidebar-open");
    if (e.target.className.includes("burger")) return;
    switchPage(page);
  };

  return (
    <div className="sidebar bg-white container" ref={sidebarRef}>
      <div className="burger" onClick={toggleMenu}>
        Menu
      </div>
      <ul>
        <li
          className={`hover-fade  ${currentPage == "stats" ? "active" : ""}`}
          onClick={(e) => toggleMenu(e, "stats")}
        >
          Dashboard
        </li>

        <li
          className={`hover-fade  ${
            currentPage == "furniture" ? "active" : ""
          }`}
          onClick={(e) => toggleMenu(e, "furniture")}
        >
          Créations
        </li>
        <li
          className={`hover-fade  ${currentPage == "company" ? "active" : ""}`}
          onClick={(e) => toggleMenu(e, "company")}
        >
          Fournisseurs
        </li>
        <li
          className={`hover-fade ${currentPage == "material" ? "active" : ""}`}
          onClick={(e) => toggleMenu(e, "material")}
        >
          Matériaux
        </li>
        <li
          className={`hover-fade  ${
            currentPage == "categorie" ? "active" : ""
          }`}
          onClick={(e) => toggleMenu(e, "categorie")}
        >
          Catégories
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
