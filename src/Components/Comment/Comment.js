import { useContext } from "react";
import { UserContext } from "../../Context/user-ctx";
import { DeleteCommentButton } from "./DeleteCommentButton";
import { epochToElapsed } from "../../Helpers/Time.js";

export const Comment = ({ id, content, commentAuthor, createdAt }) => {
  const { loggedUserUsername } = useContext(UserContext);

  return (
    <div className="comment-row">
      <span className="comment-row-left">
        <span className="comment-author">{commentAuthor}</span>
        <span className="comment-content">{content}</span>
      </span>

      <span className="comment-row-right">
        {loggedUserUsername === commentAuthor ? (
          <DeleteCommentButton commentId={id} />
        ) : (
          ""
        )}
        <span>{epochToElapsed(createdAt)}</span>
      </span>
    </div>
  );
};
