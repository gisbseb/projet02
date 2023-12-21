import { useEffect } from "react";
import "./card.scss";
import { Link, NavLink } from "react-router-dom";
const Card = ({ data }) => {
  return (
    <div className="container card bg-white">
      <div>
        <img
          className="card-img"
          src={`http://localhost:8000/images/${data.filename}`}
        />
      </div>
      <h2>{data.Categorie.name + " " + data.name}</h2>
      <div className="keyword-container">
        {data.Materials.map((material, idx) => {
          return (
            <NavLink
              to={`/material/${material.id}`}
              key={idx}
              className={`keyword hover-fade `}
            >
              {material.name}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default Card;
