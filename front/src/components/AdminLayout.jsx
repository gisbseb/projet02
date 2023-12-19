import { Outlet } from "react-router-dom";
import "./layout.scss";
import AdminNavbar from "./navbar/AdminNavbar";

const AdminLayout = () => {
  return (
    <>
      <AdminNavbar />
      <div className="admin-layout">
        <Outlet />
      </div>
    </>
  );
};

export default AdminLayout;
