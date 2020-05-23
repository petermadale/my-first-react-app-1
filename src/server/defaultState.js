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
      isFavorite: false,
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
      isFavorite: false,
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
      isFavorite: false,
    },
  ],
  myfavorites: [
    {
      id: "F1",
      client: "C3",
      owner: "User1",
    },
    {
      id: "F2",
      client: "C2",
      owner: "User2",
    },
  ],
};
