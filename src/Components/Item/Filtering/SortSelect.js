export const SortSelect = ({ sort, setSort, order, setOrder, setPage }) => {

    function sortHandler(value) {
        setSort(value);
        setPage(1);
    }

    function orderHandler(value) {
        setOrder(value);
        setPage(1);
    }

    return (
        <>
            <button className={(sort === 'price') ? 'filter-select-btn active' : 'filter-select-btn'} onClick={() => sortHandler('price')}>Price</button>
            <button className={(sort === 'created_at') ? 'filter-select-btn active' : 'filter-select-btn'} onClick={() => sortHandler('created_at')}>Date</button>

            {sort
                ? <>  <strong>Order:</strong>
                    <button className={(order === 'ASC') ? 'filter-select-btn active' : 'filter-select-btn'} onClick={() => orderHandler('ASC')}>
                        {sort === 'price' ? 'Lowest First' : 'Oldest First'}
                    </button>

                    <button className={(order === 'DESC') ? 'filter-select-btn active' : 'filter-select-btn'} onClick={() => orderHandler('DESC')}>
                        {sort === 'price' ? 'Highest First' : 'Newest First'}
                    </button>
                </>
                : ''
            }
        </>
    )
}