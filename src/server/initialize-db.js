import { defaultState } from "./defaultState";
//import { connectDB } from "./connect-db";
import { connectDB } from "./connect";

async function initializeDB() {
  let db = await connectDB();
  try {
    let user = await db.collection(`users`).findOne({ id: "User1" });
    if (!user) {
      for (let collectionName in defaultState) {
        let collection = db.collection(collectionName);
        await collection.insertMany(defaultState[collectionName]);
      }
    }
  } catch (err) {
    console.log(err.stack);
  }
}

initializeDB();
