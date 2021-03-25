import React from "react";

function Page(props) {
  return <div>Page number: {props.match.params.page}</div>;
}

export default Page;
