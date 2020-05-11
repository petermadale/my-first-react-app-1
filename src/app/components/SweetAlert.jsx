import React from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// MySwal.fire({
//   title: <p>Hello World</p>,
//   footer: "Copyright 2018",
//   onOpen: () => {
//     // `MySwal` is a subclass of `Swal`
//     //   with all the same instance & static methods
//     MySwal.clickConfirm();
//   },
// }).then(() => {
//   return MySwal.fire(<p>Shorthand works too</p>);
// });
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
});
