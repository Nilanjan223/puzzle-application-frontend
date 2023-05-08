import React, { useState } from "react";

const Clue4 = (props) => {
  const [answer, setAnswer] = useState("");
  const d = "disabled";
  const [correct, setCorrect] = useState(!d);
  const [click, setIsClick] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (answer.toLowerCase() === "cricket") {
      setCorrect(true);
      setIsClick(true);
      props.onSubmit();
    } else {
      alert("WRONG ANS FOR CLUE 4");
    }
  };

  const clickHandler = () => {
    setIsClick(true);
    props.onclick();
  };

  return (
    <div>
      <p className="text">{props.clue}</p>
      <a
        href="https://img.freepik.com/premium-psd/round-cricket-stadium-cut-out-earth-empty-play-ground-3d-illustration_394271-841.jpg?w=2000"
        target="_blank"
        rel="noreferrer"
      >
        GROUND
      </a>
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <div className="text">
          Answer:&nbsp;
          <input
            type="text"
            className="text1"
            value={answer}
            onChange={(event) => setAnswer(event.target.value)}
            disabled={correct}
          />
        </div>
        <br />
        {correct && <div>CORRECT ANSWER FOR CLUE 4.Keep going..!!!</div>}
        <button type="submit" className="button-3">
          Submit
        </button>
        <br />
        <br />
        <button
          type="submit"
          className="button-3"
          onClick={clickHandler}
          disabled={click}
        >
          Show Answer
        </button>
        <br />
        {click && <div className="text1">Answer is Cricket</div>}
      </form>
    </div>
  );
};

export default Clue4;
