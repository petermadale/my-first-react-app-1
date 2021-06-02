import uuid from "uuid";
import md5 from "md5";
// import { connectDB } from "./connect-db";
import { connectDB } from "./connect";
import { assembleUserState } from "./utility";

const authenticationTokens = [];

export const authenticationRoute = (app) => {
  app.post("/authenticate", async (req, res) => {
    let { username, password } = req.body;
    try {
      let db = await connectDB();
      let collection = db.collection(`users`);
      let user = await collection.findOne({ username });

      if (!user) {
        return res.status(500).send({ message: "User not found." });
      }
      if (user && !user.isApproved) {
        return res.status(500).send({
          message:
            "Account not yet approved by Admin.  Please try again later.",
          isApproved: false,
        });
      }

      let hash = md5(password);
      let passwordCorrect = hash === user.passwordHash;

      if (user && !passwordCorrect) {
        return res
          .status(500)
          .send({ message: "Password incorrect", passwordCorrect: false });
      }

      let token = uuid();

      authenticationTokens.push({
        token,
        userID: user.id,
      });

      let state = await assembleUserState(user);

      res.send({ token, state });
    } catch (err) {
      console.log(err.stack);
    }
  });

  app.post("/user/create", async (req, res) => {
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
      password,
    } = req.body.user;
    let db = await connectDB();
    let collection = db.collection(`users`);
    let users_fullname = await collection.findOne({
      firstName,
      lastName,
    });
    let users_username = await collection.findOne({ username });
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

    // let userID = uuid();
    let dateToday = new Date();
    let dateCreated = dateToday.toLocaleString();
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
      passwordHash: md5(password),
      isApproved: true,
      dateCreated,
      //dateAprroved: null,
    };
    await collection.insertOne(userdata);

    // let state = await assembleUserState({
    //   id: userID,
    //   name: name,
    //   username: username,
    // });

    res.status(200).send({ user: userdata });
  });
};
