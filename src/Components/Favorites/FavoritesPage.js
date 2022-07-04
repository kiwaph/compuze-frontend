import { FavoritesList } from "./FavoritesList"

export const FavoritesPage = () => {

    return (
        <>
            <h2>Your Favorites</h2>
            <div className='favorites-section'>
                <FavoritesList />
            </div>
        </>
    )
}