import { useEffect } from 'react';
import { BiEdit, BiTrash } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteAsyncNotes,
  getAsyncNotes,
  toggleAsyncNotes,
} from '../features/note/noteSlice';
import Loader from './Loader';
import { useCategoryNotes } from '../context/CategoryNotesContext';

function Note() {
  const { selectedNotes } = useCategoryNotes();

  const { notes, loading, error } = useSelector((state) => state.notes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAsyncNotes());
  }, []);

  const handleDeleteNote = (id) => {
    dispatch(deleteAsyncNotes({ id }));
  };
  const updateHandel = (id) => {
    const selectItem = notes.find((note) => note.id === id);
    console.log(selectItem);
  };

  return (
    <div>
      <ProgressNote
        numOfAllNotes={selectedNotes?.length}
        numOfCompleted={selectedNotes?.filter((note) => note.completed === true).length}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <Loader />
        ) : error ? (
          <p>error ...</p>
        ) : (
          selectedNotes?.map((note) => {
            const mydate = new Date(Number(note.date));
            const mypersiandate = mydate.toLocaleDateString('fa-IR');
            return (
              <article
                key={note.id}
                className={` ${
                  note.category === 'کار'
                    ? 'bg-purple-400'
                    : note.category === 'خانه'
                    ? 'bg-orange-400'
                    : 'bg-green-400'
                } shadow-lg flex flex-col gap-11 rounded-md p-2 text-primary ${
                  note.completed ? 'bg-gray-500' : ''
                }`}
              >
                <div className="flex justify-between items-center relative">
                  <div className="flex gap-x-3">
                    <input
                      checked={note.completed}
                      className={` ${
                        note.completed && 'line-through'
                      } w-5 h-5 text-purple-500 duration-500 cursor-pointer relative form-checkbox rounded`}
                      type="checkbox"
                      onChange={() => {
                        dispatch(
                          toggleAsyncNotes({ id: note.id, completed: !note.completed }),
                        );
                      }}
                      name=""
                      id=""
                    />
                    <h2
                      className={`${note.completed ? 'line-through' : ''} font-semibold`}
                    >
                      {note.title}
                    </h2>
                  </div>

                  <div className="flex gap-x-3">
                    <button>
                      <BiEdit
                        onClick={() => updateHandel(note.id)}
                        className="w-5 h-5 text-primary"
                      />
                    </button>
                    <button onClick={() => handleDeleteNote(note.id)}>
                      <BiTrash className="w-5 h-5 text-primary" />
                    </button>
                  </div>
                </div>
                <p className={`${note.completed ? 'line-through' : ''}`}>
                  {note.description}
                </p>
                <span className={`${note.completed ? 'line-through' : ''}`}>
                  {mypersiandate}
                </span>
              </article>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Note;

function ProgressNote({ numOfAllNotes, numOfCompleted }) {
  return (
    <div className="flex flex-col my-11 gap-y-2">
      <span className="text-xl text-slate-600 font-semibold">
        شما {numOfCompleted} از{numOfAllNotes} یادداشت را انجام داده اید
      </span>
      <div className="w-full h-1 bg-purple-200"></div>
    </div>
  );
}
