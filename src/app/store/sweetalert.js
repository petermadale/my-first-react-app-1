import Swal from "sweetalert2";
export const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 4000,
});
export const Swal_alert = Swal;
