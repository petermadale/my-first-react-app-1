import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./connect";
import "./initialize-db";
import { authenticationRoute } from "./authenticate";
import path from "path";
import {
  updateClient,
  deleteClient,
  addClient,
  updateUser,
} from "./communicate-db";

let port = process.env.PORT || 3000;
let app = express();

app.listen(port, console.log("Server listening on port", port));

// app.get("/", (req, res) => {
//   res.send("Hello world!!!");
// });

app.use(cors(), bodyParser.urlencoded({ extended: true }), bodyParser.json());

authenticationRoute(app);

if (process.env.NODE_ENV == `production`) {
  app.use(express.static(path.resolve(__dirname, "../../dist")));
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve("index.html"));
  });
}

app.get("/clients", async (req, res) => {
  await getClients();
  res.status(200).send();
});

app.post("/client/update", async (req, res) => {
  let client = req.body.client;
  await updateClient(client);
  res.status(200).send();
});

app.post("/client/new", async (req, res) => {
  let client = req.body.client;
  await addClient(client);
  res.status(200).send();
});

app.delete("/clients/:id", async (req, res) => {
  let id = req.params.id;
  await deleteClient(id);
  res.sendStatus(200);
});

app.post("/users/update", async (req, res) => {
  let user = req.body.user;
  await updateUser(user);
  res.sendStatus(200);
});
