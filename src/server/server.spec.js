import {
  addNewUnitTypes,
  updateUnitTypes,
  getClients,
  deleteClient,
} from "./server";

(async function myFunc() {
  //   await addNewUnitTypes({
  //     id: "6",
  //     name: "Mansion",
  //   });

  //   await updateUnitTypes({
  //     id: "6",
  //     name: "Balay",
  //   });
  await deleteClient({ id: "C2" });
})();
