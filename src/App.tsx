import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hook";
import Preloader from './components/Preloader/Preloader';
import { fetchTickets } from "./store/ticketsSlice";
import Ticketbox from './components/ticketBox/Ticketbox';
import TicketList from "./components/ticketList/TicketsList";
import Ticketfilter from './components/ticketFilter/Ticketfilter';
import "./App.css";

function App() {
  const { loading, error } = useAppSelector((state) => state.tickets);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);
  return (
    <div className="App">
      <img src={process.env.PUBLIC_URL + '/Logo.svg'} alt="Logo" className="App-logo"></img>
      <Ticketbox />
      <div className = 'App-results'>
      <Ticketfilter />
      {loading && <Preloader />}
      {error && <h2>Server Error : {error}</h2>}
      <TicketList />
      </div>
    </div>
  );
}

export default App;
