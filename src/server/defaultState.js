import md5 from "md5";
export const defaultState = {
  //   session: {
  //     authenticated: true,
  //   },
  users: [
    {
      id: "User1",
      name: "Admin",
      passwordHash: md5("ADMIN"),
    },
    {
      id: "User2",
      name: "User",
      passwordHash: md5("PASSWORD"),
    },
  ],
  clients: [
    {
      id: "C1",
      name: "Fred Smith",
      address: "233 Some St, Suite 201, Nice City, TX 7777",
      phone: "713-654-777-444",
      ext: "123",
      cell: "897-958-888-979",
      email: "me@mydomain.com",
      fax: "569-5464-999",
      owner: "User1",
    },

    {
      id: "C2",
      name: "John Doe",
      address: "564 Some St, Suite 201, Nice City, TX 7777",
      phone: "473-654-777-444",
      ext: "836",
      cell: "989-958-888-979",
      email: "me@mydomain.com",
      fax: "987-5464-999",
      owner: "User1",
    },

    {
      id: "C3",
      name: "David Copperfield",
      address: "890 Some St, Suite 201, Nice City, TX 7777",
      phone: "565-654-777-444",
      ext: "332",
      cell: "765-958-888-979",
      email: "me@mydomain.com",
      fax: "796-5464-999",
      owner: "User1",
    },
  ],
  home_owners: [
    {
      id: "H1",
      user_type: "User2",
      name: "Peter Madales",
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
      name: "Magnolia",
      features:
        "2 Storey 3 Bedrooms 2 Toilets & Bath Carport Lot Area: 64 sq. m (689 sq. ft.)",
      lot_area: "64 sq. m(689 sq. ft.)",
      floor_area: "84.56 sq. m(910 sq. ft.)",
    },
    {
      id: "UT2",
      name: "Champaca",
      features:
        "2 Storey 4 Bedrooms 3 Toilets & Bath Fitted Kitchen Maid's Quarter w T&B Carport",
      lot_area: "146-282+ sq. m",
      floor_area: "159.88 sq. m",
    },
    {
      id: "UT3",
      name: "Orchidia",
      features:
        "2 Storey 4 Bedrooms 3 1/2 Toilets & Bath Secondary Kitchen Carport Fitted Kitchen Lot Area: 148-173+ sq. m",
      lot_area: "148-173+ sq. m",
      floor_area: "154-168+ sq. m",
    },
  ],
};
