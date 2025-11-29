import "./ConfirmationModal.css";

function ConfirmationModal({ isOpen, onClose, onDelete, onCancel }) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__confirmation">
        <button
          onClick={onClose}
          type="button"
          className="modal__confirmation_close modal__confirmation_close_image"
        ></button>
        <h2 className="modal__confirmation_text">
          Are you sure you want to delete this item? <br></br>This action is
          irreversible.
        </h2>
        <button
          type="button"
          onClick={onDelete}
          className=" modal__confirmation_button modal__confirmation_button_delete"
        >
          Yes, delete item
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="modal__confirmation_button modal__confirmation_button_cancel"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ConfirmationModal;
