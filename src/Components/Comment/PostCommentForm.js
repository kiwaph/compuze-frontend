import { useContext, useState } from "react/cjs/react.development";
import { UserContext } from "../../Context/user-ctx";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { ErrorList } from '../ErrorList'
import { APIURL } from "../../Config/Globals";

export const PostCommentForm = () => {

    const [ content, setContent ] = useState('');
    const [ errors, setErrors ] = useState(false);
    const { token } = useContext(UserContext);
    const { itemId } = useParams();
    const history = useHistory();

    async function postComment() {
        const res = await fetch(`${APIURL}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({
                content: content,
                itemId: itemId
            })
        })
        
        const json = await res.json();

        if (res.status !== 201) {
            return setErrors(json);
        }
        return history.replace(`/items`)

    }

    return (
        <form>
            <label>Post a comment</label>
            {errors ? <ErrorList errors={errors} /> : '' }
            <input type='text' id='title>' onChange={e => setContent(e.target.value)}/>
            
            <button className='small-btn blue-btn' type='button' onClick={postComment}>Post</button>
        </form>
    )
}
