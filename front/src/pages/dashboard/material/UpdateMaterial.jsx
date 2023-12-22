import { useEffect, useState } from "react";
import { useSnackbar } from "../../../context/SnackBarContext";

const UpdateMaterial = ({ material, setIsOpen, refetch }) => {
  const [newDescription, setNewDescription] = useState(material.description);
  const { addSnackbar } = useSnackbar();
  const updateMaterial = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8000/material`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          materialId: material.id,
          description: newDescription,
        }),
        credentials: "include",
      });

      const responseData = await response.json();
      addSnackbar(responseData.message, responseData.className);
    } catch (error) {
      console.error("Erreur", error.message);
    }
    refetch("http://localhost:8000/material");
    setIsOpen(false);
  };

  return (
    <form onSubmit={(e) => updateMaterial(e)}>
      <h2>Modification: {material.name}</h2>
      <div className="form-group">
        <textarea
          style={{ margin: 1 + "em auto" }}
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
      </div>

      <button disabled={newDescription === material.description}>
        Modifier
      </button>
    </form>
  );
};

export default UpdateMaterial;
