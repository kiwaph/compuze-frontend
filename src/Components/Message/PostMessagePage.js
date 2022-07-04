import { useParams } from "react-router";
import { PostMessageForm } from "./PostMessageForm"

export const PostMessagePage = () => {

    const { username } = useParams();
    
    return (
        <>
            <h2>Send message</h2>
            <PostMessageForm username={username} />
        </>
    )
}