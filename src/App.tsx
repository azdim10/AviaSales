import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hook';

import { fetchTickets } from './store/ticketsSlice';
import TicketList from './components/ticketList/TicketsList';

import './App.css';


function App() {
  const [text, setText] = useState('')
  const { loading, error } = useAppSelector(state => state.tickets);;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  return (
    <div className='App'>
      {loading && <h2>Loading...</h2>}
      {error && <h2>An error occured: {error}</h2>}
      <TicketList />
    </div>
  );
}

export default App;