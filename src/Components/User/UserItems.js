import { Link } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import { APIURL } from "../../Config/Globals";
import { ItemRow } from "../Item/Viewing/ItemRow"
import { Loading } from "../Loading";

export const UserItems = ({userId}) => {

    const [items, setItems] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=> {
        fetchItems()
    }, []);

    async function fetchItems() {
        const res = await fetch(`${APIURL}/users/${userId}/items`);
        const json = await res.json();
        setItems(json);
        setIsLoading(false);
    }

    if (isLoading) {
        return < Loading />
    }
    
    if (!items.length) {
        return 'No items posted by this user yet'
    }

    return (
        items.map(item =>
            <Link key={item.id} to={`/items/${item.id}`}  >
                <ItemRow
                id={item.id}
                type={item.type}
                brand={item.brand}
                model={item.model}
                description={item.description}
                price={item.price}
                views={item.view}
                createdAt={item.created_at}
                author={item.username}
                authorId={item.user_id}
                />
            </Link>
        )
    )
}