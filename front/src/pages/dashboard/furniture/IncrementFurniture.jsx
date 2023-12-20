import { useEffect } from "react";

const IncrementFurniture = ({ furnitureId, refetch, materials }) => {
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

      if (!response.ok) {
        throw new Error("Echec");
      }
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
        <span onClick={handleIncrement} className="add hover-fade">
          +
        </span>
      ) : (
        missingMaterials
      )}
    </>
  );
};

export default IncrementFurniture;
