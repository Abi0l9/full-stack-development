import { useState, useImperativeHandle, forwardRef } from "react";
import PropTypes from "prop-types";

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
      <div style={showForm}>
        <button onClick={toggleVisibility}>{props.buttonText}</button>
      </div>
      <div style={hideForm} className="togglableContent">
        {props.children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  );
});

Toggable.displayName = "Toggable";

Toggable.propTypes = {
  buttonText: PropTypes.string.isRequired,
};

export default Toggable;
