import "./SideBar.css";
import avatar from "../../assets/avatar.png";
import { useLocation } from "react-router-dom";

export default function SideBar() {
  const username = "Hunter Evonosky";
  const avatarDefault = avatar;
  const location = useLocation();

  const isProfile = location && location.pathname === "/profile";

  return (
    <aside className={`sidebar ${isProfile ? "sidebar--no-border" : ""}`}>
      <div className="sidebar__profile">
        <div className="sidebar__user-row">
          {avatarDefault ? (
            <img
              className="sidebar__avatar"
              src={avatarDefault || avatar}
              alt="user avatar"
            />
          ) : (
            <span className="sidebar__avatar">
              {username?.toUpperCase().charAt(0) || ""}
            </span>
          )}
          <div className="sidebar__user-name">{username}</div>
        </div>

        <button className="sidebar__change-btn" type="button">
          Change profile data
        </button>
        <button className="sidebar__logout-btn" type="button">
          Log out
        </button>

        <div className="sidebar__divider" />
      </div>
    </aside>
  );
}
