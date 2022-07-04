import { useContext, useState } from "react/cjs/react.development";
import { UserContext } from "../../Context/user-ctx";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { ErrorList } from "../ErrorList";
import { APIURL } from "../../Config/Globals";

export const PostMessageForm = ({ username }) => {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [recipientUsername, setRecipientUsername] = useState(username);

  const [errors, setErrors] = useState(false);
  const { token } = useContext(UserContext);
  const history = useHistory();

  async function postMessage() {
    const res = await fetch(`${APIURL}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        subject: subject,
        content: content,
        recipientUsername: recipientUsername,
      }),
    });

    const json = await res.json();

    if (res.status !== 201) {
      return setErrors(json);
    }

    return history.replace("/inbox");
  }

  return (
    <>
      {errors ? <ErrorList errors={errors} /> : ""}
      <form className="form">
        <div className="form-group">
          <label>Subject</label>
          <input
            type="text"
            value={subject}
            id="subject>"
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Content</label>
          <textarea
            id="content>"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Recipient</label>
          <input
            type="text"
            id="recipientUsername"
            value={recipientUsername}
            onChange={(e) => setRecipientUsername(e.target.value)}
          />
        </div>

        <button
          className="big-btn blue-btn"
          type="button"
          onClick={postMessage}
        >
          Send
        </button>
      </form>
    </>
  );
};

