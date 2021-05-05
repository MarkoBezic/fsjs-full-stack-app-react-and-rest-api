import React from "react";

const Authenticated = ({ context }) => {
  const authUser = context.authenticatedUser;
  return (
    <div>{`${authUser.firstName} ${authUser.lastName} `}is Authenticated!</div>
  );
};

export default Authenticated;
