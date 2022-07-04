import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { APIURL } from "../../Config/Globals.js";
import { Loading } from '../Loading.js'
import { CommentRows } from './CommentRows.js';

export const CommentList = () => {

    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { itemId } = useParams();

    useEffect(() => {
        fetchComments()
    }, []);

    async function fetchComments() {
        const res = await fetch(`${APIURL}/comments/?itemId=${itemId}`);
        const json = await res.json();
        setComments(json);
        setIsLoading(false);
    }

    if (isLoading) {
        return <Loading />
    }

    if (!comments.length) {
        return <p>No comments posted yet.</p>
    }

    return <CommentRows comments={comments}/>;
    
}