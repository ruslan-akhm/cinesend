import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function Person(props) {
  const [person, setPerson] = useState();
  let history = useHistory();
  useEffect(() => {
    fetch(`https://swapi.dev/api/people/${props.match.params.id}`)
      .then(res => res.json())
      .then(data => {
        //console.log(data);
        setPerson(data);
      });

    return () => {
      setPerson(null);
    };
  }, []);

  const handleButton = () => {
    //if we came from "/pages/*" - we are redirected back to page we came from
    //else "back" button will take us to the first page - "/pages/1"
    if (props.location.params && props.location.params.id) {
      history.goBack();
    } else {
      history.push("/pages/1");
    }
  };

  return (
    <div>
      Person's name / url: {props.match.params.id}
      <button onClick={handleButton}>BACK</button>
    </div>
  );
}

export default Person;
