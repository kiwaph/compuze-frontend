import { SearchBar } from './SearchBar';
import { SortSelect } from './SortSelect';
import { TypeSelect } from './TypeSelect'

export const Filters = ({type, setType, order, setOrder, sort, setSort, setPage, search, setSearch}) => {

    const removeFilters = () => {
        setType('');
        setSort('');
        setOrder('');
        setPage(1);
    }
    
    return (
        <>
            <div className='all-filters'>

            <strong>Search:</strong>
                <SearchBar search={search} setSearch={setSearch} setPage={setPage} />

                <strong>Filter by type:</strong>
                <div className='filter-controls'>
                    <TypeSelect type={type} setType={setType} setPage={setPage} />
                </div>

                <strong>Sort by:</strong>
                <div className='filter-controls'>
                    <SortSelect sort={sort} setSort={setSort} order={order} setOrder={setOrder} setPage={setPage} />
                </div>

                { type || sort || order
                    ? <button className={'remove-filters-btn'} onClick={removeFilters}>Remove Filters</button>
                    : ''
                }
            </div>
        </>
    )
}