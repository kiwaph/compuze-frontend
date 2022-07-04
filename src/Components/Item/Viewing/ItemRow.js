import { epochToElapsed } from '../../../Helpers/Time.js'
import { types } from '../../../Helpers/Helpers';

export const ItemRow = ({ id, type, brand, model, price, createdAt, author}) => {
    return (
        <div className='item-row'>
            <div className='item-picture'>

            </div>

            <div className='item-text'>
                <div className='item-first-row'>

                    <div>
                        <strong>{brand} {model}</strong>
                        <p>{types[type]}</p>
                    </div>
                    
                    <strong className='price'>${price}</strong>

                </div>

                <div className='item-second-row'>
                    <span>Posted by <strong>{author}</strong></span>
                    <span className='time'>{epochToElapsed(createdAt)}</span>
                </div>
            </div>
        </div>
    )
}