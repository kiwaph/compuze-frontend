import { useEffect, useState } from 'react';
import { Loading } from '../../Loading.js';
import { ItemRows } from './ItemRows.js';
import { Pagination } from '../Pagination';
import { Filters } from '../Filtering/Filters';
import { types } from '../../../Helpers/Helpers';
import { APIURL } from '../../../Config/Globals.js';

export const ItemList = () => {

    const [type, setType] = useState('');
    const [sort, setSort] = useState('');
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [perPage, setPerPage] = useState(0);
    const [order, setOrder] = useState('');
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchItems()
    }, [type, sort, order, page, search]);

    async function fetchItems() {
        setIsLoading(true);

        const res = await fetch(`${APIURL}/items/?type=${type}&page=${page}&sort=${sort}&order=${order}&search=${search}`)
        const json = await res.json();

        setItems(json.items);
        setCount(json.count);
        setPerPage(json.perPage);
        setIsLoading(false);
    }

    return (
        <>
            <div className='no-margin-header'>
                <h2>{type ? `Viewing ${types[type]}` : 'Viewing all items'}</h2>
                { search
                        ? <p>Searching for <strong>'{search}'</strong></p>
                        : ''
                }
            </div>

            <div className='item-list-section'>

                <Filters
                    search={search}
                    setSearch={setSearch}
                    sort={sort}
                    setSort={setSort}
                    type={type}
                    setType={setType}
                    order={order}
                    setOrder={setOrder}
                    setPage={setPage}
                />

                { isLoading
                    ? <Loading />
                    : <>
                        {items.length ? <ItemRows items={items} /> : <p>No items found</p>}
                        <Pagination count={count} perPage={perPage} page={page} setPage={setPage}/>
                    </>
                }

            </div>
        </>
    )
}