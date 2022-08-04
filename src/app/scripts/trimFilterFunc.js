export const trimFilterFunc = (locations, value) => {
  const trimLocs = locations.map((loc) => loc.trim());
  const filterLocs = trimLocs.includes(value);

  return filterLocs;
};
