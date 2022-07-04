import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../Context/user-ctx.js";
import { UserNavigation } from "./UserNavigation.js";
import { GuestNavigation } from "./GuestNavigation.js";

export const Nav = () => {
  const { isLoggedIn } = useContext(UserContext);
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">
            <strong>Compuze | Buy & Sell</strong>
          </Link>
        </li>
        <li>
          <Link to="/items">All Items</Link>
        </li>
        {isLoggedIn ? <UserNavigation /> : <GuestNavigation />}
      </ul>
    </nav>
  );
};

