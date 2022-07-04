import { useEffect, useState } from "react";
import { APIURL } from "../../../Config/Globals";

export const RandomItem = () => {

    const [ item, setItem ] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect( ()=> {
        fetchItem()
    }, [])

    async function fetchItem() {
        const res = await fetch(`${APIURL}/items/random`);
        const json = await res.json();
        setItem(json);
        setIsLoading(false);
    }

    if (isLoading) {
        return <Loading />
    }
    
    return (
        <p>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p>Selling price: ${item.price}</p>
            <p>{item.views} views</p>
        </p>
    )
}