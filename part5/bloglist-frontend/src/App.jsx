import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState("");
  const [notification, setNotification] = useState({});

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
  }, []);

  useEffect(() => {
    const user = window.localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
      blogService.setToken(JSON.parse(user).token);
    } else {
      setUser("");
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("user");
    setUser("");
  };

  const login = async (username, password) => {
    try {
      const response = await loginService.login({ username, password });
      setUser(response);
      window.localStorage.setItem("user", JSON.stringify(response));
      blogService.setToken(response.token);
    } catch (error) {
      console.log(error.message);
      setNotification({
        status: "error",
        message: "wrong username or password",
      });
    }
    setTimeout(() => {
      setNotification({});
    }, 5000);
  };

  const blogFormRef = useRef();

  const toggleBlogForm = () => {
    blogFormRef.current.toggleVisibility();
  };

  if (user) {
    return (
      <div>
        <h2>blogs</h2>

        <p>
          {user ? `${user.name} logged in` : ""}
          <button onClick={handleLogout}>Logout</button>
        </p>
        <button onClick={toggleBlogForm}>new blog</button>
        <Togglable ref={blogFormRef}>
          <BlogForm
            user={user}
            setUser={setUser}
            hideForm={() => blogFormRef.current.toggleVisibility()}
          />
        </Togglable>
        <br />
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} user={user} />
        ))}
      </div>
    );
  } else {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification
          status={notification.status}
          text={notification.message}
        />
        <LoginForm login={login} />
      </div>
    );
  }
};

export default App;
