import { useState, useRef } from "react";
import Togglable from "../components/Togglable";
import blogService from "../services/blogs";
const Blog = ({ blog }) => {
  const [isVisible, setVisibility] = useState(false);
  const [buttonLabel, setLabel] = useState("view");

  const blogDetailsRef = useRef();

  const toggleVisibility = () => {
    blogDetailsRef.current.toggleVisibility();
    setVisibility(!isVisible);
    setLabel(!isVisible ? "hide" : "view");
  };

  const like = async () => {
    try {
      const response = await blogService.update(blog.id, {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
        user: blog.user.id,
      });
      toggleVisibility();
    } catch (error) {
      console.log("Error", error.message);
    }
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "3px" }}>
      {blog.title} <button onClick={toggleVisibility}>{buttonLabel}</button>
      <Togglable ref={blogDetailsRef}>
        {blog.url}
        <br />
        likes {blog.likes} <button onClick={like}>like</button>
        <br />
        {blog.author}
      </Togglable>
    </div>
  );
};

export default Blog;
