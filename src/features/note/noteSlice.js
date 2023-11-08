import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import supabase from '../../supabase';

export const getAsyncNotes = createAsyncThunk(
  'notes/getAsyncNotes',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await supabase.from('noteapp').select('*');
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const addAsyncNotes = createAsyncThunk(
  'notes/addAsyncNotes',
  async (payload, { rejectWithValue }) => {
    try {
      await supabase.from('noteapp').insert({
        title: payload.title,
        description: payload.description,
        category: payload.category,
        completed: false,
        date: Date.now(),
      });
      const { data } = await supabase.from('noteapp').select('*');
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const deleteAsyncNotes = createAsyncThunk(
  'notes/deleteAsyncNotes',
  async (payload, { rejectWithValue }) => {
    try {
      await supabase.from('noteapp').delete().eq('id', payload.id);
      return { id: payload.id };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const toggleAsyncNotes = createAsyncThunk(
  'notes/toggleAsyncNote',
  async (payload, { rejectWithValue }) => {
    try {
      // const response = await api.patch(`/todos/${payload.id}`, {
      //   completed: payload.completed,
      // });

      await supabase
        .from('noteapp')
        .update({ completed: payload.completed })
        .match({ id: payload.id });
      // const { data } = await supabase.from('noteapp').select('*');

      let { data } = await supabase.from('noteapp').select('*').eq('id', payload.id);
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const noteSlice = createSlice({
  name: 'notes',
  initialState: {
    notes: [],
    loading: false,
    error: '',
  },
  extraReducers: {
    [getAsyncNotes.pending]: (state, action) => {
      state.loading = true;
      state.notes = [];
      state.error = '';
    },
    [getAsyncNotes.fulfilled]: (state, action) => {
      state.loading = false;
      state.notes = action.payload;
    },
    [getAsyncNotes.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.notes = [];
    },
    [addAsyncNotes.pending]: (state, action) => {
      state.loading = true;
    },
    [addAsyncNotes.fulfilled]: (state, action) => {
      state.loading = false;
      state.notes = action.payload;
    },
    [deleteAsyncNotes.fulfilled]: (state, action) => {
      state.loading = false;
      state.notes = state.notes.filter((note) => note.id !== action.payload.id);
    },
    [toggleAsyncNotes.fulfilled]: (state, action) => {
      const selectedNote = state.notes.find((note) => note.id === action.payload[0].id);
      selectedNote.completed = action.payload[0].completed;
    },
  },
});

export default noteSlice.reducer;
