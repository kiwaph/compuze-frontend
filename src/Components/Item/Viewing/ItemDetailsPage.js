import { useParams } from "react-router"
import { ItemDetails } from "./ItemDetails";

export const ItemDetailsPage = () => {
    const { itemId } = useParams();
    
    return (
        <>
            <ItemDetails itemId={itemId} />
        </>
    )
}