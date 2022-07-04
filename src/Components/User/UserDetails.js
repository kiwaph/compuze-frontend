import { useContext } from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import { APIURL } from "../../Config/Globals.js";
import { UserContext } from "../../Context/user-ctx.js";
import { epochToDate } from "../../Helpers/Time.js";
import { ErrorList } from "../ErrorList.js";
import { Loading } from "../Loading.js";
import { EditEmail } from "./EditEmail.js";
import { EditPassword } from "./EditPassword.js";
import { EditPhone } from "./EditPhone.js";
import { UserItems } from "./UserItems.js";

export const UserDetails = ({ userId }) => {
  const [user, setUser] = useState("");
  const { isLoggedIn, loggedUserUsername } = useContext(UserContext);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser() {
    const res = await fetch(`${APIURL}/users/${userId}`);
    const json = await res.json();
    setUser(json);
    setPhone(json.phone);
    setEmail(json.email);
    setIsLoading(false);
  }

  const link = `/postmessage/${user.username}`;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <h2>{user.username}'s Profile</h2>

      {errors ? <ErrorList errors={errors} /> : ""}

      <div className="user-details-section">
        <div className="user-details">
          <span>
            Email: <strong>{email}</strong>
            {isLoggedIn && loggedUserUsername === user.username ? (
              <EditEmail
                user={user}
                setEmail={setEmail}
                setErrors={setErrors}
              />
            ) : (
              ""
            )}
          </span>

          <div className="user-details-row-2">
            <span>
              Phone: <strong>{phone}</strong>
              {isLoggedIn && loggedUserUsername === user.username ? (
                <EditPhone
                  user={user}
                  setPhone={setPhone}
                  setErrors={setErrors}
                />
              ) : (
                ""
              )}
            </span>
            <span>Member since: {epochToDate(user.created_at)}</span>
          </div>
        </div>
        <div className="user-details-buttons">
          {isLoggedIn && loggedUserUsername !== user.username ? (
            <Link to={link}>
              <button className="big-btn blue-btn">
                Send Message to {user.username}
              </button>
            </Link>
          ) : (
            ""
          )}
          {!isLoggedIn ? <Link to="/login">Login to send a message</Link> : ""}
          {isLoggedIn && loggedUserUsername === user.username ? (
            <EditPassword user={user} setErrors={setErrors} />
          ) : (
            ""
          )}
        </div>
      </div>

      <h2>{user.username}'s Items</h2>
      <div className="user-items-section">
        <UserItems userId={userId} />
      </div>
    </>
  );
};
