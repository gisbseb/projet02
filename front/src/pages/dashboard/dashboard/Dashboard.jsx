import { useState } from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import Categorie from "../categorie/Categorie";
import Company from "../company/Company";
import Furniture from "../furniture/Furniture";
import Material from "../material/Material";
import "./dashboard.scss";
import Stats from "../Stats/Stats";

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState("stats");

  const switchPage = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="dashboard">
      <Sidebar switchPage={switchPage} currentPage={currentPage} />
      <div className="content">
        <Stats currentPage={currentPage} pageTitle="stats" />
        <Furniture currentPage={currentPage} pageTitle="furniture" />
        <Company currentPage={currentPage} pageTitle="company" />
        <Categorie currentPage={currentPage} pageTitle="categorie" />
        <Material currentPage={currentPage} pageTitle="material" />
      </div>
    </div>
  );
};

export default Dashboard;
