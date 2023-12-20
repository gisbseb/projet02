import { Outlet } from "react-router-dom";
import "./layout.scss";
import Navbar from "./navbar/Navbar";

const AdminLayout = () => {
  return (
    <>
      <Navbar />
      <div className="admin-layout">
        <Outlet />
      </div>
    </>
  );
};

export default AdminLayout;
