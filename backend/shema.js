const { buildSchema } = require("graphql");

const schema = buildSchema(`
    type User {
        id: ID
        username: String
        age: Int
        posts: [Post]
    }

    type Post {
        id: ID
        title: String
        content: String
    }


    type Holder {
        username: String
        age: Int
    }

    input UserInput {
        id:ID
        username: String!
        age: Int!
        posts: [PostInput]
    }

    input PostInput {
        id: ID
        title: String!
        content: String!
    }


    type Seats {
        seats: [Int] 
    }

    input SeatsArr {
        seats: [Int!]
    }

    input HolderInput {
        username: String
        age: Int
    }

    input OrderInput {
        holders: [HolderInput]
        seats: [Int]
    }
    
 

    type Order {
        holders: [Holder]
        seats: [Int]
    }

    type Query {
        getAllUsers: [User] 
        getUser(id: ID): User


        
        getAllSeats: Seats
    }

    type Mutation {
        createUser(input: UserInput): User


        reservePlaces(input: SeatsArr): Seats

        createOrder(input:OrderInput): Order
    }

`);

// type Query - тип запроса
//getAllUsers - возвращает массив, каждый элемент будет type User
//getUser - один пользователь, выз-ся с параметром Id

module.exports = schema;
