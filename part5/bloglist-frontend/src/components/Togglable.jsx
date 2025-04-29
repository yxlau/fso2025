import { useState, useImperativeHandle, forwardRef } from "react";

const Togglable = forwardRef((props, refs) => {
  const [isVisible, setVisibility] = useState(false);

  const toggleVisibility = () => {
    setVisibility(!isVisible);
  };

  const display = {
    display: isVisible ? "block" : "none",
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <>
      <div style={display}>{props.children}</div>
    </>
  );
});

export default Togglable;
