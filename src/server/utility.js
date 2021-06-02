import { connectDB } from "./connect";

export async function assembleUserState(user) {
  let db = await connectDB();

  var clients =
    user.id === "User1"
      ? await db
          .collection("clients")
          .aggregate([
            {
              $lookup: {
                from: "clientContactDetails",
                localField: "id",
                foreignField: "client",
                as: "clientContactDetails",
              },
            },
            {
              $lookup: {
                from: "clientContactDetailsSuggestions",
                localField: "id",
                foreignField: "client",
                as: "clientContactDetailsSuggestions",
              },
            },
            {
              $lookup: {
                from: "clientsDeleteRequest",
                localField: "id",
                foreignField: "client",
                as: "clientsDeleteRequest",
              },
            },
            {
              $sort: {
                name: 1,
              },
            },
            // {
            //   $unwind: "$clientcontactdetails",
            // },
            // {
            //   $lookup: {
            //     from: "personalnotes",
            //     localField: "id",
            //     foreignField: "client",
            //     as: "personalnotes",
            //   }
            // },
            // {
            //   $unwind: "$personalnotes",
            // },
            // {
            //   $lookup: {
            //     from: "myfavorites",
            //     localField: "id",
            //     foreignField: "client",
            //     as: "myfave",
            //   },
            // },
            // {
            //   $unwind: "$myfave",
            // },
            // {
            //   $project: {
            //     id: 1,
            //     name: 1,
            //     owner: 1,
            //     email: 1,
            //     clientContactDetails: "$clientContactDetails",
            //     // personalnotes: "$personalnotes",
            //     // myfave: "$myfave",
            //   },
            // },
          ])
          .toArray()
      : await db
          .collection("clients")
          .aggregate([
            {
              $match: {
                users: { $eq: user.firstName + " " + user.lastName },
              },
            },
            {
              $lookup: {
                from: "clientContactDetails",
                localField: "id",
                foreignField: "client",
                as: "clientContactDetails",
              },
            },
            {
              $lookup: {
                from: "clientContactDetailsSuggestions",
                localField: "id",
                foreignField: "client",
                as: "clientContactDetailsSuggestions",
              },
            },
            {
              $lookup: {
                from: "clientsDeleteRequest",
                localField: "id",
                foreignField: "client",
                as: "clientsDeleteRequest",
              },
            },
            {
              $sort: {
                name: 1,
              },
            },
            // {
            //   $unwind: "$clientContactDetails",
            // },
            // {
            //   $lookup: {
            //     from: "personalnotes",
            //     localField: "id",
            //     foreignField: "client",
            //     as: "personalnotes",
            //   },
            // },
            // {
            //   $unwind: "$personalnotes",
            // },
            // {
            //   $lookup: {
            //     from: "myfavorites",
            //     localField: "id",
            //     foreignField: "client",
            //     as: "myfave",
            //   },
            // },
            // {
            //   $unwind: "$myfave",
            // },
            // {
            //   $project: {
            //     id: 1,
            //     name: 1,
            //     owner: 1,
            //     email: 1,
            //     clientContactDetails: "$clientContactDetails",
            //     personalnotes: "$personalnotes",
            //     myfave: "$myfave",
            //   },
            // },
            // {
            //   $project: {
            //     id: 1,
            //     name: 1,
            //     owner: 1,
            //     email: 1,
            //     clientContactDetails: "$clientContactDetails",
            //     // personalnotes: "$personalnotes",
            //     // myfave: "$myfave",
            //   },
            // },
          ])
          .toArray();
  //.find({ id: { $ne: "User1" } })
  let users =
    user.id === "User1"
      ? await db
          .collection(`users`)
          .find()
          .project({
            id: 1,
            firstName: 1,
            lastName: 1,
            location: 1,
            otherLocation: 1,
            officePhoneNumber: 1,
            cellPhoneNumber: 1,
            email: 1,
            username: 1,
            dateCreated: 1,
          })
          .sort({ firstName: 1 })
          .toArray()
      : await db
          .collection(`users`)
          .find() //{ id: user.id }
          .project({ id: 1, firstName: 1, lastName: 1 })
          .sort({ firstName: 1 })
          .toArray();

  let myfavorites = await db
    .collection(`myfavorites`)
    .find({ owner: user.id })
    .toArray();

  let personalnotes =
    user.id === "User1"
      ? await db.collection(`personalnotes`).find().toArray()
      : await db.collection(`personalnotes`).find({ owner: user.id }).toArray();

  let clientContactDetailsSuggestions =
    user.id === "User1"
      ? await db.collection(`clientContactDetailsSuggestions`).find().toArray()
      : await db
          .collection(`clientContactDetailsSuggestions`)
          .find({ userid: user.id })
          .toArray();

  let locations = await db.collection(`locations`).find().toArray();

  let mymeetings =
    user.id === "User1"
      ? await db.collection(`mymeetings`).find().toArray()
      : await db.collection(`mymeetings`).find({ $or: [ { owner: user.id }, { attendees: { $elemMatch: { $eq: user.id } } } ] }).toArray();

  let clientSuggestions =
    user.id === "User1"
      ? await db
          .collection(`clients`)
          .aggregate([
            {
              $match: { isVerified: { $eq: false } },
            },
            {
              $lookup: {
                from: "clientContactDetails",
                localField: "id",
                foreignField: "client",
                as: "clientContactDetails",
              },
            },
          ])
          .toArray()
      : await db
          .collection(`clients`)
          .aggregate([
            {
              $match: {
                isVerified: { $eq: false },
                owner: { $eq: user.id },
              },
            },
            {
              $lookup: {
                from: "clientContactDetails",
                localField: "id",
                foreignField: "client",
                as: "clientContactDetails",
              },
            },
          ])
          .toArray();

  return {
    clients,
    users,
    myfavorites,
    personalnotes,
    locations,
    clientContactDetailsSuggestions,
    mymeetings,
    clientSuggestions,
    session: {
      authenticated: `AUTHENTICATED`,
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      officePhoneNumber: user.officePhoneNumber,
      cellPhoneNumber: user.cellPhoneNumber,
      email: user.email,
      username: user.username,
      isApproved: user.isApproved,
      dateCreated: user.dateCreated,
      dateApproved: user.dateApproved,
    },
  };
}
