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
  addMyFavorites,
  removeMyFavorites,
  addPersonalNotes,
  updatePersonalNotes,
  deletePersonalNote,
  addClientContactDetails,
  upateClientContactDetails,
  deleteClientContactDetails,
  deleteUser,
  suggestEditsClientContactDetails,
  approveClientContactDetailsSuggestion,
  rejectClientContactDetailSuggestion,
} from "./communicate-db";
import { updateClientContactDetails } from "../app/store/mutations";

let port = process.env.PORT || 7777;
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

app.post("/clients/update", async (req, res) => {
  let client = req.body.client;
  await updateClient(client);
  res.status(200).send();
});

app.post("/clients/new", async (req, res) => {
  let client = req.body.client;
  await addClient(client);
  res.status(200).send({ id: client.id });
});

app.delete("/clients/:id", async (req, res) => {
  let id = req.params.id;
  await deleteClient(id);
  res.sendStatus(200);
});

app.post("/clientContactDetails/new", async (req, res) => {
  let clientContact = req.body.clientContact;
  await addClientContactDetails(clientContact);
  res.status(200).send({ clientID: clientContact.client });
});

app.post("/clientContactDetails/update", async (req, res) => {
  let clientContact = req.body.clientContact;
  await upateClientContactDetails(clientContact);
  res.status(200).send({ clientID: clientContact.client });
});

app.delete("/clientContactDetails/:id", async (req, res) => {
  let id = req.params.id;
  await deleteClientContactDetails(id);
  res.sendStatus(200);
});

app.get("/clientContactDetailsSuggestions", async (req, res) => {
  try {
    let db = await connectDB();
    let collection = db.collection(`clientContactDetailsSuggestions`);
    let clientContactDetailsSuggestions = await collection.find().toArray();
    res.status(200).send({
      clientContactDetailsSuggestions: clientContactDetailsSuggestions,
    });
  } catch (err) {
    console.log("error:".err.stack);
  }
});

app.post("/clientContactDetailsSuggestions/new", async (req, res) => {
  let clientContact = req.body.clientContact;
  await suggestEditsClientContactDetails(clientContact);
  res.status(200).send({ id: clientContact.id });
});

app.post("/approveClientContactDetailsSuggestions", async (req, res) => {
  let clientContactDetailsSuggestions =
    req.body.clientContactDetailsSuggestions;
  await approveClientContactDetailsSuggestion(clientContactDetailsSuggestions);
  res.status(200).send({ clientID: clientContactDetailsSuggestions.client });
});

app.delete("/clientContactDetailsSuggestions/:id", async (req, res) => {
  let id = req.params.id;
  await rejectClientContactDetailSuggestion(id);
  res.sendStatus(200);
});

app.post("/users/update", async (req, res) => {
  //let user = req.body.user;
  //   await updateUser(user);
  //   res.status(200).send({ user: user });
  let {
    id,
    firstName,
    lastName,
    location,
    officePhoneNumber,
    cellPhoneNumber,
    email,
    username,
  } = req.body.user;
  let db = await connectDB();
  let collection = db.collection(`users`);
  //   collection = collection.find({ id: { $ne: id } });
  let users_fullname = await collection.findOne({
    firstName,
    lastName,
    id: { $ne: id },
  });
  let users_username = await collection.findOne({ username, id: { $ne: id } });
  if (users_fullname) {
    res.status(500).send({
      message:
        "A user with that account first name and last name already exists.",
      nameReserved: true,
    });
    return;
  }
  if (users_username) {
    res.status(500).send({
      message: "A user with that username already exists.",
      usernameReserved: true,
    });
    return;
  }
  if (id) {
    let dateToday = new Date();
    let lastDateUpdated = dateToday.toLocaleString();
    const userdata = {
      id,
      firstName,
      lastName,
      location,
      officePhoneNumber,
      cellPhoneNumber,
      email,
      username,
      lastDateUpdated,
    };
    await collection.updateOne(
      { id },
      {
        $set: {
          firstName,
          lastName,
          location,
          officePhoneNumber,
          cellPhoneNumber,
          email,
          username,
          lastDateUpdated,
          // passwordHash,
        },
      }
    );
    res.status(200).send({ user: userdata });
  }
});

app.delete("/users/:id", async (req, res) => {
  let id = req.params.id;
  await deleteUser(id);
  res.sendStatus(200);
});

app.post("/myfavorites/new", async (req, res) => {
  let myfavorite = req.body.myfavorite;
  await addMyFavorites(myfavorite);
  res.status(200).send();
});

app.delete("/myfavorites/:id", async (req, res) => {
  let id = req.params.id;
  await removeMyFavorites(id);
  res.sendStatus(200);
});

app.post("/personalnotes/new", async (req, res) => {
  let personalnote = req.body.personalnote;
  await addPersonalNotes(personalnote);
  res.status(200).send();
});

app.post("/personalnotes/update", async (req, res) => {
  let personalnote = req.body.personalnote;
  await updatePersonalNotes(personalnote);
  res.status(200).send();
});

app.delete("/personalnotes/:id", async (req, res) => {
  let id = req.params.id;
  await deletePersonalNote(id);
  res.sendStatus(200);
});
