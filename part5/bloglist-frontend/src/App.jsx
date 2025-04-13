import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState("");
  const [notification, setNotification] = useState({});

  const handleLogout = () => {
    window.localStorage.removeItem("user");
    setUser("");
  };

  const createBlog = async ({title, author, url}) => {
     try {
         const response = await blogService.create({
           title,
           author,
           url,
         });         
         setNotification({status: "success", message: `a new blog ${title} by ${author} added`});
       } catch (error) {
         setNotification({status: "error", message: error.message});
         console.log("Error: ", error.message);
       }
setTimeout(() => setNotification({}), 5000);
  }

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
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

  const loginHandler = async (username, password) => {
    try {
      const response = await loginService.login({ username, password });
      setUser(response);
      window.localStorage.setItem("user", JSON.stringify(response));
      blogService.setToken(response.token);
    } catch (error) {
      console.log( error.message)
      setNotification({status: "error", message: "wrong username or password"});
    }
    setTimeout(() => {
      setNotification({});
    }, 5000);
  };

  if (user) {
    return (
      <div>
        <h2>blogs</h2>
          <Notification
            status={notification.status}
            text={notification.message}
          />
        <p>
          {user ? `${user.name} logged in` : ""}
          <button onClick={handleLogout}>Logout</button>
        </p>
        <Togglable buttonLabel="New blog">
          <BlogForm user={user} setUser={setUser} createBlog={createBlog} />
        </Togglable>
        <br />
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    );
  } else {
    return (
      <div>
        <h2>Log in to application</h2>
          <Notification status={notification.status} text={notification.message} />
        <LoginForm login={loginHandler} />
      </div>
    );
  }
};

export default App;
