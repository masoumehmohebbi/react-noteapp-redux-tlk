import { useContext, useEffect, createContext, useState } from 'react';
import { getAsyncNotes } from '../features/note/noteSlice';
import { useDispatch, useSelector } from 'react-redux';

const NoteContext = createContext();
function CategoryNotesContext({ children }) {
  const [selectedNotes, setSlectedNotes] = useState(null);
  const { notes } = useSelector((state) => state.notes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAsyncNotes());
  }, []);

  useEffect(() => {
    setSlectedNotes(notes.filter((note) => note.category !== 'همه'));
  }, [notes]);

  return (
    <NoteContext.Provider value={{ selectedNotes, setSlectedNotes }}>
      {children}
    </NoteContext.Provider>
  );
}

export default CategoryNotesContext;

export function useCategoryNotes() {
  return useContext(NoteContext);
}
