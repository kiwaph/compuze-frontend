import { useContext } from "react";
import { useState } from "react/cjs/react.development";
import { UserContext } from "../../Context/user-ctx";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Loading } from "../Loading";
import { ErrorList } from "../ErrorList";
import { APIURL } from "../../Config/Globals";

export const LoginForm = () => {
  const { login } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState(false);
  const history = useHistory();

  async function processLogin() {
    setIsLoading(true);
    const res = await fetch(`${APIURL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const json = await res.json(res);
    setIsLoading(false);

    if (res.status !== 200) {
      return setErrors(json);
    }
    login(json.token);
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {/* Errors */}
      {errors ? <ErrorList errors={errors} /> : ""}

      {/* Login form */}
      <form className="form">
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            id="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="big-btn blue-btn"
          type="button"
          onClick={processLogin}
        >
          Login
        </button>
      </form>
    </>
  );
};

