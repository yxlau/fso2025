import { useState } from "react";
import blogService from "../services/blogs";
import Notification from "./Notification";

const BlogForm = ({ user, setUser }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("");

  const handleLogout = () => {
    window.localStorage.removeItem("user");
    setUser("");
  };

  const createBlog = async (e) => {
    e.preventDefault();

    try {
      const response = await blogService.create({
        title,
        author,
        url,
      });

      setStatus("success");
    } catch (error) {
      setStatus("error");
      console.log("Error: ", error.message);
    }
    setTimeout(() => {
      setStatus("");
      setTitle("");
      setAuthor("");
      setUrl("");
    }, 5000);
  };

  return (
    <div>
      <h2>blogs</h2>
      {status === "success" && (
        <Notification
          status={status}
          text={`a new blog ${title} by ${author} added`}
        />
      )}
      <p>
        {user ? `${user.name} logged in` : ""}
        <button onClick={handleLogout}>Logout</button>
      </p>
      <h2>create new</h2>

      <form onSubmit={createBlog}>
        <div>
          <label htmlFor="title">title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">author</label>
          <input
            type="text"
            name="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label htmlFor="url">url</label>
          <input
            type="text"
            name="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
