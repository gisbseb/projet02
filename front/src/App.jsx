import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Navbar from "./components/navbar/Navbar";
import Login from "./pages/login/Login";
function App() {
  return (
    <div className="app bg-light regular">
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Index" element={<p>Super 2</p>} />
      </Routes>
    </div>
  );
}

export default App;
