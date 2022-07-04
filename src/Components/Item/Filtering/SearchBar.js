export const SearchBar = ({search, setSearch, setPage}) => {

    function searchHandler (value) {
        setSearch(value);
        setPage(1);
    }

    return (
        <input type='text' id='searchBox' value={search} onChange={e => searchHandler(e.target.value)}/>
    )
}