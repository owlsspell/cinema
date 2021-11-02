import { makeVar } from '@apollo/client';

export const reservedSits = makeVar([23]);
// export const mainHall = makeVar({seats:reservedSits()});

export const ticketHolder = makeVar([]);

