import { connectDB } from "./connect";
import md5 from "md5";
import uuid from "uuid";

export const addClient = async (client) => {
  try {
    let db = await connectDB();
    let collection = db.collection(`clients`);
    // let { owner } = client;
    // let collection =
    //   owner === "User1"
    //     ? db.collection(`clients`)
    //     : db.collection(`clientsSuggestion`);
    await collection.insertOne(client);
  } catch (err) {
    console.log("error:".err.stack);
  }
};

export const updateClient = async (client) => {
  try {
    let {
      id,
      name,
      email,
      website,
      postNominalLetters,
      nameOfOrg,
      titleWithOrg,
      licenseNumber,
      licenseExpiryDate,
      licenseLastVerifiedDate,
      typeOfOrg,
      populationsServed,
      typesOfServices,
      specialties,
      groupsOffered,
      insuranceAccepted,
      serviceDeliveryMethod,
      assignedLocations,
      users,
      notes,
      isVerified,
      lastUpdatedBy,
      lastUpdatedDate,
    } = client;
    let db = await connectDB();
    let collection = db.collection(`clients`);
    if (id) {
      await collection.updateOne(
        { id },
        {
          $set: {
            name,
            email,
            website,
            postNominalLetters,
            nameOfOrg,
            titleWithOrg,
            licenseNumber,
            licenseExpiryDate,
            licenseLastVerifiedDate,
            typeOfOrg,
            populationsServed,
            typesOfServices,
            specialties,
            groupsOffered,
            insuranceAccepted,
            serviceDeliveryMethod,
            assignedLocations,
            users,
            notes,
            isVerified,
            lastUpdatedBy,
            lastUpdatedDate,
          },
        }
      );
    }
  } catch (err) {
    console.log("error:".err.stack);
  }
};

