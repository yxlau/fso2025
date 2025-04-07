import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const user = window.localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("user");
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
        <h2>create new</h2>
        <BlogForm token={user.token} />
      </div>
    );
  } else {
    return (
      <div>
        <h2>Log in to application</h2>
        <LoginForm setUser={setUser} />
      </div>
    );
  }
};

export default App;
