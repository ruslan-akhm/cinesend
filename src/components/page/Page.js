import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/Context";

function Page(props) {
  const [list, setList] = useState();
  const { person, setPerson, page, setPage } = useContext(UserContext);

  useEffect(() => {
    setPage(props.match.params.page);
  }, []);

  useEffect(() => {
    //console.log(page);
    fetch(`https://swapi.dev/api/people/?page=${page}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setList(data.results);
        //if data.error (status 404) - redirect to page 1
      });
  }, [page]);

  const listOfPeople =
    list &&
    list.map(person => {
      return (
        <div>
          <a
            onClick={() => {
              setPerson(person);
            }}
            href={"/person/" + person.name.split(" ").join("").toLowerCase()}
          >
            {person.name}
          </a>
        </div>
      );
    });

  return (
    <div>
      <div>Page number: {page}</div>
      <ul>{listOfPeople}</ul>
      <Link onClick={() => setPage(+page + 1)} to={"/pages/" + (+page + 1)}>
        ->
      </Link>
    </div>
  );
}

export default Page;
