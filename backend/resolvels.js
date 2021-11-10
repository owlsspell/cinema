const Cinema = require("./models/Cinema");
const TicketHolder = require("./models/TicketHolder");
const moment = require("moment");

// let mainHall = { seats: [24, 1, 3] };
const root = {
  getAllUsers: () => TicketHolder.find({}),
  getUser: ({ id }) => TicketHolder.findById(id),
  createUser: async ({ input }) => {
    // let user = createUser(input);
    console.log("input");
    console.log(input);
    const user = new TicketHolder(input);
    await user.save(function (err) {
      if (err) return console.log(err);

      console.log("Сохранен объект", user);
    });
    return user;
  },

  //cinema Seats
  getAllSeats: async () => {
    let hall = await Cinema.find({ date: moment().format("L") });
    // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',hall);

    console.log("hall", hall[0].mainHall);
    // if (hall===[]) {
    //   return {seats: [] };
    // }
    return { seats: hall[0].mainHall };
  },
  reservePlaces: async ({ input }) => {
    let seat = { ...input };
    console.log(seat.seats);
    // console.log(input);
    // let seats = mainHall.seats
    // const seats = new Cinema(seat.seats);
    mainHall.seats = mainHall.seats.concat(seat.seats);
    console.log("mainHall");
    console.log(mainHall);
    return mainHall;
  },

  createOrder: async ({ input }) => {
    console.log("!!!!!!!!!!!orderInfo: ", input);

    const doesDateExit = await Cinema.exists({ date: moment().format("L") });
    console.log("doesDateExit", doesDateExit);
    console.log("date", moment().format("L"));
    if (doesDateExit) {
      await Cinema.updateOne(
        { date: moment().format("L") },
        { $push: { mainHall: input.seats } }
      );
    } else {
      const order = new Cinema({
        date: moment().format("L"),
        mainHall: input.seats,
      });

      await order.save(function (err) {
        if (err) return console.log(err);

        console.log("Сохранен объект", order);
      });
    }

    const holder = new TicketHolder({
      users: input.holders,
      age: input.age,
      seats: input.seats,
    });
    await holder.save(function (err) {
      if (err) return console.log(err);

      console.log("Сохранен объект", holder);
    });
    return holder;
  },
};

module.exports = root;
