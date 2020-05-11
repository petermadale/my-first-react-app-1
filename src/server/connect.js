const { MongoClient } = require("mongodb");

// Replace the following with your Atlas connection string
const url =
  "mongodb+srv://petermadale84:3QkV4B61KOqHV9t2@crmappcluster0-p4wge.gcp.mongodb.net/test?retryWrites=true&w=majority";
//const client = new MongoClient(url, { useNewUrlParser: true });

let db = null;
export async function connectDB() {
  if (db) return db;
  try {
    let client = await MongoClient.connect(url, { useNewUrlParser: true });
    db = client.db();
    return db;
    // await client.connect();
    // console.log("Connected correctly to server");
    // db = client.db();
    // return db;
  } catch (err) {
    console.log(err.stack);
  }
  // finally {
  //     await client.close();
  //   }
}

//run().catch(console.dir);
