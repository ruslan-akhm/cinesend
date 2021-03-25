import React, { useEffect, useContext } from "react";
import { UserContext } from "../../context/Context";

function Person(props) {
  const { person, setPerson } = useContext(UserContext);
  useEffect(() => {
    console.log(person);
  }, [person]);

  return <div>Person's name / url: {props.match.params.name}</div>;
}

export default Person;
