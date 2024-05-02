export interface Segment {
  origin: string;
  destination?: string; 
  date: string;
  stops: string[];
  duration: number;
}

export interface Ticket {
  id: string;
  transfers: number
  price: number;
  carrier: string;
  segments: Segment[];
}

export type TicketState = {
  tickets: Ticket[],
  loading: boolean;
  error: string | null;
  showTickets: number;
  isActiveButtonFilter: string | null;
  all:boolean;
  nonStop: boolean;
  oneStop: boolean;
  twoStop: boolean;
  threeStop: boolean;
};
