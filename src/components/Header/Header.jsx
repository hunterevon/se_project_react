import "./Header.css";
import logo from "../../assets/wtwr-logo.svg";
import avatar from "../../assets/avatar.png";

function Header({ handleAddClick }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="wtwr logo" />
      <p className="header__date-location">DATE, LOCATION</p>
      <button
        onClick={handleAddClick}
        className="header__add-clothes-btn"
        type="button"
      >
        + Add Clothes
      </button>
      <div className="header__user-container">
        <p className="header__username">Hunter Evonosky</p>
        <img src={avatar} alt="Hunter Evonosky" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
