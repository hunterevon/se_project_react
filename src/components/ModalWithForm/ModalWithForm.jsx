import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  name,
  onClose,
  onSubmit,
  isFormValid,
}) {
  return (
    <div className={`modal modal_type_${name} ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
        ></button>
        <h2 className="modal__title">{title}</h2>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <button
            type="submit"
            className="modal__submit"
            disabled={!isFormValid}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
