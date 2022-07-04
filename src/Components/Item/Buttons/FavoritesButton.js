import { useContext } from "react";
import { UserContext } from "../../../Context/user-ctx";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { APIURL } from "../../../Config/Globals";

export const FavoritesButton = ({ isFavorite, setIsFavorite }) => {
  const { token } = useContext(UserContext);
  const { itemId } = useParams();

  const addFavoriteHandler = async () => {
    await fetch(`${APIURL}/favorites/${itemId}`, {
      method: "POST",
      headers: {
        Authorization: token,
      },
    });
    setIsFavorite(true);
  };

  const removeFavoriteHandler = async () => {
    await fetch(`${APIURL}/favorites/${itemId}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    });
    setIsFavorite(false);
  };

  return (
    <>
      {isFavorite ? (
        <button className="big-btn pink-btn" onClick={removeFavoriteHandler}>
          Remove from favorites
        </button>
      ) : (
        <button className="big-btn blue-btn" onClick={addFavoriteHandler}>
          Add to favorites
        </button>
      )}
    </>
  );
};

