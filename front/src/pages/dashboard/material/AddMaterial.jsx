import { useEffect, useState } from "react";
import { useSnackbar } from "../../../context/SnackBarContext";

const AddMaterial = ({ material, setIsOpen, refetch }) => {
  const [materialToAdd, setMaterialToAdd] = useState(0);
  const { addSnackbar } = useSnackbar();
  const addMaterial = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/material", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          materialId: material.id,
          count: materialToAdd,
        }),
        credentials: "include",
      });

      const responseData = await response.json();
      addSnackbar(responseData.message, responseData.className);
    } catch (error) {
      console.error("Error creating material");
    }
    refetch("http://localhost:8000/material");
    setIsOpen(false);
  };

  return (
    <form onSubmit={(e) => addMaterial(e)}>
      <h2>Commande: {material.name}</h2>

      <input
        style={{ margin: 1 + "em auto" }}
        id="number"
        type="number"
        min="1"
        max="100"
        value={materialToAdd}
        onChange={(e) => setMaterialToAdd(e.target.value)}
      />
      <button disabled={materialToAdd == 0}>Commander</button>
    </form>
  );
};

export default AddMaterial;
