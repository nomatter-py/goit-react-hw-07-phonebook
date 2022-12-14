import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../services/mockapi-api';
//import { deleteContact, addContact } from './contacts-slice';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, { rejectWithValue }) => {
    try {
      let data = await api.getContacts();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeContact = createAsyncThunk(
  'contacts/removeContact',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      await api.deleteContact(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const postContact = createAsyncThunk(
  'contacts/postContact',
  async ({ name, number }, { rejectWithValue, dispatch }) => {
    try {
      const data = await api.addContact({ name, number });
      return data;     
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error.message);
    }
  }
);