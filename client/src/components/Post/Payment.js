import React from "react";

function Payment(props) {
  const { amount } = props;
  
  return <div>Please confirm you want to purchase a post for ${amount}</div>;
}

export default Payment;
