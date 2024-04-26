import { useAppSelector } from '../../hook';
import TicketItem from '../ticketitem/TicketItem'
import React from 'react';
import { Ticket } from '../../store/ticketsSlice'

const TicketList: React.FC = () => {
  const tickets = useAppSelector((state) => state.tickets.list)
  return (
    <ul>
      {tickets.map((ticket: Ticket) => <TicketItem key ={ ticket.price} ticket= {ticket} />)}
    </ul>
  );
};

export default TicketList;