const Cinema = require("./models/Cinema");
const User = require("./models/User");
let mainHall = {seats:[24,1,3]}
const root = {
  getAllUsers: () => User.find({}),
  getUser: ({ id }) => User.findById(id),
  createUser: async ({ input }) => {
    // let user = createUser(input);
    console.log("input");
    console.log(input);
    const user = new User(input);
    await user.save(function (err) {
      if (err) return console.log(err);

      console.log("Сохранен объект", user);
    });
    return user;
  },

  //cinema Seats
  getAllSeats: () => mainHall,
  reservePlaces: async ({input})=> {
    let seat ={...input}
    console.log(seat.seats);
    // console.log(input);
    // let seats = mainHall.seats
    // const seats = new Cinema(seat.seats);
    mainHall.seats = mainHall.seats.concat(seat.seats)
    console.log('mainHall');
    console.log(mainHall);
    return mainHall
  }
 
};

module.exports = root;
