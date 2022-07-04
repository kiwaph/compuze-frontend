import { useContext } from "react";
import { useState } from "react/cjs/react.development";
import { APIURL } from "../../Config/Globals";
import { UserContext } from "../../Context/user-ctx";

export const EditPassword = ({ user, setErrors }) => {
  const { token } = useContext(UserContext);
  const [clicked, setClicked] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newRepeatPassword, setNewRepeatPassword] = useState("");

  const editPasswordHandler = async () => {
    const res = await fetch(`${APIURL}/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        password: newPassword,
        repeatPassword: newRepeatPassword,
      }),
    });
    const json = await res.json();

    if (res.status !== 201) {
      return setErrors(json);
    }

    setErrors(false);
    return setClicked(false);
  };

  return (
    <>
      {clicked ? (
        <>
          <input
            type="password"
            placeholder="New Password"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Repeat Password"
            onChange={(e) => setNewRepeatPassword(e.target.value)}
          />
          <button className="small-btn blue-btn" onClick={editPasswordHandler}>
            Confirm
          </button>
          <button
            className="small-btn pink-btn"
            onClick={() => setClicked(false)}
          >
            Cancel
          </button>
        </>
      ) : (
        <button className="small-btn blue-btn" onClick={() => setClicked(true)}>
          Change Password
        </button>
      )}
    </>
  );
};

