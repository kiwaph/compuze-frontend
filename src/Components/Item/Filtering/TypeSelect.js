export const TypeSelect = ({ type, setType, setPage }) => {

    function selectHandler(value) {
        setType(value);
        setPage(1);
    }

    return (
        <>
            <button className={(type === 'case') ? 'filter-select-btn active' : 'filter-select-btn'} onClick={() => selectHandler('case')}>Case</button>
            <button className={(type === 'psu') ? 'filter-select-btn active' : 'filter-select-btn'} onClick={() => selectHandler('psu')}>PSU</button>
            <button className={(type === 'motherboard') ? 'filter-select-btn active' : 'filter-select-btn'} onClick={() => selectHandler('motherboard')}>Motherboard</button>
            <button className={(type === 'cpu') ? 'filter-select-btn active' : 'filter-select-btn'} onClick={() => selectHandler('cpu')}>CPU</button>
            <button className={(type === 'ram') ? 'filter-select-btn active' : 'filter-select-btn'} onClick={() => selectHandler('ram')}>RAM</button>
            <button className={(type === 'ssd') ? 'filter-select-btn active' : 'filter-select-btn'} onClick={() => selectHandler('ssd')}>SSD</button>
            <button className={(type === 'hdd') ? 'filter-select-btn active' : 'filter-select-btn'} onClick={() => selectHandler('hdd')}>HDD</button>
            <button className={(type === 'gpu') ? 'filter-select-btn active' : 'filter-select-btn'} onClick={() => selectHandler('gpu')}>GPU</button>
            <button className={(type === 'cooling') ? 'filter-select-btn active' : 'filter-select-btn'} onClick={() => selectHandler('cooling')}>Cooling</button>
        </>
    )
}