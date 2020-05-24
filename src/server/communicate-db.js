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
    let { id, name, email, address, phone, ext, cell, fax, owner } = client;
    let db = await connectDB();
    let collection = db.collection(`clients`);
    if (id) {
      await collection.updateOne(
        { id },
        { $set: { name, email, address, phone, ext, cell, fax, owner } }
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
    let { id, name, username, passwordHash } = user;
    let db = await connectDB();
    let collection = db.collection(`users`);
    if (id) {
      await collection.updateOne(
        { id },
        { $set: { name, username, passwordHash } }
      );
    }
  } catch (err) {
    console.log("error:".err.stack);
  }
};

export const addMyFavorites = async (myfavorite) => {
  try {
    let db = await connectDB();
    let collection = db.collection(`myfavorites`);
    await collection.insertOne(myfavorite);
  } catch (err) {
    console.log("error:".err.stack);
  }
};

export const removeMyFavorites = async (id) => {
  try {
    let db = await connectDB();
    let collection = db.collection(`myfavorites`);
    await collection.deleteOne({ id: id });
  } catch (err) {
    console.log("error:".err.stack);
  }
};

export const addPersonalNotes = async (personalnote) => {
  try {
    let db = await connectDB();
    let collection = db.collection(`personalnotes`);
    await collection.insertOne(personalnote);
  } catch (err) {
    console.log("error:".err.stack);
  }
};

export const updatePersonalNotes = async (personalnote) => {
  try {
    let { id, note, datetimeupdated } = personalnote;
    let db = await connectDB();
    let collection = db.collection(`personalnotes`);
    if (id) {
      await collection.updateOne({ id }, { $set: { note, datetimeupdated } });
    }
  } catch (err) {
    console.log("error:".err.stack);
  }
};

export const deletePersonalNote = async (id) => {
  try {
    let db = await connectDB();
    let collection = db.collection(`personalnotes`);
    await collection.deleteOne({ id: id }, (err, personalnotes) => {});
  } catch (err) {
    console.log("error:".err.stack);
  }
};
