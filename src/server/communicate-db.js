import { connectDB } from "./connect";

export const addClient = async (client) => {
  try {
    let db = await connectDB();
    let collection = db.collection(`clients`);
    await collection.insertOne(client);
  } catch (err) {
    console.log("error:".err.stack);
  }
};

export const updateClient = async (client) => {
  try {
    let { id, owner, name, email, address, phone, ext, cell, fax } = client;
    let db = await connectDB();
    let collection = db.collection(`clients`);
    if (id) {
      await collection.updateOne(
        { id },
        { $set: { name, email, address, phone, ext, cell, fax } }
      );
    }
  } catch (err) {
    console.log("error:".err.stack);
  }
};

export const deleteClient = async (id) => {
  try {
    let db = await connectDB();
    let collection = db.collection(`clients`);
    await collection.deleteOne({ id: id }, (err, clients) => {});
  } catch (err) {
    console.log("error:".err.stack);
  }
};

export const getClients = async () => {
  try {
    let db = await connectDB();
    let clients = await db.collection(`clients`).find().toArray();
    return {
      clients,
    };
  } catch (err) {
    console.log("error:".err.stack);
  }
};

export const updateUser = async (user) => {
  try {
    let { id, username, passwordHash } = user;
    let db = await connectDB();
    let collection = db.collection(`users`);
    if (id) {
      await collection.updateOne({ id }, { $set: { username, passwordHash } });
    }
  } catch (err) {
    console.log("error:".err.stack);
  }
};
