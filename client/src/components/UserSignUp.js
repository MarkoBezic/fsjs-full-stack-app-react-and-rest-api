import axios from "axios";
import React from "react";

const UserSignUp = (props) => {
  return (
    <>
      <div className="form--centered">
        <h2>Sign Up</h2>

        <form>
          <label for="firstName">First Name</label>
          <input id="firstName" name="firstName" type="text" value="" />
          <label for="lastName">Last Name</label>
          <input id="lastName" name="lastName" type="text" value="" />
          <label for="emailAddress">Email Address</label>
          <input id="emailAddress" name="emailAddress" type="email" value="" />
          <label for="password">Password</label>
          <input id="password" name="password" type="password" value="" />
          <label for="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value=""
          />
          <button
            className="button"
            type="submit"
            onClick={() => {
              axios.post("http://localhost:5000/api/users");
            }}
          >
            Sign Up
          </button>
          <button
            className="button button-secondary"
            onClick={(event) => {
              event.preventDefault();
              props.history.push("/");
            }}
          >
            Cancel
          </button>
        </form>
        <p>
          Already have a user account? Click here to{" "}
          <a href="sign-in.html">sign in</a>!
        </p>
      </div>
    </>
  );
};

export default UserSignUp;
