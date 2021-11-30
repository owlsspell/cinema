import { makeVar } from "@apollo/client";

type ReservedSitsByUser = {
    seats : number[]
}

export type TicketHolder = {
    username:string,
    age:string |number
}

export const reservedSits = makeVar <ReservedSitsByUser>({ seats: [] });

export const reservedSitsByUser = makeVar<ReservedSitsByUser>({ seats: [] });

export const ticketHolder = makeVar<TicketHolder[]>([]);
