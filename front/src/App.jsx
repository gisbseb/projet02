import { Routes, Route } from "react-router-dom";
import "./App.scss";

import Login from "./pages/login/Login";
import AdminLayout from "./components/adminLayout";

import Layout from "./components/layout";
import Homepage from "./pages/homepage/Homepage";
import Dashboard from "./pages/dashboard/dashboard/Dashboard";

function App() {
  return (
    <div className="app bg-light regular">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="connexion" element={<Login />} />
        </Route>
        <Route path="/dashboard" element={<p>Welcome</p>} />

        <Route path="/dashboard" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