export const verifyClient = async (id) => {
  try {
    let db = await connectDB();
    let collection = db.collection(`clients`);
    if (id) {
      await collection.updateOne(
        { id },
        {
          $set: {
            isVerified: true,
          },
        }
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

    let clientContactCollection = db.collection(`clientContactDetails`);
    await clientContactCollection.deleteOne(
      { client: id },
      (err, clients) => {}
    );

    let clientsDeleteRequest = db.collection(`clientsDeleteRequest`);
    await clientsDeleteRequest.deleteOne({ client: id }, (err, clients) => {});
  } catch (err) {
    console.log("error:".err.stack);
  }
};

export const deleteClientRequest = async (data) => {
  try {
    let db = await connectDB();

    let collection = db.collection(`clientsDeleteRequest`);
    await collection.insertOne(data);
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

export const suggestEditsClientContactDetails = async (clientContact) => {
  try {
    let db = await connectDB();
    let collection = db.collection(`clientContactDetailsSuggestions`);
    await collection.insertOne(clientContact);
  } catch (err) {
    console.log("error:".err.stack);
  }
};

export const approveClientContactDetailsSuggestion = async (
  clientContactDetailsSuggestions
) => {
  try {
    let db = await connectDB();
    let collection_contact_details = db.collection(`clientContactDetails`);
    let collection_contact_suggestion = db.collection(
      `clientContactDetailsSuggestions`
    );
    //let newID = uuid();
    let new_clientContactDetailsSuggestions = {
      ...clientContactDetailsSuggestions,
      id: clientContactDetailsSuggestions.newID,
    };
    await collection_contact_details.insertOne(
      new_clientContactDetailsSuggestions
    );
    await collection_contact_suggestion.deleteOne({
      id: clientContactDetailsSuggestions.id,
    });
  } catch (err) {
    console.error("error:", err.stack);
  }
};

export const rejectClientContactDetailSuggestion = async (id) => {
  try {
    let db = await connectDB();
    let collection = db.collection(`clientContactDetailsSuggestions`);
    await collection.deleteOne({ id: id }, (err, clients) => {});
  } catch (err) {
    console.log("error:".err.stack);
  }
};

export const addClientContactDetails = async (clientContact) => {
  try {
    let db = await connectDB();
    let clientCollection = db.collection(`clients`);
    let client = await clientCollection.findOne({
      id: clientContact.client,
    });
    if (client) {
      let collection = db.collection(`clientContactDetails`);
      await collection.insertOne(clientContact);
    }
  } catch (err) {
    console.log("error:".err.stack);
  }
};

export const upateClientContactDetails = async (clientContact) => {
  try {
    let {
      id,
      client,
      address1,
      address2,
      workEmail,
      alternateEmail,
      city,
      state,
      zip,
      officePhoneNumber,
      officePhoneNumberExt,
      cellPhoneNumber,
      alternativePhoneNumber,
      faxNumber,
    } = clientContact;
    let db = await connectDB();
    let collection = db.collection(`clientContactDetails`);
    if (id) {
      await collection.updateOne(
        { id },
        {
          $set: {
            address1,
            address2,
            workEmail,
            alternateEmail,
            city,
            state,
            zip,
            officePhoneNumber,
            officePhoneNumberExt,
            cellPhoneNumber,
            alternativePhoneNumber,
            faxNumber,
          },
        }
      );
    }
  } catch (err) {
    console.log("error:", err.stack);
  }
};

export const deleteClientContactDetails = async (id) => {
  try {
    let db = await connectDB();
    let collection = db.collection(`clientContactDetails`);
    await collection.deleteOne({ id: id }, (err, clients) => {});
  } catch (err) {
    console.log("error:".err.stack);
  }
};

export const updateUser = async (user) => {
  let {
    id,
    firstName,
    lastName,
    location,
    officePhoneNumber,
    cellPhoneNumber,
    email,
    username,
    // password,
  } = user;
  try {
    let db = await connectDB();
    let collection = db.collection(`users`).find({ id: { $ne: id } });
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
    if (id) {
      //   const passwordHash = md5(password);
      let dateToday = new Date();
      let lastDateUpdated = dateToday.toLocaleString();
      await collection.updateOne(
        { id },
        {
          $set: {
            firstName,
            lastName,
            location,
            officePhoneNumber,
            cellPhoneNumber,
            email,
            username,
            lastDateUpdated,
            // passwordHash,
          },
        }
      );
    }
  } catch (err) {
    console.log("error:".err);
  }
};

export const deleteUser = async (id) => {
  try {
    let db = await connectDB();
    let collection = db.collection(`users`);
    await collection.deleteOne({ id: id }, (err, users) => {});
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
    personalnote.isVerified = false;
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

export const verifyPersonalNote = async (notedata) => {
  try {
    console.log(notedata);
    let { id, isVerified } = notedata;
    let db = await connectDB();
    let collection = db.collection(`personalnotes`);
    if (id) {
      await collection.updateOne({ id }, { $set: { isVerified } });
    }
  } catch (err) {
    console.log("error");
  }
};

export const saveMeeting = async (data) => {
  try {
    let db = await connectDB();
    let collection = db.collection(`mymeetings`);
    await collection.insertOne(data);
  } catch (err) {
    console.log("error:".err.stack);
  }
};

export const editMeeting = async (meetingdata) => {
  try {
    let {
      id,
      attendees,
      attendeesMore,
      location,
      otherLocation,
      dateOfMeeting,
      timeOfMeeting,
      preMeetingNotes,
      duringAfterMeetingNotes,
      isVerified,
      dateModified,
    } = meetingdata;
    let db = await connectDB();
    let collection = db.collection(`mymeetings`);
    if (id) {
      await collection.updateOne(
        { id },
        {
          $set: {
            attendees,
            attendeesMore,
            location,
            otherLocation,
            dateOfMeeting,
            timeOfMeeting,
            preMeetingNotes,
            duringAfterMeetingNotes,
            isVerified,
            dateModified,
          },
        }
      );
    }
  } catch (err) {
    console.log("error:".err.stack);
  }
};

export const deleteMeeting = async (id) => {
  try {
    let db = await connectDB();
    let collection = db.collection(`mymeetings`);
    await collection.deleteOne({ id: id }, (err, mymeetings) => {});
  } catch (err) {
    console.log("error:".err.stack);
  }
};

export const verifyMeeting = async (meetingdata) => {
  try {
    let { id, dateVerified } = meetingdata;
    let db = await connectDB();
    let collection = db.collection(`mymeetings`);
    if (id) {
      await collection.updateOne(
        { id },
        {
          $set: {
            isVerified: true,
            dateVerified,
          },
        }
      );
    }
  } catch (err) {
    console.log("error:".err.stack);
  }
};

export const requestRejectCancelDeleteClientRequest = async (id) => {
  try {
    let db = await connectDB();
    let collection = db.collection(`clientsDeleteRequest`);
    await collection.deleteOne({ id: id }, (err, clients) => {});
  } catch (err) {
    console.log("error:".err.stack);
  }
};
