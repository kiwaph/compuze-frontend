import { Link } from "react-router-dom"
import { ItemRow } from "./ItemRow"

export const ItemRows = ({items}) => {

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