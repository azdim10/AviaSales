import { createSlice, PayloadAction, createAsyncThunk, AnyAction } from '@reduxjs/toolkit';
export interface Segment {
  origin: string;
  destination?: string; // Optional property
  date: string;
  stops: string[];
  duration: number;
}

export interface Ticket {
  price: number
  carrier: string
  segments: Segment[]
}

type TicketState = {
  list: Ticket[];
  loading: boolean;
  error: string | null;
}
export const fetchTickets = createAsyncThunk<Ticket[], void, { rejectValue: string }>(
    'ticket/fetchTickets',
    async function (_, { rejectWithValue }) {
      try{
      const responseId = await fetch('https://aviasales-test-api.kata.academy/search').then(res => res.json())
      console.log(responseId)
      const response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${responseId.searchId}`).then(res => res.json())
      console.log(response.tickets)
      return response.tickets
      }catch (error) {
        return rejectWithValue('Failed to fetch tickets')
      }

    }
);



const initialState: TicketState = {
  list: [],
  loading: false,
  error: null,
}

const ticketSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
     
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  }
});

// export const { addTodo, toggleComplete, removeTodo } = todoSlice.actions;

export default ticketSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}