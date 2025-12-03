import "./Header.css";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
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
  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const dividerRef = useRef(null);
  const dateRef = useRef(null);
  const menuBtnRef = useRef(null);
  const location = useLocation();
  const isProfile = location && location.pathname === "/profile";

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

  useEffect(() => {
    const updateDateMax = () => {
      if (!dateRef.current || !logoRef.current) return;
      const vw = window.innerWidth;
      if (vw > 768) {
        dateRef.current.style.maxWidth = "";
        return;
      }

      const logoRect = logoRef.current.getBoundingClientRect();

      const menuEl =
        menuBtnRef.current || document.querySelector(".header__menu-btn");
      if (!menuEl) {
        dateRef.current.style.maxWidth = "";
        return;
      }
      const menuRect = menuEl.getBoundingClientRect();

      const gapBetweenLogoAndDate = 12;
      const safetyBuffer = 8;
      let available = Math.max(
        0,
        Math.floor(
          menuRect.left -
            (logoRect.right + gapBetweenLogoAndDate + safetyBuffer)
        )
      );

      if (available < 24) available = 24;

      dateRef.current.style.maxWidth = `${available}px`;
    };

    updateDateMax();
    window.addEventListener("resize", updateDateMax);
    window.addEventListener("scroll", updateDateMax, { passive: true });

    const header = headerRef.current;
    let mo;
    if (header && window.MutationObserver) {
      mo = new MutationObserver(updateDateMax);
      mo.observe(header, { childList: true, subtree: true, attributes: true });
    }

    return () => {
      window.removeEventListener("resize", updateDateMax);
      window.removeEventListener("scroll", updateDateMax);
      if (mo) mo.disconnect();
      if (dateRef.current) dateRef.current.style.maxWidth = "";
    };
  }, []);

  useEffect(() => {
    const positionDivider = () => {
      if (!headerRef.current || !logoRef.current || !dividerRef.current) return;
      const headerRect = headerRef.current.getBoundingClientRect();
      const logoRect = logoRef.current.getBoundingClientRect();

      const top = Math.round(logoRect.bottom - headerRect.top + 20);
      dividerRef.current.style.top = `${top}px`;
    };

    positionDivider();
    window.addEventListener("resize", positionDivider);
    return () => window.removeEventListener("resize", positionDivider);
  }, []);

  return (
    <header
      className={`header ${isProfile ? "header--no-divider" : ""}`}
      ref={headerRef}
    >
      <div className="header__brand">
        <NavLink to="/">
          <img
            ref={logoRef}
            className="header__logo"
            src={logo}
            alt="wtwr logo"
          />
        </NavLink>
        <p ref={dateRef} className="header__date-location">
          <span>{currentDate}</span>, <span>{weatherData.city}</span>
        </p>
      </div>
      <div ref={dividerRef} className="header__divider" />
      {!isMobileMenuOpened ? (
        <button
          ref={menuBtnRef}
          onClick={mobileMenu}
          className="header__menu-btn"
        ></button>
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
