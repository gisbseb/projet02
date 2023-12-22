import React, { useState, createContext, useEffect, useContext } from "react";
import Snackbar from "../components/Snackbar/Snackbar";

const SnackBarContext = createContext();

export const SnackBarProvider = ({ children }) => {
  const [snackBarElements, setSnackBarElements] = useState([]);

  const addSnackbar = (message, state, duration = 6000) => {
    const id = Date.now();
    setSnackBarElements([
      ...snackBarElements,
      { id, message, state, duration },
    ]);
  };

  const removeSnackbar = (id) => {
    setSnackBarElements((prevElements) =>
      prevElements.filter((el) => el.id !== id)
    );
  };

  const values = {
    snackBarElements,
    setSnackBarElements,
    addSnackbar,
    removeSnackbar,
  };

  const snackbar = snackBarElements.map((el) => {
    return (
      <Snackbar
        key={el.id}
        message={el.message}
        state={el.state}
        duration={el.duration}
        onClose={() => removeSnackbar(el.id)}
      />
    );
  });

  return (
    <SnackBarContext.Provider value={values}>
      {children}
      <div className="snackbar-container">{snackbar}</div>
    </SnackBarContext.Provider>
  );
};

export const useSnackbar = () => {
  return useContext(SnackBarContext);
};
