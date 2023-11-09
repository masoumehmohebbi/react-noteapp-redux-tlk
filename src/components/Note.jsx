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
import { useCategory } from '../context/SelectNavCategoryContext';
import { useState } from 'react';
import Modal from './modal';

function Note() {
  const [editNote, setEditNote] = useState(null);
  const { selectedNotes, setSlectedNotes } = useCategoryNotes();
  const { selectedCat, setSelectedCat } = useCategory();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const { notes, loading, error } = useSelector((state) => state.notes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAsyncNotes());
  }, []);

  const handleDeleteNote = (id) => {
    dispatch(deleteAsyncNotes({ id }));

    console.log(selectedCat);
    const selectedNote = notes.filter((note) => note.category === selectedCat);
    setSlectedNotes(selectedNote);
    console.log(selectedNotes);
  };
  const updateHandel = (id, title, description, category) => {
    // setEditNote(null);
    // const selectItem = notes.find((note) => note.id === id);
    // console.log(selectItem);

    const noteData = {
      id,
      title,
      description,
      category,
    };
    setEditNote(noteData);
    setIsOpenModal(true);
  };

  return (
    <div>
      <ProgressNote
        numOfAllNotes={notes?.length}
        numOfCompleted={notes?.filter((note) => note.completed === true).length}
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
                      } w-5 h-5 duration-500 cursor-pointer relative peer shrink-0 appearance-none border-2 border-purple-500 rounded-[4px] bg-purple-200
                      mt-1 checked:bg-purple-800 checked:border-0 focus:outline-none focus:ring-offset-0 focus:ring-2 focus:ring-purple-300
                      disabled:border-steel-400 disabled:bg-steel-400`}
                      type="checkbox"
                      onChange={() => {
                        dispatch(
                          toggleAsyncNotes({ id: note.id, completed: !note.completed }),
                        );
                      }}
                      name=""
                      id=""
                    />
                    <svg
                      className="absolute w-4 h-4 pointer-events-none hidden peer-checked:block stroke-white mt-1 outline-none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <h2
                      className={`${note.completed ? 'line-through' : ''} font-semibold`}
                    >
                      {note.title}
                    </h2>
                  </div>

                  <div className="flex gap-x-3">
                    <button
                      onClick={() =>
                        updateHandel(note.id, note.title, note.description, note.category)
                      }
                    >
                      <BiEdit className="w-5 h-5 text-primary" />
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
                <Modal
                  isOpenModal={isOpenModal}
                  setIsOpenModal={setIsOpenModal}
                  editNote={editNote}
                />
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
