import "./Header.css";
import { NavLink } from "react-router-dom";
import logo from "../../assets/wtwr-logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { useEffect, useRef } from "react";

function Header({
  handleAddClick,
  weatherData,
  mobileMenu,
  isMobileMenuOpened,
}) {
  const username = "Hunter Evonosky";
  const avatarDefault = avatar;

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const navRef = useRef(null);

  useEffect(() => {
    if (!isMobileMenuOpened || !navRef.current) return;

    const cardsText = document.querySelector(".cards__text");
    if (!cardsText) return;

    const reposition = () => {
      if (!navRef.current) return;
      const cardsRect = cardsText.getBoundingClientRect();

      navRef.current.style.position = "fixed";
      navRef.current.style.left = "50%";
      navRef.current.style.zIndex = 3000;
      navRef.current.style.width = "calc(100% - 80px)";
      navRef.current.style.maxWidth = "1360px";

      const popupHeight = navRef.current.offsetHeight || 0;
      const desiredBottom = cardsRect.top - 20;

      let computedTop = Math.round(desiredBottom - popupHeight);
      if (computedTop < 8) computedTop = 8;

      navRef.current.style.maxHeight = "";
      navRef.current.style.overflowY = "";

      navRef.current.style.top = `${computedTop}px`;
    };

    requestAnimationFrame(reposition);
    window.addEventListener("resize", reposition);
    window.addEventListener("scroll", reposition, { passive: true });

    return () => {
      window.removeEventListener("resize", reposition);
      window.removeEventListener("scroll", reposition);
      if (!navRef.current) return;
      navRef.current.style.position = "";
      navRef.current.style.left = "";
      navRef.current.style.top = "";
      navRef.current.style.zIndex = "";
      navRef.current.style.width = "";
      navRef.current.style.maxWidth = "";
    };
  }, [isMobileMenuOpened]);

  return (
    <header className="header">
      <NavLink to="/">
        <img className="header__logo" src={logo} alt="wtwr logo" />
      </NavLink>
      <p className="header__date-location">
        <span>{currentDate}</span>, <span>{weatherData.city}</span>
      </p>
      {!isMobileMenuOpened ? (
        <button onClick={mobileMenu} className="header__menu-btn"></button>
      ) : null}

      <div
        ref={navRef}
        className={`header__nav ${
          isMobileMenuOpened ? "header__nav_opened" : ""
        }`}
      >
        <button
          onClick={mobileMenu}
          aria-label="Close menu"
          className="header__nav-close"
          type="button"
        ></button>

        <NavLink
          className="header__profile_nav-link"
          to="/profile"
          onClick={() => {
            if (isMobileMenuOpened) mobileMenu();
          }}
        >
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
        <button
          onClick={handleAddClick}
          className="header__add-clothes-btn"
          type="button"
        >
          + Add Clothes
        </button>

        <div className="header__toggle">
          <ToggleSwitch />
        </div>
      </div>

      <div className="header__desktop">
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
      </div>
    </header>
  );
}

export default Header;
