import { authenticationRoute } from "./authenticate";
import { connectDB } from "./connect";
import md5 from "md5";

(async function myFunc() {
  //   let db = await connectDB();
  //   let collection = db.collection(`users`);
  //   const password = "ADMIN";
  //   let passwordHash = md5(password);
  //   await collection.updateOne(
  //     { id: "User1" },
  //     {
  //       $set: {
  //         name: "Peter Madale",
  //         username: "Admin",
  //         passwordHash: passwordHash,
  //       },
  //     }
  //   );
})();
