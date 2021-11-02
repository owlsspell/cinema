import { gql } from "@apollo/client";

//параметры со знаком $
export const RESERVE_PLACES = gql`
    mutation reservePlaces($input: SeatsArr){
        reservePlaces(input:$input){
            seats
        }
    }
`