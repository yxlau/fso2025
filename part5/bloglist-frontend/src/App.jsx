import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";


const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState("");
    const [status, setStatus] = useState("");


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
        setStatus("error");
      }
      setTimeout(() => {
        setStatus("");
      }, 5000);
    };


  if (user) {
    return (
      <div>
        <BlogForm user={user} setUser={setUser} />
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
      {status === "error" && (
        <Notification status={status} text="wrong username or password" />
      )}<LoginForm login={loginHandler} />
      </div>
    )
      
  }
};

export default App;
