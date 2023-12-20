import { Routes, Route } from "react-router-dom";
import "./App.scss";

import Login from "./pages/login/Login";
import AdminLayout from "./components/adminLayout";

import Layout from "./components/layout";
import Homepage from "./pages/homepage/Homepage";
import Dashboard from "./pages/dashboard/dashboard/Dashboard";
import MaterialPage from "./pages/material/MaterialPage";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <div className="app bg-light regular">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="/material/:materialId" element={<MaterialPage />} />
          <Route path="connexion" element={<Login />} />
        </Route>
        <Route path="/dashboard" element={<p>Welcome</p>} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
