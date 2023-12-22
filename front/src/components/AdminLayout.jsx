import { Outlet } from "react-router-dom";
import "./layout.scss";
import Navbar from "./navbar/Navbar";

const AdminLayout = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="admin-layout">
        <Outlet />
      </main>
    </>
  );
};

export default AdminLayout;
