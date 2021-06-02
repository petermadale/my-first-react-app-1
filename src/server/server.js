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
  verifyClient,
  deleteClientRequest,
  updateUser,
  addMyFavorites,
  removeMyFavorites,
  addPersonalNotes,
  updatePersonalNotes,
  deletePersonalNote,
  verifyPersonalNote,
  addClientContactDetails,
  upateClientContactDetails,
  deleteClientContactDetails,
  deleteAllClientContactDetails,
  deleteUser,
  suggestEditsClientContactDetails,
  approveClientContactDetailsSuggestion,
  rejectClientContactDetailSuggestion,
  requestRejectCancelDeleteClientRequest,
  saveMeeting,
  editMeeting,
  verifyMeeting,
  deleteMeeting,
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
  let db = await connectDB();
  let collection = db.collection(`clients`);
  let clients = await collection.find().toArray();
  res.status(200).send({ clients: clients });
});

app.post("/clients/update", async (req, res) => {
  let client = req.body.client;
  await updateClient(client);
  res.status(200).send();
});

app.post("/clients/verify", async (req, res) => {
  //let id = req.body.id;  
  let data = req.body.data;
  await verifyClient(data);
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

app.post("/clients/deleteClientRequest", async (req, res) => {
  let data = req.body.data;
  await deleteClientRequest(data);
  res.status(200).send();
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

app.post("/clientContactDetails/deleteAll", async (req, res) => {
  let clientData = req.body.clientData;
  await deleteAllClientContactDetails(clientData);
  res.status(200).send();
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

app.delete("/requestRejectCancelDeleteClientRequest/:id", async (req, res) => {
  let id = req.params.id;
  let db = await connectDB();
  let collection = db.collection(`clientsDeleteRequest`);
  let data = await collection.findOne({ id: id });
  if (!data || data === null) {
    res.status(500).send({
      message: "Delete client request not found.  Please login and try again.",
    });
    return;
  }
  await requestRejectCancelDeleteClientRequest(id);
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
    otherLocation,
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
      otherLocation,
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
          otherLocation,
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
app.get("/personalnotes/:id", async (req, res) => {
  let id = req.params.id;
  let db = await connectDB();
  let note = await db.collection(`personalnotes`).findOne({ id: id });
  if (note) {
    res.status(200).send({
      note: note,
    });
    return;
  } else {
    return res.status(500).send({
      message:
        "Personal note not found in database.  Please logout and log back in to refresh data.",
    });
  }
});

app.post("/personalnotes/verify", async (req, res) => {
  let notedata = req.body.notedata;
  await verifyPersonalNote(notedata);
  res.sendStatus(200);
});

app.post("/mymeetings/new", async (req, res) => {
  let data = req.body.data;
  await saveMeeting(data);
  res.status(200).send();
});

app.post("/mymeetings/update", async (req, res) => {
  let meetingdata = req.body.meetingdata;
  await editMeeting(meetingdata);
  res.status(200).send();
});

app.post("/mymeetings/verify", async (req, res) => {
  //   let meetingdata = req.body.meetingdata;
  //   await verifyMeeting(meetingdata);
  let { id, dateVerified } = req.body.meetingdata;
  let db = await connectDB();
  let collection = db.collection(`mymeetings`);
  if (id) {
    await collection.updateOne(
      { id },
      {
        $set: {
          isVerified: true,
          dateVerified,
        },
      }
    );
    res.status(200).send();
  } else {
    res.status(500).send({
      message: "Meeting not found!  Please login and try again.",
    });
  }
});

app.delete("/mymeetings/:id", async (req, res) => {
  let id = req.params.id;
  await deleteMeeting(id);
  res.sendStatus(200);
});
