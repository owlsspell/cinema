import { makeVar } from '@apollo/client';

export const reservedSits = makeVar({seats:[]});
export const reservedSitsByUser = makeVar({seats:[]});

export const ticketHolder = makeVar([]);

