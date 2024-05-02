import {getSelectedRadioBtn} from '../../store/ticketsSlice'
import { useAppDispatch } from "../../hook";
import './ticketfilter.css'
const Ticketfilter: React.FC = () => {
    const dispatch = useAppDispatch()
    return (
        <div className = 'ticket_filter'>
        <button className = 'ticket_filter-btn filter-left' value = 'radio1' onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
    const buttonValue = event.currentTarget.value;
    dispatch(getSelectedRadioBtn(buttonValue));
  }}>Самый дешевый</button>
        <button className = 'ticket_filter-btn' value = 'radio2' onClick = {(event: React.MouseEvent<HTMLButtonElement>) => {
    const buttonValue = event.currentTarget.value;
    dispatch(getSelectedRadioBtn(buttonValue));
  }}>Самый быстрый</button>
        <button className = 'ticket_filter-btn filter-right' value = 'radio3' onClick = {(event: React.MouseEvent<HTMLButtonElement>) => {
    const buttonValue = event.currentTarget.value;
    dispatch(getSelectedRadioBtn(buttonValue));
  }}>Оптимальный</button>
        </div>
    )
}
export default Ticketfilter