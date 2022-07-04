import { useContext } from "react";
import { useState } from "react/cjs/react.development";
import { APIURL } from "../../Config/Globals";
import { UserContext } from "../../Context/user-ctx";

export const EditPhone = ({ user, setPhone, setErrors }) => {
  const { token } = useContext(UserContext);
  const [clicked, setClicked] = useState(false);
  const [newPhone, setNewPhone] = useState("");

  const editPhoneHandler = async () => {
    const res = await fetch(`${APIURL}/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        phone: newPhone,
      }),
    });
    const json = await res.json();

    if (res.status !== 201) {
      return setErrors(json);
    }

    setErrors(false);
    setPhone(newPhone);
    setClicked(false);
  };

  return clicked ? (
    <>
      <input
        type="text"
        placeholder="New Phone"
        onChange={(e) => setNewPhone(e.target.value)}
      />
      <button className="small-btn blue-btn" onClick={editPhoneHandler}>
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

