import { Link } from "react-router-dom"

export const EditItemButton = ({itemId, type, brand, model, description, location, price}) => {
    
    const link = `/edititem/${itemId}?type=${type}&brand=${brand}&model=${model}&description=${description}&price=${price}&location=${location}`

    return (
        <Link to={link}>
            <button className="big-btn blue-btn">Edit Item</button>
        </Link>
    )
}