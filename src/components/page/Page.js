import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Spinner from "../spinner/Spinner";
import "./Page.css";

function Page(props) {
  const [list, setList] = useState(); //list of characters for this page
  const [count, setCount] = useState(); //total number of characters
  const [page, setPage] = useState(); //current page
  const [isLoading, setIsLoading] = useState(true);
  let history = useHistory();
  //Initial API call to get list of characters + state upd
  useEffect(() => {
    setPage(props.match.params.page);
    const fecthData = async () => {
      const response = await fetch(
        `https://swapi.dev/api/people/?page=${props.match.params.page}`
      );
      const data = await response.json();
      setIsLoading(false);
      //if no data (data.detail = "Not Found") in the response - redirect
      if (data.detail) {
        return history.push("/pages/1");
      }
      setList(data.results);
      setCount(data.count);
    };
    fecthData();
    //clearing state when component unmounts
    return () => {
      setList();
      setCount();
      setIsLoading(true);
    };
  }, [props]);

  //map through the list to reflect particular data
  const listOfPeople =
    list &&
    list.map(person => {
      const id = person.url.match(/\d+/g)[0];
      return (
        <Link to={{ pathname: `/person/${id}`, params: { id } }} key={id}>
          <li>
            <h2>{person.name}</h2>
            <div className="info">
              <p>
                DOB: <strong>{person.birth_year}</strong>
              </p>
              <p>
                Height: <strong>{person.height}</strong>
              </p>
              <p>
                Mass: <strong>{person.mass}</strong>
              </p>
            </div>
          </li>
        </Link>
      );
    });

  return (
    <div id="page">
      <div id="container">
        {isLoading ? (
          <div className="loading-box glass-page">
            <Spinner />
          </div>
        ) : (
          <ul className="glass-page">{listOfPeople}</ul>
        )}
        <div className="page-nav-box">
          {page == 1 ? null : (
            <Link
              className="nav-button prev-page"
              onClick={() => setPage(+page - 1)}
              to={"/pages/" + (+page - 1)}
            >
              &#8678;
            </Link>
          )}
          <p>Page: {page}</p>
          {Math.ceil(count / 10) == page ? null : (
            <Link
              className="nav-button next-page"
              onClick={() => setPage(+page + 1)}
              to={"/pages/" + (+page + 1)}
            >
              &#8680;
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
