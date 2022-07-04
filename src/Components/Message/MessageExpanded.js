import { useEffect } from "react";
import { useContext } from "react/cjs/react.development";
import { UserContext } from "../../Context/user-ctx.js";
import { MessageContext } from "../../Context/message-ctx";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { DeleteMessageButton } from "./DeleteMessageButton.js";
import { APIURL } from "../../Config/Globals.js";

export const MessageExpanded = ({
  id,
  content,
  read,
  setRead,
  sender,
  senderId,
}) => {
  const { token } = useContext(UserContext);
  const { unreadCount, setUnreadCount } = useContext(MessageContext);

  useEffect(() => {
    markAsRead();
  }, []);

  async function markAsRead() {
    if (!read) {
      await fetch(`${APIURL}/messages/${id}/read`, {
        method: "PATCH",
        headers: {
          Authorization: token,
        },
      });
      setUnreadCount(unreadCount - 1);
      setRead(true);
    }
  }

  const userLink = `/users/${senderId}`;
  const replyLink = `/postmessage/${sender}`;

  return (
    <div className="message-content">
      <div>{content}</div>
      <div className="message-buttons">
        <Link to={replyLink}>
          <button className="small-btn blue-btn">Reply</button>
        </Link>
        <DeleteMessageButton messageId={id} />
        <Link to={userLink}>
          <button className="small-btn green-btn">
            View {sender}'s profile
          </button>
        </Link>
      </div>
    </div>
  );
};

