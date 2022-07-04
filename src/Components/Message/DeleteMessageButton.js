import { useContext } from "react";
import { useHistory } from "react-router";
import { APIURL } from "../../Config/Globals";
import { UserContext } from "../../Context/user-ctx";

export const DeleteMessageButton = ({ messageId }) => {
  const { token } = useContext(UserContext);
  const history = useHistory();

  const deleteHandler = async () => {
    await fetch(`${APIURL}/messages/${messageId}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    });
    history.replace("/");
  };

  return (
    <button className="small-btn pink-btn" onClick={deleteHandler}>
      Delete
    </button>
  );
};

