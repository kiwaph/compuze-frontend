import { useContext, useState } from "react";
import { UserContext } from "../../../Context/user-ctx";
import { useHistory } from "react-router";
import { APIURL } from "../../../Config/Globals";

export const DeleteItemButton = ({ itemId }) => {
  const [clicked, setClicked] = useState(false);
  const { token } = useContext(UserContext);
  const history = useHistory();

  const deleteHandler = async () => {
    await fetch(`${APIURL}/items/${itemId}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    });
    history.replace("/items");
  };

  if (clicked) {
    return (
      <span>
        Are you sure?
        <button className="small-btn pink-btn" onClick={deleteHandler}>
          Yes
        </button>
        <button
          className="small-btn blue-btn"
          onClick={() => setClicked(false)}
        >
          {" "}
          No
        </button>
      </span>
    );
  }

  return (
    <button className="big-btn pink-btn" onClick={() => setClicked(true)}>
      Delete Item
    </button>
  );
};

