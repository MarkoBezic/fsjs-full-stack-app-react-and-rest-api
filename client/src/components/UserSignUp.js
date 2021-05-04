import React, { useState } from "react";
import { Link } from "react-router-dom";

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
    const { context } = this.props;

    const user = {
      firstName: firstName,
      lastName: lastName,
      emailAddress: emailAddress,
      confirmedPassword: confirmedPassword,
      password: password,
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
        props.history.push("/");
      });
  };

  const cancel = () => {
    props.history.push("/");
  };

  return (
    <>
      <div className="form--centered">
        <h2>Sign Up</h2>

        <form onSubmit={submit} errors={errors}>
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            onChange={change}
            value={firstName}
            placeholder="First Name"
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            onChange={change}
            value={lastName}
            placeholder="Last Name"
          />
          <label htmlFor="emailAddress">Email Address</label>
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            onChange={change}
            value={emailAddress}
            placeholder="Email Address"
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={change}
            value={password}
            placeholder="Enter Password"
          />
          <label htmlFor="confirmedPassword">Confirm Password</label>
          <input
            id="confirmedPassword"
            name="confirmedPassword"
            type="password"
            onChange={change}
            value={confirmedPassword}
            placeholder="Confirm Password"
          />
          <button className="button" type="submit" onSubmit={submit}>
            Sign Up
          </button>
          <button className="button button-secondary" onClick={cancel}>
            Cancel
          </button>
        </form>
        <p>
          Already have a user account? Click here to{" "}
          <Link to="/signin">sign in</Link>!
        </p>
      </div>
    </>
  );
};

export default UserSignUp;
