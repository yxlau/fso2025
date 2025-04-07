import { useState } from "react";
import loginService from "../services/login";
import blogService from "../services/blogs";

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await loginService.login({ username, password });
      setUser(response);
      window.localStorage.setItem("user", JSON.stringify(response));
      blogService.setToken(response.token);
    } catch (error) {
      console.error("Error:", error.message);
    }
    setUsername("");
    setPassword("");
  };

  return (
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
  );
};

export default LoginForm;
