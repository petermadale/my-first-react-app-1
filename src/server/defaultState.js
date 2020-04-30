// import md5 from 'md5';
export const defaultState = {
  users: [
    {
      id: "User1",
      name: "Admin",
      //passwordHash: md5("TUPLES"),
      friends: [`U2`],
    },
    {
      id: "User2",
      name: "User",
      //passwordHash: md5("PROFITING"),
      friends: [],
    },
  ],
  home_owners: [
    {
      id: "H1",
      user_type: "User2",
      name: "Peter Madale",
    },
    {
      id: "H2",
      user_type: "User2",
      name: "Kendall Amaranthe",
    },
    {
      id: "H3",
      user_type: "User2",
      name: "Ivy Madale",
    },
  ],
  units: [
    {
      id: "U1",
      area: "100",
      block: "22",
      description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
      lot: "9",
      home_owner: "H1",
      unit_type: "UT1",
    },
    {
      id: "U2",
      area: "150",
      block: "1",
      description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
      lot: "1",
      home_owner: "H2",
      unit_type: "UT2",
    },
    {
      id: "U3",
      area: "200",
      block: "10",
      description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
      lot: "3",
      home_owner: "H3",
      unit_type: "UT3",
    },
  ],
  unit_types: [
    {
      id: "UT1",
      description: "Magnolia",
    },
    {
      id: "UT2",
      description: "Champaca",
    },
    {
      id: "UT3",
      description: "Orchidia",
    },
  ],
};
