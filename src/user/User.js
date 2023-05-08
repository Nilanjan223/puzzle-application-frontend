import React, { useContext, useState } from "react";

import LoadingSpinner from "../shared/UIElements/LoadingSpinner";

import Clue1 from "./clue1";
import Clue2 from "./clue2";
import Clue3 from "./clue3";
import Clue4 from "./clue4";
import Clue5 from "./clue5";
import Final from "./final";
import { AuthContext } from "../context/auth-context";

import "./clue.css";

const User = () => {
  const auth = useContext(AuthContext);
  const [result, setResult] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currStage, setCurrStage] = useState(1);
  const [hint, setHint] = useState(0);
  const [count, setCount] = useState(0);

  //   console.log("start");
  //   console.log("count: ", count);
  //   console.log("hint: ", hint);
  //   console.log("stage: ", currStage);

  if (count === 0) {
    // useEffect(() => {
    const fetchUsers = async () => {
      try {
        // console.log("here");
        const response = await fetch(
          `http://localhost:5000/api/user/${auth.userId}`
        );
        const responseData = await response.json();
        // console.log(responseData);
        setCurrStage(responseData.stage);
        setHint(responseData.hint);
        setIsLoading(false);
        setCount(1);
      } catch (err) {
        setIsLoading(false);
      }
    };
    fetchUsers();
    // });
  }
  const submitHandler = () => {
    setCurrStage((prev) => prev + 1);
  };

  const hintHandler = () => {
    setHint((prev) => prev + 1);
  };

  const saveHandler = async () => {
    try {
      await fetch(`http://localhost:5000/api/user/${auth.userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stage: currStage,
          hint: hint,
        }),
      });
      //   const responseData = await response.json();
      //   console.log("PATCH", responseData.user);
    } catch (err) {}
  };

  const finalHandler = () => {
    setResult(true);
  };

  if (isLoading) {
    <h2>
      <LoadingSpinner />
    </h2>;
  }

  return (
    <div>
      <h1> Puzzle Game</h1>
      <h2>Assess Your Overall Soft Skills</h2>
      <br />
      {currStage <= 5 && <h2>CLUE {currStage}</h2>}
      {currStage === 1 && (
        <Clue1
          clue="1, 1, 2, 3, 5, 8, ? . Find '?'"
          onSubmit={submitHandler}
          onclick={hintHandler}
        />
      )}
      {currStage === 2 && (
        <Clue2
          clue="What has to be broken before you can use it?"
          onSubmit={submitHandler}
          onclick={hintHandler}
        />
      )}
      {currStage === 3 && (
        <Clue3
          clue="Identify country."
          onSubmit={submitHandler}
          onclick={hintHandler}
        />
      )}
      {currStage === 4 && (
        <Clue4
          clue="Identify Sport by Ground. Click on the link below to view ground"
          onSubmit={submitHandler}
          onclick={hintHandler}
        />
      )}
      {currStage === 5 && (
        <Clue5
          clue="____ is the capital of India"
          onSubmit={submitHandler}
          onclick={hintHandler}
        />
      )}

      {currStage === 6 && <Final onclick={finalHandler} />}
      {result && (
        <div>
          <div className="text2">HINTS USED : {hint}</div>
          <div className="text2">SCORE:{((5 - hint) / 5) * 100}%</div>
        </div>
      )}

      <footer>
        <button type="submit" className="button-3" onClick={saveHandler}>
          SAVE YOUR ASSESSMENT
        </button>
      </footer>
    </div>
  );
};

export default User;
