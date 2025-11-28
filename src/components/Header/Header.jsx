import "./Header.css";
import { NavLink } from "react-router-dom";
import logo from "../../assets/wtwr-logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({ handleAddClick, weatherData }) {
  const username = "Hunter Evonosky";
  const avatarDefault = avatar;

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <NavLink to="/">
        <img className="header__logo" src={logo} alt="wtwr logo" />
      </NavLink>
      <p className="header__date-location">
        <span>{currentDate}</span>, <span>{weatherData.city}</span>
      </p>
      <ToggleSwitch />
      <button
        onClick={handleAddClick}
        className="header__add-clothes-btn"
        type="button"
      >
        + Add Clothes
      </button>
      <NavLink className="header__profile_nav-link" to="/profile">
        <div className="header__user-container">
          <div className="header__username">{username}</div>
          {avatarDefault ? (
            <img
              className="header__avatar"
              src={avatarDefault || avatar}
              alt="user avatar"
            />
          ) : (
            <span className="header__avatar">
              {username?.toUpperCase().charAt(0) || ""}
            </span>
          )}
        </div>
      </NavLink>
    </header>
  );
}

export default Header;
