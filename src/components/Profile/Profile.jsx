import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import avatar from "../../assets/avatar.png";

export default function Profile({
  clothingItems,
  onCardClick,
  onAddItemClick,
}) {
  return (
    <section className="profile">
      <SideBar />
      <div className="profile__mobile-header">
        <div className="profile__user-row">
          <img className="profile__mobile-avatar" src={avatar} alt="avatar" />
          <div className="profile__mobile-username">Hunter Evonosky</div>
        </div>
        <button className="profile__mobile-change" type="button">
          Change profile data
        </button>
        <button className="profile__mobile-logout" type="button">
          Log out
        </button>
      </div>
      <div className="profile__main">
        <div className="profile__divider" />

        <div className="profile__items-row">
          <p className="profile__items-text">Your items</p>
          <button
            className="profile__items-add"
            onClick={onAddItemClick}
            type="button"
          >
            + Add new
          </button>
        </div>

        <div className="profile__cards">
          <ClothesSection
            onCardClick={onCardClick}
            clothingItems={clothingItems}
            onAddItemClick={onAddItemClick}
            hideHeader={true}
          />
        </div>
      </div>
    </section>
  );
}
