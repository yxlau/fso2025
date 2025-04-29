import { useState, useRef } from "react";
import Togglable from "../components/Togglable";
const Blog = ({ blog }) => {
  const [isVisible, setVisibility] = useState(false);
  const [buttonLabel, setLabel] = useState("view");

  const blogDetailsRef = useRef();

  const toggleVisibility = () => {
    blogDetailsRef.current.toggleVisibility();
    setVisibility(!isVisible);
    setLabel(!isVisible ? "hide" : "view");
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "3px" }}>
      {blog.title} <button onClick={toggleVisibility}>{buttonLabel}</button>
      <Togglable ref={blogDetailsRef}>
        {blog.url}
        <br />
        likes {blog.likes}
        <br />
        {blog.author}
      </Togglable>
    </div>
  );
};

export default Blog;
