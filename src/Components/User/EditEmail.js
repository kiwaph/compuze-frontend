import { useContext } from "react";
import { useState } from "react/cjs/react.development";
import { APIURL } from "../../Config/Globals";
import { UserContext } from "../../Context/user-ctx";

export const EditEmail = ({ user, setEmail, setErrors }) => {
  const { token } = useContext(UserContext);
  const [clicked, setClicked] = useState(false);
  const [newEmail, setNewEmail] = useState("");

  const editEmailHandler = async () => {
    const res = await fetch(`${APIURL}/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        email: newEmail,
      }),
    });
    const json = await res.json();

    if (res.status !== 201) {
      return setErrors(json);
    }

    setErrors(false);
    setEmail(newEmail);
    setClicked(false);
  };

  return clicked ? (
    <>
      <input
        type="text"
        placeholder="New Email"
        onChange={(e) => setNewEmail(e.target.value)}
      />
      <button className="small-btn blue-btn" onClick={editEmailHandler}>
        Confirm
      </button>
      <button className="small-btn pink-btn" onClick={() => setClicked(false)}>
        Cancel
      </button>
    </>
  ) : (
    <button className="small-btn blue-btn" onClick={() => setClicked(true)}>
      Edit
    </button>
  );
};

