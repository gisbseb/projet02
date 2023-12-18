import { Routes, Route } from "react-router-dom";
import "./App.scss";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<p>Super page</p>} />
        <Route path="/Index" element={<p>Super 2</p>} />
      </Routes>
    </>
  );
}

export default App;
