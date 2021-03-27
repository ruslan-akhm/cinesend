import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Spinner from "../spinner/Spinner";
import "./Page.css";

function Page(props) {
  const [list, setList] = useState();
  const [count, setCount] = useState();
  const [page, setPage] = useState();
  const [isLoading, setIsLoading] = useState(true);
  let history = useHistory();

  useEffect(() => {
    setPage(props.match.params.page);
    const fecthData = async () => {
      const response = await fetch(
        `https://swapi.dev/api/people/?page=${props.match.params.page}`
      );
      const data = await response.json();
      setIsLoading(false);
      if (data.detail) {
        return history.push("/pages/1");
      }
      setList(data.results);
      setCount(data.count);
    };
    fecthData();

    return () => {
      setList();
      setCount();
      setIsLoading(true);
    };
  }, [props]);

  const listOfPeople =
    list &&
    list.map(person => {
      const id = person.url.match(/\d+/g)[0];
      return (
        <Link to={{ pathname: `/person/${id}`, params: { id } }} key={id}>
          <li>
            <h2>{person.name}</h2>
            <div>
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
