import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from "./Form.js";

const UserSignUp = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setCofirmedPassword] = useState("");
  const [errors, setErrors] = useState("");

  const change = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "firstName") {
      setFirstName(value);
    } else if (name === "lastName") {
      setLastName(value);
    } else if (name === "emailAddress") {
      setEmailAddress(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "confirmedPassword") {
      setCofirmedPassword(value);
    }
  };

  const submit = () => {
    const { context } = props;

    const user = {
      firstName,
      lastName,
      emailAddress,
      confirmedPassword,
      password,
    };

    context.data
      .createUser(user)
      .then((errors) => {
        if (errors.length) {
          setErrors(errors);
        } else {
          console.log(
            `${emailAddress} is successfully signed up and authenticated`
          );
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
        <h2>Sign Up</h2>

        <Form
          cancel={cancel}
          errors={errors}
          submit={submit}
          submitButtonText="Sign Up"
          elements={() => (
            <>
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                onChange={change}
                value={firstName}
              />
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                onChange={change}
                value={lastName}
              />
              <label htmlFor="emailAddress">Email Address</label>
              <input
                id="emailAddress"
                name="emailAddress"
                type="email"
                onChange={change}
                value={emailAddress}
              />
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                onChange={change}
                value={password}
              />
              <label htmlFor="confirmedPassword">Confirm Password</label>
              <input
                id="confirmedPassword"
                name="confirmedPassword"
                type="password"
                onChange={change}
                value={confirmedPassword}
              />
            </>
          )}
        />
        <p>
          Already have a user account? Click here to{" "}
          <Link to="/signin">sign in</Link>!
        </p>
      </div>
    </>
  );
};

export default UserSignUp;
