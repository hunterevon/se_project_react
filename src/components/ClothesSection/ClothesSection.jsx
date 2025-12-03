import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

export default function ClothesSection({
  clothingItems,
  onCardClick,
  onAddItemClick,
  hideHeader = false,
}) {
  return (
    <div className="clothes-section clothes-section_mobile">
      {!hideHeader && (
        <>
          <div className="clothes-section__row">
            <p className="clothes-section__items">Your items</p>
            <button
              className="clothes-section__button"
              onClick={onAddItemClick}
            >
              + Add new
            </button>
          </div>
          <div className="clothes-section__row__mobile">
            <p className="clothes-section__items_mobile">Your items</p>
            <button
              className="clothes-section__button_mobile"
              onClick={onAddItemClick}
            >
              + Add new
            </button>
          </div>
        </>
      )}
      <ul className="clothes-section__list">
        {clothingItems.map((item) => {
          return (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          );
        })}
      </ul>
      <ul className="clothes-section__list_mobile">
        {clothingItems.map((item) => {
          return (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          );
        })}
      </ul>
    </div>
  );
}
