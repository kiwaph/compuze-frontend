import { useEffect, useState } from "react";
import { useContext } from "react/cjs/react.development";
import { MessageContext } from "../../Context/message-ctx.js";
import { UserContext } from "../../Context/user-ctx.js";
import { MessageRow } from "./MessageRow.js";
import { Loading } from "../Loading.js";
import { APIURL } from "../../Config/Globals.js";

export const MessageList = () => {
  const [messages, setMessages] = useState([]);
  const { token } = useContext(UserContext);
  const { setUnreadCount } = useContext(MessageContext);
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
    setMessages(json.messages);
    setUnreadCount(json.unreadCount);
    setIsLoading(false);
  }

  if (isLoading) {
    return <Loading />;
  }

  if (!messages.length) {
    return "No messages";
  }

  return messages.map((message) => (
    <MessageRow
      key={message.id}
      id={message.id}
      subject={message.subject}
      content={message.content}
      sender={message.sender}
      senderId={message.sender_id}
      createdAt={message.created_at}
      isRead={message.is_read}
    />
  ));
};

