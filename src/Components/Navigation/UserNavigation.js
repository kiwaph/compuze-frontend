import { useContext } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { UserContext } from "../../Context/user-ctx.js";
import { InboxButton } from "./InboxButton.js";

export const UserNavigation = () => {
  const { loggedUserId, loggedUserUsername, logout } = useContext(UserContext);
  const history = useHistory();

  const profileLink = `/users/${loggedUserId}`;

  return (
    <>
      <li>
        <Link to="/postitem">Post Item</Link>
      </li>
      <li>
        <Link to="/favorites">Favorites</Link>
      </li>
      <li>
        <InboxButton />
      </li>
      <li>
        <Link to={profileLink}>My Profile</Link>
      </li>
      <li>
        <button className="big-btn pink-btn" onClick={logout}>
          Logout ({loggedUserUsername})
        </button>
      </li>
    </>
  );
};
