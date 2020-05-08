import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./connect-db";
import "./initialize-db";
import { authenticationRoute } from "./authenticate";
import { connect } from "mongodb";
import path from "path";

//let port = process.env.PORT || 7777;
let app = express();

app.listen(port, console.log("Server listening on port", port));

// app.get("/", (req, res) => {
//   res.send("Hello world!!!");
// });

app.use(cors(), bodyParser.urlencoded({ extended: true }), bodyParser.json());

authenticationRoute(app);

// if (process.env.NODE_ENV == `production`) {
//   app.use(express.static(path.resolve(__dirname, "../../dist")));
//   app.get("/*", (req, res) => {
//     res.sendFile(path.resolve("index.html"));
//   });
// }
// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

export const addNewUnitTypes = async (unit_types) => {
  let db = await connectDB();
  let collection = db.collection(`unit_types`);
  await collection.insertOne(unit_types);
};

export const updateUnitTypes = async (unit_type) => {
  let { id, name } = unit_type;
  let db = await connectDB();
  let collection = db.collection(`unit_types`);

  if (name) {
    await collection.updateOne({ id }, { $set: { name } });
  }
};

export const updateClient = async (client) => {
  let { id, name } = client;
  let db = await connectDB();
  let collection = db.collection(`clients`);
  if (name) {
    await collection.updateOne({ id }, { $set: { name } });
  }
};

export const deleteClient = async (id) => {
  console.log(id);
  let db = await connectDB();
  let collection = db.collection(`clients`);
  await collection.deleteOne({ id: id }, (err, clients) => {
    if (err) {
      res.send("error removing");
    } else {
      console.log(clients);
      res.status(204);
    }
  });
};

export const getClients = async () => {
  let db = await connectDB();

  let clients = await db.collection(`clients`).find().toArray();

  return {
    clients,
  };
};
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
  let db = await connectDB();
  let collection = db.collection(`clients`);
  await collection.insertOne(client);
  res.status(200).send();
});

app.delete("/clients/:id", async (req, res) => {
  let id = req.params.id;
  deleteClient(id);

  res.status(200).send();
});

app.post("/unit_types/new", async (req, res) => {
  let unit_types = req.body.unit_types;
  await addNewUnitTypes(unit_types);
  res.status(200).send();
});

app.post("/unit_types/update", async (req, res) => {
  let unit_type = req.body.unit_type;
  await updateUnitTypes(unit_type);
  res.status(200).send();
});
