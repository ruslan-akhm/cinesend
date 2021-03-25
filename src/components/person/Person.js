import React from "react";

function Person(props) {
  return <div>Person's id: {props.match.params.id}</div>;
}

export default Person;
