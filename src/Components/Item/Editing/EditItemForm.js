import { useContext, useState } from "react/cjs/react.development";
import { UserContext } from "../../../Context/user-ctx";
import {
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { ErrorList } from "../../ErrorList";
import { APIURL } from "../../../Config/Globals";

export const EditItemForm = () => {
  const history = useHistory();
  const reactlocation = useLocation();
  const { itemId } = useParams();

  const queryParams = new URLSearchParams(reactlocation.search);
  const type = queryParams.get("type");
  const brand = queryParams.get("brand");
  const model = queryParams.get("model");
  const description = queryParams.get("description");
  const location = queryParams.get("location");
  const price = queryParams.get("price");

  const [newType, setNewType] = useState(type);
  const [newBrand, setNewBrand] = useState(brand);
  const [newModel, setNewModel] = useState(model);
  const [newDescription, setNewDescription] = useState(description);
  const [newLocation, setNewLocation] = useState(location);
  const [newPrice, setNewPrice] = useState(price);

  const [errors, setErrors] = useState(false);
  const { token } = useContext(UserContext);

  async function editItem() {
    const res = await fetch(`${APIURL}/items/${itemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        type: newType,
        brand: newBrand,
        model: newModel,
        description: newDescription,
        location: newLocation,
        price: newPrice,
      }),
    });

    const json = await res.json();

    if (res.status !== 201) {
      return setErrors(json);
    }
    return history.replace("/items");
  }

  return (
    <>
      {errors ? <ErrorList errors={errors} /> : ""}
      <form className="form">
        <div className="form-group">
          <label>Type</label>
          <select
            id="type"
            value={newType}
            onChange={(e) => setNewType(e.target.value)}
          >
            <option value="case">Case</option>
            <option value="psu">Power Supply</option>
            <option value="motherboard">Motherboard</option>
            <option value="cpu">CPU</option>
            <option value="ram">RAM</option>
            <option value="ssd">SSD</option>
            <option value="hdd">Hard Drive</option>
            <option value="gpu">Graphics Card</option>
            <option value="cooling">Cooling</option>
          </select>
        </div>

        <div className="form-group">
          <label>Brand</label>
          <input
            type="text"
            id="brand>"
            value={newBrand}
            onChange={(e) => setNewBrand(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Model</label>
          <input
            type="text"
            value={newModel}
            id="model>"
            onChange={(e) => setNewModel(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            id="description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Item Location</label>
          <textarea
            id="location"
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            type="text"
            id="price"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
          />
        </div>

        <button className="big-btn blue-btn" type="button" onClick={editItem}>
          Edit Item
        </button>
      </form>
    </>
  );
};

