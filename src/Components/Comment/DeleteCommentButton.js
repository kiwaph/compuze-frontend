import { useContext, useState } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../../Context/user-ctx";
import { APIURL } from "../../Config/Globals"


export const DeleteCommentButton = ({commentId}) => {
    
    const [clicked, setClicked] = useState(false);
    const { token } = useContext(UserContext);
    const history = useHistory();

    const deleteHandler = async () => {
        await fetch(`${APIURL}/comments/${commentId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': token,
            }
        })
        history.replace('/items');
    }

    if (clicked) {
        return (
            <strong>
                Are you sure?
                <button className='small-btn pink-btn' onClick={deleteHandler}> Yes</button>
                <button className='small-btn blue-btn' onClick={()=>setClicked(false)}> No</button>
            </strong>
        )
    }

    return (
        <button className='small-btn pink-btn' onClick={()=>setClicked(true)}>Delete Comment</button>
    )
}
