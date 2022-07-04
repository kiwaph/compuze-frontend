import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../Context/user-ctx";
import { CommentList } from "./CommentList";
import { PostCommentForm } from "./PostCommentForm";

export const CommentSection = () => {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <>
      <h2>Comments</h2>

      <div className="comment-section">
        <CommentList />
        {isLoggedIn ? (
          <PostCommentForm />
        ) : (
          <Link to="/login">Login to post a comment</Link>
        )}
      </div>
    </>
  );
};

