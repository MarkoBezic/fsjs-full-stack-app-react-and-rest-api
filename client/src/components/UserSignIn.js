import React, { useState } from "react";
import { Link } from "react-router-dom";

const UserSignIn = (props) => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const change = (e) => {
    const name = e.target.name;
    const value = e.tartget.value;

    if (name === emailAddress) {
      setEmailAddress(value);
    } else if (name === password) {
      setPassword(value);
    }
  };

  const submit = () => {
    const { context } = props;
    context.actions
      .signIn(emailAddress, password)
      .then((user) => {
        if (user === null) {
          setErrors(["Sign-in was unsucessfull"]);
        } else {
          props.history.push("/");
          console.log(`SUCCESS! ${emailAddress} is now signed in!`);
        }
      })
      .catch((err) => {
        console.log(err);
        props.history.push("/");
      });
  };

  const cancel = () => {
    props.history.push("/");
  };

  return (
    <>
      <div className="form--centered">
        <h2>Sign In</h2>

        <form>
          <label htmlFor="emailAddress">Email Address</label>
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            value={emailAddress}
            onChange={change}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={change}
          />
          <button className="button" type="submit" onSubmit={submit}>
            Sign In
          </button>
          <button className="button button-secondary" onClick={cancel}>
            Cancel
          </button>
        </form>

        <p>
          Don't have a user account? Click here to{" "}
          <Link to="/signup">sign up</Link>!
        </p>
      </div>
    </>
  );
};

export default UserSignIn;
