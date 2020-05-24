import { connectDB } from "./connect";

export async function assembleUserState(user) {
  let db = await connectDB();

  let clients =
    user.id === "User1"
      ? await db.collection(`clients`).find().toArray()
      : await db.collection(`clients`).find({ owner: user.id }).toArray();
  let users =
    user.id === "User1"
      ? await db
          .collection(`users`)
          .find({})
          .project({ id: 1, name: 1 })
          .toArray()
      : await db
          .collection(`users`)
          .find({ id: user.id })
          .project({ id: 1, name: 1 })
          .toArray();
  let myfavorites = await db
    .collection(`myfavorites`)
    .find({ owner: user.id })
    .toArray();

  let personalnotes =
    user.id === "User1"
      ? await db.collection(`personalnotes`).find().toArray()
      : await db.collection(`personalnotes`).find({ owner: user.id }).toArray();
  return {
    clients,
    users,
    myfavorites,
    personalnotes,
    session: {
      authenticated: `AUTHENTICATED`,
      id: user.id,
      name: user.name,
      username: user.username,
      isApproved: user.isApproved,
      dateCreated: user.dateCreated,
      dateApproved: user.dateApproved,
    },
  };
}
