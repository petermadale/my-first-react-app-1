const url = process.env.NODE_ENV == `production` ? `` : "http://localhost:8080";

export const sendFeedback = function (name, id) {
  const message_html =
    '<a href="http://localhost:8080/?returnurl=user/' +
    id +
    '/true" target="_blank">' +
    name +
    "</a> updated his/her user details. Please login to your account to see the changes.";
  emailjs.send("gmail", "ndd_crm", {
    message_html,
  });
};
