const express = require("express");
const port = 5005;
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const app = express();
const schema = require("./shema");
const mongoose = require("mongoose");
const root = require("./resolvels");

require("dotenv").config();

// const users = [{ id: 1, username: "Vasiliy", age: 30 }];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// const createUser = (input) => {
//   const id = Date.now();
//   return { id, ...input };
// };

app.use(
  "/graphql",
  graphqlHTTP({
    // включаем графический интерфейс
    graphiql: true,
    schema,
    rootValue: root,
  })
);

async function main() {
  await mongoose.connect("mongodb://mongoose_db:27017/database", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

main()
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", err));

app.listen(port, () => {
  console.log("Listen " + port + "...");
});
