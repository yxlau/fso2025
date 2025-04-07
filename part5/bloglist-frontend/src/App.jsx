import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await loginService.login({ username, password });
      setUser(response);
      window.localStorage.setItem("token", response.token);
    } catch (error) {
      console.error("Error:", error.message);
    }
    setUsername("");
    setPassword("");
  };

  const loginForm = () => (
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

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    setUser("");
  };

  if (user) {
    return (
      <div>
        <h2>blogs</h2>
        <p>
          {user ? `${user.name} logged in` : ""}
          <button onClick={handleLogout}>Logout</button>
        </p>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    );
  } else {
    return (
      <div>
        <h2>Log in to application</h2>
        {loginForm()}
      </div>
    );
  }
};

export default App;
