import { useEffect } from 'react';
import { BiEdit, BiTrash } from 'react-icons/bi';
import supabase from '../supabase';
import { useState } from 'react';

function Note() {
  const [allNotes, setAllNotes] = useState(null);
  useEffect(() => {
    const fetchNotes = async () => {
      const { data, error } = await supabase.from('noteapp').select('*');
      console.log(data, error);
      setAllNotes(data);
    };
    fetchNotes();
  }, []);

  console.log(allNotes);
  return (
    <div>
      <ProgressNote />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {allNotes &&
          allNotes.map((note) => {
            return (
              <article
                key={note.id}
                className={` ${
                  note.category === 'کار'
                    ? 'bg-purple-400'
                    : note.category === 'خانه'
                    ? 'bg-orange-400'
                    : 'bg-green-400'
                } shadow-lg flex flex-col gap-11 rounded-md p-2`}
              >
                <div className="flex justify-between items-center">
                  <input
                    className="w-5 h-5 text-purple-500"
                    type="checkbox"
                    name=""
                    id=""
                  />

                  <div className="flex gap-x-3">
                    <button>
                      <BiEdit className="w-5 h-5 text-primary" />
                    </button>
                    <button>
                      <BiTrash className="w-5 h-5 text-primary" />
                    </button>
                  </div>
                </div>
                <p>{note.description}</p>
                <span>2023/2/5</span>
              </article>
            );
          })}
      </div>
    </div>
  );
}

export default Note;

function ProgressNote() {
  return (
    <div className="flex flex-col my-11 gap-y-2">
      <span className="text-xl text-slate-600 font-semibold">
        شما 1 از 2 یادداشت را انجام داده اید
      </span>
      <div className="w-full h-1 bg-purple-200"></div>
    </div>
  );
}
