import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  validate,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../shared/util/validators";

import { AuthContext } from "../context/auth-context";

import "./login.css";

const Login = (props) => {
  //   let valid;
  //   valid = false;
  const [valid, setIsValid] = useState(false);
  const [Etouched, setIsETouched] = useState(false);
  const [Ptouched, setIsPTouched] = useState(false);

  const history = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const auth =useContext(AuthContext);

  const EtouchHandler = () => {
    setIsETouched(true);
  };

  const PtouchHandler = () => {
    setIsPTouched(true);
  };

  const EchangeHandler = (event) => {
    setCredentials({
      email: event.target.value,
      password: credentials.password,
    });
  };

  const PchangeHandler = (event) => {
    setCredentials({
      email: credentials.email,
      password: event.target.value,
    });
  };

  useEffect(() => {
    // console.log('useEffect');
    // console.log(credentials);
    // console.log(valid);
    let valid_temp =
      validate(credentials.email, [VALIDATOR_EMAIL()]) &&
      validate(credentials.password, [
        VALIDATOR_MINLENGTH(6),
        VALIDATOR_REQUIRE(),
      ]);
    setIsValid(valid_temp);
  }, [credentials, valid]);

  //   const buttonHandler = () => {

  //   console.log(valid);
  // console.log(Etouched)
  // console.log(Ptouched)
  // return valid;
  //   };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const responseData=await response.json();
      
    //   console.log(responseData.USERS);
      

      if(!responseData.USERS)
      {
        alert(responseData.message);
      }
      else
      {
        // console.log('DATASET',responseData.USERS);
        const adminEmail="admin@test.com";
        const userId=responseData.USERS._id.toString();
        // console.log('LOGIN',userId);

        if(responseData.USERS.email === adminEmail)
        {
            auth.alogin();
            auth.login(userId);
            history('/admin');
        }
        else
        {
            auth.login(userId);
            history(`user/${userId}`);
        }
        
      }
    } catch (err) {}

    // if (valid) {
    //   history("/user");
    // }
  };

  return (
    <div>
        <p className="text"> If logging in first time.User database will automatically be created.</p>
      <form>
        <input
          value={credentials.email}
          type="email"
          placeholder="Please enter your e-mail address"
          onBlur={EtouchHandler}
          onChange={EchangeHandler}
        />
        <input
          value={credentials.password}
          type="password"
          placeholder="Enter your password"
          onBlur={PtouchHandler}
          onChange={PchangeHandler}
        />

        {!valid && Ptouched && Etouched && (
          <div className="error"> Invalid Email or Password(MIN:6 char)</div>
        )}

        <button
          type="submit"
          className="button-3"
          disabled={!valid}
          onClick={submitHandler}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

// onchange =(event) =>
// setCredentials({
//   email: credentials.email,
//   password: event.target.value,
// })
