import { useState } from "react";
import blogService from "../services/blogs";
import Notification from "./Notification";

const BlogForm = ({ user, setUser, createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const create = async (e) => {
    e.preventDefault();
    createBlog({title, author, url})
    setTimeout(() => {
      setTitle("");
      setAuthor("");
      setUrl("");
    }, 5000);
  };

  return (
    <div>
     
      <h2>create new</h2>

      <form onSubmit={create}>
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
