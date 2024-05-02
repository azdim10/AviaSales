import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { DEFAULT_PATH } from "./constants";
import { Ticket, TicketState } from "./types";

export const fetchTickets = createAsyncThunk<Ticket[], void, { rejectValue: string }>(
  "ticket/fetchTickets",
  async function (_, { rejectWithValue, dispatch }) {
    try {
      const { searchId } = await fetch(`${DEFAULT_PATH}search`).then((res) => res.json());

      const { tickets } = await fetch(`${DEFAULT_PATH}tickets?searchId=${searchId}`).then((res) => res.json());
      if (!tickets.stop) dispatch(fetchTickets);
      return tickets;
    } catch (error) {
      return rejectWithValue("Failed to fetch tickets");
    }
  }
);

const initialState: TicketState = {
  tickets: [],
  loading: false,
  error: null,
  showTickets: 5,
  isActiveButtonFilter: null,
  all:true,
  nonStop: true,
  oneStop: true,
  twoStop: true,
  threeStop: true,
};

const ticketSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    showMoreTickets(state) {
      state.showTickets += 5;
    },
    getSelectedRadioBtn(state, action) {
      state.isActiveButtonFilter = action.payload
      if (state.isActiveButtonFilter === 'radio1')
        state.tickets.sort((ticket1: Ticket, ticket2: Ticket) => ticket1.price - ticket2.price)
      if (state.isActiveButtonFilter === 'radio2')
        state.tickets.sort(
          (ticket1: Ticket, ticket2: Ticket) =>
            ticket1.segments[0].duration +
            ticket1.segments[1].duration -
            (ticket2.segments[0].duration + ticket2.segments[1].duration)
        )
      if (state.isActiveButtonFilter === 'radio3')
        state.tickets.sort(
          (ticket1: Ticket, ticket2: Ticket) =>
            ticket1.segments[0].duration +
            ticket1.segments[1].duration -
            (ticket2.segments[0].duration + ticket2.segments[1].duration) +
            (ticket1.price - ticket2.price)
        )
    },
    allChecked(state, action) {
      state.all = action.payload
      if (state.all) {
        state.nonStop = true
        state.oneStop = true
        state.twoStop = true
        state.threeStop = true
        state.tickets.filter((ticket: { segments: { stops: string[] }[] }) => ticket)
      } else {
        state.nonStop = false
        state.oneStop = false
        state.twoStop = false
        state.threeStop = false
      }
    },

    nonStopChecked(state, action) {
      state.nonStop = action.payload
      if (state.nonStop && state.oneStop && state.twoStop && state.threeStop) state.all = true
      if (!state.nonStop) state.all = false
    },

    oneStopChecked(state, action) {
      state.oneStop = action.payload
      if (state.nonStop && state.oneStop && state.twoStop && state.threeStop) state.all = true
      if (!state.oneStop) state.all = false
    },

    twoStopChecked(state, action) {
      state.twoStop = action.payload
      if (state.nonStop && state.oneStop && state.twoStop && state.threeStop) state.all = true
      if (!state.twoStop) state.all = false
    },

    threeStopChecked(state, action) {
      state.threeStop = action.payload
      if (state.nonStop && state.oneStop && state.twoStop && state.threeStop) state.all = true
      if (!state.threeStop) state.all = false
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.tickets = action.payload;
        state.loading = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

// export const { addTodo, toggleComplete, removeTodo } = todoSlice.actions;

export const { 
  showMoreTickets, 
  allChecked,
  nonStopChecked,
  oneStopChecked,
  twoStopChecked,
  threeStopChecked,
  getSelectedRadioBtn, } = ticketSlice.actions;

export default ticketSlice.reducer;

function isError(action: any) {
  return action.type.endsWith("rejected");
}
