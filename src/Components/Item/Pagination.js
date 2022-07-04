export const Pagination = ({count, perPage, page, setPage}) => {

    const prevPage = () => {
        setPage(page - 1);
    }

    const nextPage = () => {
        setPage(page + 1);
    }
    
    return (
        <div className="pagination">
            {/* Previous page*/}
                { page !== 1
                    ? <button className="page-change-button" onClick={prevPage}>Previous</button>
                    : <button className="page-change-button invisible" onClick={prevPage}>Previous</button>
                }

            {/* Page Number */}
            { count ? <span className='page-number'>Page {page}</span> : ''}

            {/* Next page */}
            { page * perPage < count 
                ? <button className="page-change-button" onClick={nextPage}>Next</button>
                : <button className="page-change-button invisible" onClick={nextPage}>Next</button>
            }
        </div>
    )
}