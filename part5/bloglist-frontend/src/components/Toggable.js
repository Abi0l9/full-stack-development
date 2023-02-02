import { useState, useImperativeHandle, forwardRef } from "react";

const Toggable = forwardRef((props, ref) => {
  const [visibility, setVisibility] = useState(false);

  const showForm = { display: visibility ? "none" : "" };
  const hideForm = { display: visibility ? "" : "none" };

  const toggleVisibility = () => {
    setVisibility(!visibility);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div>
        <button style={showForm} onClick={toggleVisibility}>
          {props.buttonText}
        </button>
      </div>
      <div style={hideForm}>
        {props.children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  );
});

export default Toggable;
