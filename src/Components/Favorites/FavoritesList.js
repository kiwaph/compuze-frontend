import { useContext, useEffect, useState } from 'react';
import { Loading } from '../Loading';
import { UserContext } from '../../Context/user-ctx.js';
import { FavoritesRows } from './FavoritesRows'
import { APIURL } from "../../Config/Globals"

export const FavoritesList = () => {

    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { token } = useContext(UserContext);

    useEffect(() => {
        fetchFavorites()
    }, []);

    async function fetchFavorites() {
        const res = await fetch(`${APIURL}/favorites`, {
            headers: {
                'Authorization': token
            }
        });

        const json = await res.json();
        setFavorites(json);
        setIsLoading(false);
    }

    if (isLoading) {
        return <Loading />
    }

    if (!favorites.length) {
        return `You don't have any favorites yet`;
    }

    return <FavoritesRows favorites={favorites}/>
}
