import "./modal.scss";
export const Modal = ({ isOpen, setIsOpen, children }) => {
  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="container">
            <button className="close-modal" onClick={() => setIsOpen(false)}>
              <span>+</span>
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};
