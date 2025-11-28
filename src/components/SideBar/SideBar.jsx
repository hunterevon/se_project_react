import "./SideBar.css";
import avatar from "../../assets/avatar.png";

export default function SideBar() {
  const username = "Hunter Evonosky";
  const avatarDefault = avatar;

  return (
    <aside className="sidebar">
      <div className="sidebar__profile">
        <div className="sidebar__user-name">{username}</div>
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
      </div>
    </aside>
  );
}
