import React from "react";
import ReactDOM from "react-dom";
import ClientsList from "./ClientsList";

it("It should mount", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ClientsList />, div);
  ReactDOM.unmountComponentAtNode(div);
});
