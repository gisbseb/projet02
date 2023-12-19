import { useEffect } from "react";
import "./card.scss";
const Card = ({ data, handleAddFilters, filters }) => {
  return (
    <div className="container card bg-white">
      <div>
        <div className="card-img">Img</div>
      </div>
      <h2>{data.Categorie.name + " " + data.name}</h2>
      <div className="keyword-container">
        {data.Materials.map((material, idx) => {
          const isMaterialInFilters = filters.includes(material.name);
          return (
            <span
              onClick={() => handleAddFilters(material.name)}
              key={idx}
              className={`keyword hover-fade ${
                isMaterialInFilters ? "selected" : ""
              }`}
            >
              {material.name}
            </span>
          );
        })}
      </div>

      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis ab
        numquam veniam eligendi tenetur.
      </p>
    </div>
  );
};

export default Card;
