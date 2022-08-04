import Swal from "sweetalert2";
export const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 5000,
});
export const Swal_alert = Swal;

export const alert_msg = {
  server_error: "Failed to connect to server.",
  client_and_address_create_success: "Client and client address saved.",
  client_update_success: "Client updated.",
  client_verify_success: "Client verified.",
  client_create_success: "Client address added.",
  client_upload_processing: "Processing client upload.",
  client_upload_success: "Client upload success.",
  client_upload_error: "Client upload error.",
  client_delete_success:
    "Client and client addresse(s) are deleted from the database.",
  client_delete_request_success:
    "Client delete request pending Admin approval.",
  client_address_update_success: "Client address updated.",
  client_address_delete_success: "Client address deleted.",
  client_suggest_edits_success: "Client suggest edits success.",
  save_meeting_success: "Meeting successfully saved.",
  edit_meeting_success: "Meeting updated successfully.",
  meeting_delete_success: "Meeting deleted successfully.",
  verify_meeting_success: "Meeting verified successfully.",
  verify_meeting_error: "Meeting verified error.",
};

export const clients_alert_msg = {};

export const users_alert_msg = {
  update_success: "User details updated.",
  create_success: "User account created successfully.",
  delete_success: "User account deleted successfully.",
  name_reserved: "A user with that account name already exists.",
  authenticated: "Logged in successfully.",
  logout: "Logged out successfully.",
};
