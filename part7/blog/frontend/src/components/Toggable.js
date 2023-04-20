import { useState, useImperativeHandle, forwardRef } from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";

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
        <Button onClick={toggleVisibility} variant="outlined">
          {props.buttonText}
        </Button>
      </div>
      <div style={hideForm} className="togglableContent">
        {props.children}
      </div>
    </div>
  );
});

Toggable.displayName = "Toggable";

Toggable.propTypes = {
  buttonText: PropTypes.string.isRequired,
};

export default Toggable;
