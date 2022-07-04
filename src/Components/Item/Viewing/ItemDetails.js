import { useContext, useEffect, useState } from "react/cjs/react.development";
import { UserContext } from "../../../Context/user-ctx.js";
import { Link } from "react-router-dom";
import { Loading } from "../../Loading.js";
import { CommentSection } from "../../Comment/CommentSection.js";
import { FavoritesButton } from "../Buttons/FavoritesButton.js";
import { DeleteItemButton } from "../Buttons/DeleteItemButton.js";
import { EditItemButton } from "../Buttons/EditItemButton.js";
import { ItemRow } from "./ItemRow";
import { APIURL } from "../../../Config/Globals.js";

export const ItemDetails = ({ itemId }) => {
  const [item, setItem] = useState("");
  const [views, setViews] = useState(0);
  const [isFavorite, setIsFavorite] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { loggedUserUsername, token, isLoggedIn } = useContext(UserContext);

  useEffect(async () => {
    await fetchItem();
    await checkIfFavorite();
    await incrementViews();
    setIsLoading(false);
  }, []);

  const fetchItem = async () => {
    const res = await fetch(`${APIURL}/items/${itemId}`);
    const json = await res.json();
    setItem(json);
  };

  // Check if logged-in user is author of item (use for delete button)
  const isAuthor = () => {
    if (loggedUserUsername === item.username) {
      return true;
    }
    return false;
  };

  const incrementViews = async () => {
    await fetch(`${APIURL}/items/${itemId}/views`, {
      method: "PATCH",
    });
    setViews(views + 1);
  };

  const checkIfFavorite = async () => {
    const res = await fetch(`${APIURL}/favorites/${itemId}`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });

    if (res.status !== 200) {
      return setIsFavorite(false);
    }
    setIsFavorite(true);
  };

  const userPageLink = `/users/${item.user_id}`;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Link to="/items">Back to items list</Link>

      {/* Item Title & Price */}
      <div className="no-margin-header">
        <h2>
          Viewing {item.brand} {item.model}
        </h2>
      </div>
      <p className="views">This item has been viewed {item.views} times.</p>
      <p>
        Item is located in <strong>{item.location}</strong>.
      </p>

      {/* Item Details & Buttons */}
      <div className="item-details-content">
        <ItemRow
          key={item.id}
          id={item.id}
          type={item.type}
          brand={item.brand}
          model={item.model}
          price={item.price}
          createdAt={item.created_at}
          author={item.username}
        />
      </div>

      <div className="item-description">
        <h3>Item Description:</h3>
        <p>{item.description}</p>
      </div>

      <div className="item-details-buttons">
        {loggedUserUsername !== item.username ? (
          <Link to={userPageLink}>
            <button className="big-btn green-btn">
              Contact {item.username}
            </button>
          </Link>
        ) : (
          ""
        )}
        {isLoggedIn ? (
          <FavoritesButton
            setIsFavorite={setIsFavorite}
            isFavorite={isFavorite}
          />
        ) : (
          ""
        )}
        {isAuthor() ? (
          <EditItemButton
            itemId={item.id}
            type={item.type}
            brand={item.brand}
            model={item.model}
            description={item.description}
            location={item.location}
            price={item.price}
          />
        ) : (
          ""
        )}
        {isAuthor() ? <DeleteItemButton itemId={item.id} /> : ""}
      </div>

      {/* Comments section */}
      <CommentSection />
    </>
  );
};
