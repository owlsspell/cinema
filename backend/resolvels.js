
const User = require("./models/User");

const root = {
    getAllUsers: () => User.find({}),
    getUser: ({ id }) => User.findById(id),
    createUser: async ({ input }) => {
      // let user = createUser(input);
      console.log("input");
      console.log(input )
      const user = new User(input);
      await user.save(function (err) {
        if (err) return console.log(err);
  
        console.log("Сохранен объект", user);
      });
      return user;
    },
  };

module.exports = root