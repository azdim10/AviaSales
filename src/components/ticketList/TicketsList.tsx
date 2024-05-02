import React from "react";
import Notfound from '../NotFound/Notfound'
import { useAppSelector,useAppDispatch } from "../../hook";
import { showMoreTickets } from "../../store/ticketsSlice";
import { Ticket } from "../../store/types";
import TicketItem from "../ticketitem/TicketItem";
import './ticketlist.css';

const TicketList: React.FC = () => {
  
  const { tickets, showTickets, all, nonStop, oneStop, twoStop, threeStop } = useAppSelector((state) => state.tickets)
  const dispatch = useAppDispatch()
  const getCheckAllOff = !all && !nonStop && !oneStop && !twoStop && !threeStop
  const getFilterTicket = (
    tickets: Ticket[],
    all: boolean,
    nonStop: boolean,
    oneStop: boolean,
    twoStop: boolean,
    threeStop: boolean
  ) => {
    return tickets.filter((ticket) => {
      if (all) return true;
      if (nonStop && ticket.segments[0].stops.length === 0 && ticket.segments[1].stops.length === 0) return true;
      if (oneStop && ticket.segments[0].stops.length === 1 && ticket.segments[1].stops.length === 1) return true;
      if (twoStop && ticket.segments[0].stops.length === 2 && ticket.segments[1].stops.length === 2) return true;
      if (threeStop && ticket.segments[0].stops.length === 3 && ticket.segments[1].stops.length === 3) return true;
      return false;
    })
  }
  const filteredTickets = getFilterTicket(tickets, all, nonStop, oneStop, twoStop, threeStop);
  return (
    <>
      {getCheckAllOff ? (
        <Notfound/>
      ): (
        filteredTickets.slice(0, showTickets)
        .map((ticket,index) => {
          return (
            <TicketItem 
              key ={ index}
              ticket = { ticket}
            />
          )
        })
      )}
      {filteredTickets.length >= 5 && (
        <button className="show-more" type="button" onClick={() => dispatch(showMoreTickets())}>
          Показать еще 5 билетов!
        </button>
      )}
    </>
  );
};

export default TicketList;