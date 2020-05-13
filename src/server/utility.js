import { connectDB } from "./connect";

export async function assembleUserState(user) {
  let db = await connectDB();

  let clients = await db
    .collection(`clients`)
    .find({ owner: user.id })
    .toArray();

  return {
    clients,
    session: { authenticated: `AUTHENTICATED`, id: user.id, name: user.name },
  };
}
