import { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import "./newFurniture.scss";
const NewFurniture = ({ setIsOpen, refetch }) => {
  const [furnitureData, setFurnitureData] = useState({
    name: "",
    materials: [],
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFurnitureData({ ...furnitureData, [name]: value });
  };
  const handleMaterialChange = (materialId, quantity) => {
    const existingMaterialIndex = furnitureData.materials.findIndex(
      (material) => material.id === materialId
    );

    if (existingMaterialIndex !== -1) {
      const updatedMaterials = [...furnitureData.materials];
      updatedMaterials[existingMaterialIndex].quantity = quantity;
      setFurnitureData({
        ...furnitureData,
        materials: updatedMaterials,
      });
    } else {
      setFurnitureData({
        ...furnitureData,
        materials: [...furnitureData.materials, { id: materialId, quantity }],
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/furniture", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...furnitureData }),
      });

      if (!response.ok) {
        throw new Error("Failed to create a new material");
      }

      console.log("Material created successfully");
    } catch (error) {
      console.error("Error creating material:", error.message);
    }
    refetch();
    setIsOpen(false);
  };
  const {
    data: materials,
    loading: materialsLoading,
    error: materialsError,
  } = useFetch("http://localhost:8000/material");
  const {
    data: categories,
    loading: catLoading,
    error: catError,
  } = useFetch("http://localhost:8000/categorie");
  useEffect(() => {
    console.log(materials);
    console.log(categories);
  }, [materials, categories]);
  return (
    <form onSubmit={handleSubmit}>
      <div className="newFurniture">
        <div className="form-group  ">
          <label htmlFor="name"> Nom</label>
          <br />
          <input
            id="name"
            type="text"
            name="name"
            value={furnitureData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Catégorie</label>
          <br />
          <select
            id="category"
            name="category"
            value={furnitureData.category}
            onChange={handleChange}
          >
            {catLoading && <option>Loading categories...</option>}
            {catError && <option>Error loading categories</option>}

            {categories && (
              <>
                <option value="" disabled selected>
                  Sélectionner une catégorie
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </>
            )}
          </select>
        </div>

        <div className="form-group  ">
          <label htmlFor="materials">Matériaux</label>
          <div className="materials-group">
            {materialsLoading && <p>Loading materials...</p>}
            {materialsError && <p>Error loading materials</p>}

            {materials &&
              materials.map((material) => (
                <div key={material.id}>
                  {material.stock === 0 ? (
                    <p>Aucun {material.name} restant</p>
                  ) : (
                    <div className="form-group">
                      <label htmlFor={`material-${material.id}`}>
                        {material.name}
                      </label>
                      <input
                        type="number" // Change this to a number input
                        id={`material-${material.id}`}
                        name={`material-${material.id}`}
                        value={
                          furnitureData.materials.find(
                            (m) => m.id === material.id
                          )?.quantity || 0
                        }
                        min={0}
                        max={material.stock}
                        onChange={(e) =>
                          handleMaterialChange(material.id, e.target.value)
                        }
                      />
                      <p>
                        Il vous reste {material.stock + " " + material.name}
                      </p>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
      <button className="btn-center" type="submit">
        Ajouter
      </button>
    </form>
  );
};

export default NewFurniture;
