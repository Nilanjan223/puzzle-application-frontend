import React, { useState } from "react";

import "./clue.css";

const Final = (props) => {
  const [click, setIsClick] = useState(false);

  const clickHandler = () => {
    setIsClick(true);
    props.onclick();
  };

  return (
    <div>
      <div className="text">CONGRATULATIONS..!! YOU COMPLETED THE HUNT.</div>
      <div className="text">
        SAVE YOUR ASSESSMENT AND CLICK ON THE BUTTON BELOW
      </div>
      <br />
      <button
        type="submit"
        className="button-3"
        onClick={clickHandler}
        disabled={click}
      >
        CLICK HERE
      </button>
    </div>
  );
};

export default Final;
