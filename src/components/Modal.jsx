import { useState } from 'react';
import supabase from '../supabase';
import SelectOption from './SelectOption';

function Modal({ isOpenModal, setIsOpenModal }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);

  const handleAddNote = async () => {
    const newNote = {
      title: title,
      description: description,
      category: selectedOption.value,
    };
    setTitle('');
    setDescription('');
    setSelectedOption(null);
    await supabase.from('noteapp').insert(newNote);
  };

  if (!isOpenModal) return null;
  return (
    <div>
      <div
        onClick={() => setIsOpenModal(false)}
        className="w-screen h-screen fixed inset-0 bg-purple-300 bg-opacity-80 duration-500"
      ></div>
      <div className="bg-white rounded-md px-4 w-3/5 min-h-[250px] -translate-x-1/2 -translate-y-1/2 absolute top-[40%] py-4 left-1/2 shadow-lg">
        <div className="mb-6">
          <h1 className="text-lg pb-2 text-slate-700 font-semibold">
            اضافه کردن یادداشت
          </h1>
          <div className="h-1 bg-purple-200 w-full"></div>
        </div>
        <div className="grid grid-cols-9 gap-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="col-span-6 border border-[#d8b4fe] shadow-md p-2 outline-none text-primary bg-purple-100 rounded-md"
            type="text"
            placeholder="عنوان یادداشت..."
          />
          <SelectOption
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="توضیحات..."
            className="border border-[#d8b4fe] p-2 shadow-md outline-none col-span-6 h-56 bg-purple-100 rounded-md"
          ></textarea>
        </div>

        <div className="flex gap-4 mt-6 text-primary">
          <button
            onClick={handleAddNote}
            className="px-4 py-1 shadow-md bg-purple-600 hover:bg-purple-500 text-white rounded-md"
          >
            اضافه
          </button>
          <button
            onClick={() => setIsOpenModal(false)}
            className="px-4 py-1 shadow-md text-primary border-2 border-red-400 hover:bg-red-400 rounded-md"
          >
            انصراف
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
