import { gql } from "@apollo/client";


export const GET_ALL_SEATS = gql`
    query {
        getAllSeats{
            seats
        }
    }
`