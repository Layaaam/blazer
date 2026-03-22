// /babeljs.io - html to react js code

import { Fragment } from "react";

function ListGroup() {
  let papasin = ["Regina Agnes", "Michael Ray", "Liam Christian"];
  papasin = [];

  const getMessage = () => {
    return papasin.length === 0 ? <p>No item found</p> : null;
  };

  //   if (papasin.length == 0)
  //     return (
  //       <Fragment>
  //         <h1>Family</h1>
  //         <p>No item found</p>
  //       </Fragment>
  //     );

  // CTRL D for multi cursor editing refactoring
  // React cannot return more than one element.
  // what is fragment
  return (
    <Fragment>
      <h1>Papasin</h1>
      {getMessage()}
      <ul className="list-group">
        {/* .map function - please researh for typscript */}
        {papasin.map((item) => (
          <li key={item} className="list-group-item">
            {item}
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

export default ListGroup;
