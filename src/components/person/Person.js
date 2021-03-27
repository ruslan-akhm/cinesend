import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Spinner from "../spinner/Spinner";
import "./Person.css";

function Person(props) {
  const [person, setPerson] = useState();
  const [isLoading, setIsLoading] = useState(true);
  let history = useHistory();
  useEffect(() => {
    const fecthData = async () => {
      const response = await fetch(
        `https://swapi.dev/api/people/${props.match.params.id}`
      );
      const data = await response.json();
      setIsLoading(false);
      if (data.detail) {
        return history.push("/pages/1");
      }
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
    <div id="person">
      {isLoading ? (
        <div className="loading-person glass-person">
          <Spinner />
        </div>
      ) : (
        <div className="person-box glass-person">
          {person ? (
            <>
              <div className="left-box">
                <ul className="left-box-wrapper">
                  <ul className="left-box-lists">
                    <h4>Films:</h4>
                    {person.films.length > 0 ? (
                      person.films.map((film, index) => {
                        return (
                          <a
                            href={film}
                            target="_blank"
                            rel="noreferrer"
                            key={"film" + index}
                          >
                            <li>Film {index + 1} &#8599;</li>
                          </a>
                        );
                      })
                    ) : (
                      <span>N/A</span>
                    )}
                  </ul>
                  <ul className="left-box-lists">
                    <h4>Starships:</h4>
                    {person.starships.length > 0 ? (
                      person.films.map((ship, index) => {
                        return (
                          <a
                            href={ship}
                            target="_blank"
                            rel="noreferrer"
                            key={"ship" + index}
                          >
                            <li>Ship {index + 1} &#8599;</li>
                          </a>
                        );
                      })
                    ) : (
                      <span>N/A</span>
                    )}
                  </ul>
                  <ul className="left-box-lists">
                    <h4>Vehicles:</h4>
                    {person.starships.length > 0 ? (
                      person.films.map((veh, index) => {
                        return (
                          <a
                            href={veh}
                            target="_blank"
                            rel="noreferrer"
                            key={"vehicle" + index}
                          >
                            <li>Vehicle {index + 1} &#8599;</li>
                          </a>
                        );
                      })
                    ) : (
                      <span>N/A</span>
                    )}
                  </ul>
                </ul>
              </div>
              <div className="right-box">
                <h1>{person.name}</h1>
                <ul>
                  <li>
                    <label>DOB:</label>
                    <p>&nbsp;{person.birth_year}</p>
                  </li>
                  <li>
                    <label>Gender:</label>
                    <p>&nbsp;{person.gender}</p>
                  </li>
                  <li>
                    <label>Eye Color:</label>
                    <p>&nbsp;{person.eye_color}</p>
                  </li>
                  <li>
                    <label>Hair Color:</label>
                    <p>&nbsp;{person.hair_color}</p>
                  </li>
                  <li>
                    <label>Skin Color:</label>
                    <p>&nbsp;{person.skin_color}</p>
                  </li>
                  <li>
                    <label>Height:</label>
                    <p> &nbsp;{person.height}</p>
                  </li>
                  <li>
                    <label>Mass:</label>
                    <p> &nbsp;{person.mass}</p>
                  </li>
                </ul>
              </div>
            </>
          ) : null}
        </div>
      )}
      <button onClick={handleButton} className="back-button">
        BACK
      </button>
    </div>
  );
}

export default Person;
