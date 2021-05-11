import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from "./Form";

const UserSignIn = (props) => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const change = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "emailAddress") {
      setEmailAddress(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const submit = () => {
    const { context } = props;
    const { from } = props.location.state || {
      from: { pathname: "/" },
    };
    context.actions
      .signIn(emailAddress, password)
      .then((user) => {
        if (user === null) {
          setErrors(["Sign-in was unsucessfull"]);
        } else {
          props.history.push(from);
          console.log(`SUCCESS! ${emailAddress} is now signed in!`);
        }
      })
      .catch((err) => {
        console.log(err);
        props.history.push("/error");
      });
  };

  const cancel = () => {
    props.history.push("/");
  };

  return (
    <>
      <div className="form--centered">
        <h2>Sign In</h2>

        <Form
          cancel={cancel}
          errors={errors}
          submit={submit}
          submitButtonText="Sign In"
          elements={() => (
            <>
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
            </>
          )}
        />

        <p>
          Don't have a user account? Click here to{" "}
          <Link to="/signup">sign up</Link>!
        </p>
      </div>
    </>
  );
};

export default UserSignIn;
