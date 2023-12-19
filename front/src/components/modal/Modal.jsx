export const Modal = ({ setIsOpen, children }) => {
  return (
    <div className="modal">
      <button onClick={() => setIsOpen(false)}> close</button>
      <div className="container">{children}</div>
    </div>
  );
};
