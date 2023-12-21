import { useEffect } from "react";
import { useSnackbar } from "../../../context/SnackBarContext";

const IncrementFurniture = ({ furnitureId, refetch, materials }) => {
  const { addSnackbar } = useSnackbar();
  const handleIncrement = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/furniture/increment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: furnitureId }),
          credentials: "include",
        }
      );
      const responseData = await response.json();
      addSnackbar(responseData.message, responseData.className);
    } catch (error) {
      console.error("err:", error.message);
    }

    refetch();
  };

  useEffect(() => {
    console.log(materials);
  }, [materials]);

  const missingMaterials = materials
    .filter(
      (material) => material.stock < material.Furniture_Material.materialCount
    )
    .map((material) => (
      <p key={material.id}>
        Il vous manque{" "}
        {material.Furniture_Material.materialCount - material.stock}{" "}
        {material.name}
      </p>
    ));

  return (
    <>
      {missingMaterials.length === 0 ? (
        <button onClick={handleIncrement}>Ajouter</button>
      ) : (
        missingMaterials
      )}
    </>
  );
};

export default IncrementFurniture;
