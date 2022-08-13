import { createSlice } from '@reduxjs/toolkit';
import {
  fetchContacts,
  removeContact,
  postContact,
} from './contacts-operations';

const setRejected = (state, action) => {
  state.error = action.payload;
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    filter: '',
    isLoading: false,
    error: null,
  },
  reducers: {
    addContact: (state, action) => {
      state.items.push(action.payload);
    },
    deleteContact: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    changeFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: {
    [fetchContacts.pending]: state => {
      state.isLoading = true;
      state.items = [];
    },
    [fetchContacts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.items = action.payload;
    },
    [postContact.pending]: state => {
      state.isLoading = true;
    },
    [postContact.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.items.push(action.payload);
    },
    [removeContact.pending]: state => {
      state.isLoading = true;
    },
    [removeContact.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    [fetchContacts.rejected]: setRejected,
    [removeContact.rejected]: setRejected,
    [postContact.rejected]: setRejected,
  },
});

export const { addContact, deleteContact, changeFilter } =
  contactsSlice.actions;

export default contactsSlice.reducer;
