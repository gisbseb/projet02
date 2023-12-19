import { useEffect, useState } from "react";
import Card from "./components/Card";
import "./Homepage.scss";
import useFetch from "../../hooks/useFetch";
import Material from "../dashboard/material/Material";
import Furniture from "../dashboard/furniture/Furniture";
const Homepage = () => {
  const [filteredData, setFilteredData] = useState();
  const [filters, setFilters] = useState([]);
  useEffect(() => {
    console.log(filters);
  }, [filters]);
  const { data, loading, error } = useFetch("http://localhost:8000/furniture");

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur lors du chargement des données.</p>;

  const handleRemoveFilter = (filter) => {
    const newFilters = filters.filter((el) => el != filter);
    setFilters(newFilters);
  };
  const handleAddFilters = (materialName) => {
    console.log("add");
    if (!filters.includes(materialName)) {
      setFilters([...filters, materialName]);
    }
  };
  let content = null;

  if (data && data.length > 0) {
    const filteredData = data.filter((furniture) => {
      return filters.every((filter) =>
        furniture.Materials.some(
          (material) => material.name.toLowerCase() === filter.toLowerCase()
        )
      );
    });

    if (filteredData.length > 0) {
      content = (
        <div className="card-container">
          {filteredData.map((furniture, idx) => (
            <Card
              key={idx}
              data={furniture}
              filters={filters}
              handleAddFilters={handleAddFilters}
            />
          ))}
        </div>
      );
    } else {
      content = <p>Aucun résultat trouvé pour les filtres actuels.</p>;
    }
  }

  return (
    <div className="homepage">
      <div className="filters">
        {filters &&
          filters.map((filter, idx) => {
            return (
              <div
                className="filter"
                key={idx}
                onClick={() => handleRemoveFilter(filter)}
              >
                <span>+</span>
                {filter}
              </div>
            );
          })}
      </div>
      {content}
    </div>
  );
};

export default Homepage;
