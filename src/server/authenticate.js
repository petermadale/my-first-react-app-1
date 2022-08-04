import uuid from "uuid";
import md5 from "md5";
import { connectDB } from "./connect";
import { assembleUserState } from "./utility";

const authenticationTokens = [];
const err_msg = {
  not_found: "User not found.",
  not_approved: "Account not yet approved by Admin.  Please try again later.",
  password_incorrect: "Password incorrect",
  name_exists:
    "A user with that account first name and last name already exists.",
  username_exists: "A user with that username already exists.",
};

export const authenticationRoute = (app) => {
  app.post("/authenticate", async (req, res) => {
    let { username, password } = req.body;
    try {
      let db = await connectDB();
      let collection = db.collection(`users`);
      let user = await collection.findOne({ username });

      if (!user) {
        return res.status(500).send({ message: err_msg.not_found });
      }
      if (user && !user.isApproved) {
        return res.status(500).send({
          message: err_msg.not_approved,
          isApproved: false,
        });
      }

      let hash = md5(password);
      let passwordCorrect = hash === user.passwordHash;

      if (user && !passwordCorrect) {
        return res.status(500).send({
          message: err_msg.password_incorrect,
          passwordCorrect: false,
        });
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
        message: err_msg.name_exists,
        nameReserved: true,
      });
      return;
    }
    if (users_username) {
      res.status(500).send({
        message: err_msg.username_exists,
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

    res.status(200).send({ user: userdata });
  });
};
