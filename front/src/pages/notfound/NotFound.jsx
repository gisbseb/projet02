import { NavLink } from "react-router-dom";

export const NotFound = () => {
  return (
    <div
      className="404 page"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 100 + "vh",
      }}
    >
      <div className="container" style={{ textAlign: "center" }}>
        <NavLink to="/">
          <h1 style={{ fontSize: 80 + "px" }}>404</h1>
          revenir en lieu sur
        </NavLink>
      </div>
    </div>
  );
};
