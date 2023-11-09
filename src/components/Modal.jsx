import { useState } from 'react';
import SelectOption from './SelectOption';
import { useDispatch, useSelector } from 'react-redux';
import { addAsyncNotes, updateAsyncNotes } from '../features/note/noteSlice';
import { useEffect } from 'react';

function Modal({ isOpenModal, setIsOpenModal, editNote }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);

  const { loading } = useSelector((state) => state.notes);
  const dispatch = useDispatch();
  useEffect(() => {
    setTitle(editNote?.title || '');
    setDescription(editNote?.description || '');
    setSelectedOption({ label: editNote?.category } || null);
  }, [editNote]);

  const handleAddNote = () => {
    if (!title || !description || !selectedOption.value) return;
    dispatch(
      addAsyncNotes({
        title: title,
        description: description,
        category: selectedOption.value,
      }),
    );
    setTitle('');
    setDescription('');
    setSelectedOption(null);
  };
  const handleUpdateNote = () => {
    dispatch(
      updateAsyncNotes({
        id: editNote.id,
        title,
        description,
        category: selectedOption.value,
      }),
    );
    setIsOpenModal(false);
  };

  if (!isOpenModal) return null;
  return (
    <div>
      <div
        onClick={() => setIsOpenModal(false)}
        className="w-screen h-screen fixed inset-0 bg-purple-300 bg-opacity-80 duration-500"
      ></div>
      <div className="bg-white z-20 rounded-md px-4 w-4/5 sm:w-3/5 min-h-[250px] -translate-x-1/2 -translate-y-1/2 absolute top-[50%] py-4 left-1/2 shadow-lg">
        <div className="mb-6">
          <h1 className="text-lg pb-2 text-slate-700 font-semibold">
            {editNote ? '  تغییر دادن یادداشت' : '  اضافه کردن یادداشت'}
          </h1>
          <div className="h-1 bg-purple-200 w-full"></div>
        </div>
        <div className="grid grid-cols-9 gap-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="col-span-9 md:col-span-6  border border-[#d8b4fe] shadow-md p-2 outline-none text-primary bg-purple-100 rounded-md"
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
            className="border border-[#d8b4fe] p-2 shadow-md outline-none col-span-9 md:col-span-6 h-56 bg-purple-100 rounded-md"
          ></textarea>
        </div>

        <div className="flex gap-4 mt-6 text-primary">
          {loading && editNote ? (
            <button
              disabled={loading}
              onClick={handleAddNote}
              className={` ${
                loading ? 'opacity-50' : 'opacity-100'
              } px-4 py-1 shadow-md bg-purple-600 hover:bg-purple-500 text-white rounded-md`}
            >
              اضافه
            </button>
          ) : (
            <button
              disabled={loading}
              onClick={handleUpdateNote}
              className={` ${
                loading ? 'opacity-50' : 'opacity-100'
              } px-4 py-1 shadow-md bg-purple-600 hover:bg-purple-500 text-white rounded-md`}
            >
              تغییر
            </button>
          )}

          {/* <button
            disabled={loading}
            onClick={handleAddNote}
            className={` ${
              loading ? 'opacity-50' : 'opacity-100'
            } px-4 py-1 shadow-md bg-purple-600 hover:bg-purple-500 text-white rounded-md`}
          >
            {loading
              ? editNote
                ? 'در حال تغییر '
                : 'در حال اضافه شدن'
              : editNote
              ? 'تغییر '
              : 'اضافه'}
          </button> */}
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
