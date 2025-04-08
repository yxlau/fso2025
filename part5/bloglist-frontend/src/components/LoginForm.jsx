import { useState } from "react";
import loginService from "../services/login";
import blogService from "../services/blogs";
import Notification from "./Notification";

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await loginService.login({ username, password });
      setUser(response);
      window.localStorage.setItem("user", JSON.stringify(response));
      blogService.setToken(response.token);
    } catch (error) {
      setStatus("error");
    }
    setTimeout(() => {
      setStatus("");
      setUsername("");
      setPassword("");
    }, 5000);
  };

  return (
    <div>
      <h2>Log in to application</h2>
      {status === "error" && (
        <Notification status={status} text="wrong username or password" />
      )}
      <form onSubmit={loginHandler}>
        <div>
          <label htmlFor="username">username</label>
          <input
            type="text"
            name="username"
            onChange={({ target }) => {
              setUsername(target.value);
            }}
            value={username}
          />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
