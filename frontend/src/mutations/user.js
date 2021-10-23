import { gql } from "@apollo/client";

//параметры со знаком $
export const CREATE_USER = gql`
    mutation createUser($input: UserInput){
        createUser(input:$input){
            id, username, age
        }
    }
`