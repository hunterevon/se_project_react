import "./ItemModal.css";

function ItemModal({ isOpen, onClose, card, onDelete }) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close modal__close_image"
        ></button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
          <button type="button" onClick={onDelete} className="modal__delete">
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
