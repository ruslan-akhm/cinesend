import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function Person(props) {
  const [person, setPerson] = useState();
  let history = useHistory();
  useEffect(() => {
    const fecthData = async () => {
      const response = await fetch(
        `https://swapi.dev/api/people/${props.match.params.id}`
      );
      const data = await response.json();
      setPerson(data);
    };
    fecthData();

    return () => {
      setPerson(null);
    };
  }, []);

  const handleButton = () => {
    //if we came from "/pages/*" - we are redirected back to page we came from
    //else "back" button will take us to the first page - "/pages/1"
    if (props.history.location.key) {
      history.goBack();
    } else {
      history.push("/pages/1");
    }
  };

  return (
    <div>
      Person:
      <button onClick={handleButton}>BACK</button>
    </div>
  );
}

export default Person;
