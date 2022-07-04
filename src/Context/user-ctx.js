import { createContext, useState } from "react";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(
    initialToken ? `Bearer ${initialToken}` : ""
  );
  const history = useHistory();

  const isLoggedIn = !!token;
  const loggedUserId = token ? jwt_decode(token).userId : "";
  const loggedUserUsername = token ? jwt_decode(token).username : "";

  const login = (token) => {
    setToken(`Bearer ${token}`);
    localStorage.setItem("token", token);
    history.replace(`/`);
  };

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    history.replace(`/`);
  };

  return (
    <UserContext.Provider
      value={{ login, logout, token, loggedUserId, loggedUserUsername, isLoggedIn }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

