export const compare = function (a, b) {
  const nameA = a.name && a.name.toUpperCase();
  const nameB = b.name && b.name.toUpperCase();

  let comparison = 0;
  if (nameA == 'OTHERS') return 1;
  if (nameA > nameB) {
    comparison = 1;
  } else if (nameA < nameB) {
    comparison = -1;
  }
  return comparison;
};
