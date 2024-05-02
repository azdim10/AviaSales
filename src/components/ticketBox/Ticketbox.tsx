import { useAppDispatch, useAppSelector } from '../../hook'
import {allChecked, nonStopChecked, oneStopChecked, twoStopChecked, threeStopChecked } from '../../store/ticketsSlice'
import './ticketbox.css'
const Ticketbox= () => {
      const dispatch = useAppDispatch();
      const { all, nonStop, oneStop, twoStop, threeStop } = useAppSelector((state) => state.tickets)
    
    return (
        <div className = 'ticket-box'>
        <span className = 'ticket-box_title'>Количество Пересадок</span>
        <label className='ticket_checkbox'>
        <input className = 'real-checkbox' type="checkbox" name = 'all' checked = {all}  onChange={() => dispatch(allChecked(!all))}></input>
        <span className = 'custom-checkbox' ></span>
        Все
        </label>
        <label className='ticket_checkbox'>
        <input className = 'real-checkbox' type="checkbox" name ='none' checked = {nonStop}  onChange={() => dispatch(nonStopChecked(!nonStop))} ></input>
        <span className = 'custom-checkbox'></span>
        Без пересадок
        </label>
        <label className='ticket_checkbox'>
        <input className = 'real-checkbox' type="checkbox" name = '1' checked = {oneStop}  onChange={() => dispatch(oneStopChecked(!oneStop))}></input>
        <span className = 'custom-checkbox'></span>
        1 пересадка
        </label>
        <label className='ticket_checkbox'>
        <input className = 'real-checkbox' type="checkbox" name = '2' checked = {twoStop}  onChange={() => dispatch(twoStopChecked(!twoStop))} ></input>
        <span className = 'custom-checkbox'></span>
        2 пересадки
        </label>
        <label className='ticket_checkbox'>
        <input className = 'real-checkbox' type="checkbox" name = '3' checked = {threeStop}  onChange={() => dispatch(threeStopChecked(!threeStop))}></input>
        <span className = 'custom-checkbox'></span>
        3 пересадки
        </label>
        </div>
    )
}
export default Ticketbox