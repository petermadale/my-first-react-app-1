import uuid from "uuid";
import md5 from "md5";
//import { connectDB } from "./connect-db";
import { connectDB } from "./connect";

const authenticationTokens = [];

async function assembleUserState(user) {
  let db = await connectDB();

  //   let home_owners = await db
  //     .collection(`home_owners`)
  //     .find({ user_type: user.id })
  //     .toArray();

  let clients = await db.collection(`clients`).find().toArray();

  return {
    //home_owners,
    clients,
    session: { authenticated: `AUTHENTICATED`, id: user.id, name: user.name },
  };
}

export const authenticationRoute = (app) => {
  app.post("/authenticate", async (req, res) => {
    let { username, password } = req.body;
    let db = await connectDB();

    let collection = db.collection(`users`);
    let user = await collection.findOne({ name: username });

    if (!user) {
      return res.status(500).send("User not found");
    }

    let hash = md5(password);
    let passwordCorrect = hash === user.passwordHash;

    if (!passwordCorrect) {
      return res.status(500).send("Password incorrect");
    }

    let token = uuid();

    authenticationTokens.push({
      token,
      userID: user.id,
    });

    let state = await assembleUserState(user);

    res.send({ token, state });
  });
};
