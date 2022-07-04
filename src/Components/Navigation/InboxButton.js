import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { APIURL } from "../../Config/Globals.js";
import { MessageContext } from "../../Context/message-ctx.js";
import { UserContext } from "../../Context/user-ctx.js";

export const InboxButton = () => {
  const { token } = useContext(UserContext);
  const { unreadCount, setUnreadCount } = useContext(MessageContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  async function fetchMessages() {
    const res = await fetch(`${APIURL}/messages`, {
      headers: {
        Authorization: token,
      },
    });

    const json = await res.json();
    setUnreadCount(json.unreadCount);
    setIsLoading(false);
  }

  return (
    <Link to="/inbox">
      Inbox {unreadCount && !isLoading ? `(${unreadCount})` : ""}
    </Link>
  );
};

