import React from 'react';
import { useAppDispatch } from '../../hook';
import { fetchTickets, Ticket }  from '../../store/ticketsSlice';
import { addMinutes, format } from 'date-fns'
import './ticketitem.css'
interface TicketItemProps {
  ticket: Ticket;
}
const TicketItem: React.FC<TicketItemProps> = ({ ticket}) => {
  const dispatch = useAppDispatch();
  return (
    <li className = 'ticket_item'>
    <span className = 'ticket_price'>{ticket.price} Р</span>
    <img className = 'ticket_logo' src = {`//pics.avs.io/99/36/${ticket.carrier}.png`} alt = {'Logo'} />

    {ticket.segments.map((segment, index) => {
      const departureDate = new Date(segment.date);
      const durationFly = segment.duration;
      const arrivalTime = addMinutes(departureDate, durationFly);
      const departureTimeFormatted = format(departureDate, 'HH:mm');
      const arrivalTimeFormatted = format(arrivalTime, 'HH:mm');
      const flightDurationHours = Math.floor(durationFly / 60);
      const flightDurationMinutes = durationFly % 60;
      const flightDurationFormatted = `${flightDurationHours.toString().padStart(2, '0')}ч ${flightDurationMinutes.toString().padStart(2, '0')}м`;
      const stopsCount = segment.stops.length;
      const stopsText = stopsCount === 1 ? 'пересадка' : 'пересадки' ;
      return (
        <React.Fragment key={index}>
          <tr>
          <th className = 'ticket_upper'>{segment.origin} - {segment.destination}</th>
          <th className = 'ticket_upper'>В пути</th>
          {stopsCount > 0  && (<th className = 'ticket_upper'>{stopsCount} {stopsText}</th>)}
          </tr>
          <tr>
          <th className = 'ticket_foot'>{departureTimeFormatted} - {arrivalTimeFormatted}</th>
          <th className = 'ticket_foot'>{flightDurationFormatted}</th>
          <th className = 'ticket_foot'>{segment.stops.join(', ')}</th>
          </tr>
        </React.Fragment>
      );
    })}
  </li>
  );
};

export default TicketItem;