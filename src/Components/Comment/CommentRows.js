import { Comment } from "./Comment"

export const CommentRows = ({comments}) => {
    return (
            comments.map(comment =>
                <Comment
                    key={comment.id}
                    id={comment.id}
                    content={comment.content}
                    commentAuthor={comment.username}
                    createdAt={comment.created_at}
                />  
            )
    )
}