import { useContext, useState } from "react/cjs/react.development";
import { UserContext } from "../../../Context/user-ctx";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Loading } from "../../Loading";
import { ErrorList } from "../../ErrorList";
import { APIURL } from "../../../Config/Globals";

export const PostItemForm = () => {
  const [type, setType] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");

  const [errors, setErrors] = useState(false);
  const { token } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  async function postItem() {
    setIsLoading(true);
    const res = await fetch(`${APIURL}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'encType': 'multipart/form-data',
        Authorization: token,
      },
      body: JSON.stringify({
        type: type,
        brand: brand,
        model: model,
        description: description,
        image: image,
        location: location,
        price: price,
      }),
    });

    const json = await res.json();
    setIsLoading(false);

    if (res.status !== 201) {
      return setErrors(json);
    }
    return history.replace("/items");
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {errors ? <ErrorList errors={errors} /> : ""}
      <form className="form">
        <div className="form-group">
          <label>Type</label>
          <select id="type>" onChange={(e) => setType(e.target.value)}>
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
            value={brand}
            id="brand>"
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Model</label>
          <input
            type="text"
            value={model}
            id="model>"
            onChange={(e) => setModel(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Item Location</label>
          <input
            type="text"
            value={location}
            id="location>"
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Item Image</label>
          <input
            type="file"
            id="image>"
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            type="text"
            value={price}
            id="price"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <button className="big-btn blue-btn" type="button" onClick={postItem}>
          Add Item
        </button>
      </form>
    </>
  );
};

