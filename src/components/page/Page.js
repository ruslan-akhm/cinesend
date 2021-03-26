import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../context/Context";

function Page(props) {
  const [list, setList] = useState();
  const [count, setCount] = useState();
  const { page, setPage } = useContext(UserContext);
  let history = useHistory();

  useEffect(() => {
    setPage(props.match.params.page);
    const fecthData = async () => {
      const response = await fetch(
        `https://swapi.dev/api/people/?page=${props.match.params.page}`
      );
      const data = await response.json();
      if (data.detail) {
        history.push("/pages/1");
      }
      setList(data.results);
      setCount(data.count);
    };
    fecthData();

    return () => {
      setList();
      setCount();
    };
  }, [props]);

  const listOfPeople =
    list &&
    list.map(person => {
      const id = person.url.match(/\d+/g)[0];
      return (
        <div>
          <Link to={{ pathname: `/person/${id}`, params: { id } }}>
            {person.name}
          </Link>
        </div>
      );
    });

  return (
    <div>
      <div>Page number: {page}</div>
      <ul>{listOfPeople}</ul>
      {page == 1 ? null : (
        <Link onClick={() => setPage(+page - 1)} to={"/pages/" + (+page - 1)}>
          back
        </Link>
      )}
      {Math.ceil(count / 10) == page ? null : (
        <Link onClick={() => setPage(+page + 1)} to={"/pages/" + (+page + 1)}>
          -- >
        </Link>
      )}
    </div>
  );
}

export default Page;
