import { useState } from 'react';
import { BiPlus, BiSearch } from 'react-icons/bi';
import Modal from './modal';
import { useSelector } from 'react-redux';
import { useCategory } from '../context/SelectNavCategoryContext';
import { useCategoryNotes } from '../context/CategoryNotesContext';
function Header() {
  return (
    <div className="">
      <SearchBox />
      <Navbar />
    </div>
  );
}

export default Header;

function SearchBox() {
  const { selectedNotes, setSlectedNotes } = useCategoryNotes();
  const { notes } = useSelector((state) => state.notes);
  const { setSelectedCat } = useCategory();

  const handleSearch = (e) => {
    const filteredNotes = selectedNotes.filter((note) =>
      (note.title || note.description)
        .toLowerCase()
        .includes(e.target.value.toLowerCase()),
    );

    if (!e.target.value == '') {
      setSlectedNotes(filteredNotes);
    } else {
      setSlectedNotes(notes);
      setSelectedCat('همه');
    }
  };
  return (
    <div className="flex items-center p-3 w-full mb-5 shadow-md bg-white">
      <BiSearch className="text-primary w-5 h-5" />
      <input
        onChange={(e) => handleSearch(e)}
        type="text"
        className="capitalize outline-none mr-2 w-full text-primary"
        placeholder="جستجو یادداشت..."
      />
    </div>
  );
}
function Navbar() {
  const { setSlectedNotes } = useCategoryNotes();
  const [isOpenModal, setIsOpenModal] = useState(false);
  // const [selectedCat, setSelectedCat] = useState('همه');
  const { selectedCat, setSelectedCat } = useCategory();
  const { notes } = useSelector((state) => state.notes);

  const hanleSelectCat = (cat) => {
    setSelectedCat(cat);

    const selectedNotes = notes.filter((note) => note.category === cat);
    setSlectedNotes(selectedNotes);

    if (cat === 'همه')
      return setSlectedNotes(notes.filter((note) => note.category !== 'همه'));
  };
  return (
    <>
      <nav className="flex flex-col-reverse md:flex-row justify-between py-6 items-start md:items-center">
        <ul className="flex md:gap-x-9 md:pl-9 text-primary">
          <li
            onClick={() => hanleSelectCat('همه')}
            className={` ${selectedCat === 'همه' && 'bg-blue-300'} before:bg-blue-300`}
          >
            همه
          </li>
          <li
            onClick={() => hanleSelectCat('خانه')}
            className={` ${
              selectedCat === 'خانه' && 'bg-orange-300'
            } before:bg-orange-300`}
          >
            خانه
          </li>
          <li
            onClick={() => hanleSelectCat('کار')}
            className={`${selectedCat === 'کار' && 'bg-purple-300'} before:bg-purple-300`}
          >
            کار
          </li>
          <li
            onClick={() => hanleSelectCat('شخصی')}
            className={`${selectedCat === 'شخصی' && 'bg-green-300'} before:bg-green-300`}
          >
            شخصی
          </li>
        </ul>
        <button
          onClick={() => setIsOpenModal((is) => !is)}
          className="bg-purple-500 mb-9 absolute top-3 right-0 md:static md:mb-0 hover:ring-2 duration-500 hover:bg-purple-600 hover:ring-purple-600 hover:ring-offset-2 hover:ring-offset-current py-[6px] px-4 justify-between flex items-center rounded-md text-white"
        >
          <BiPlus className="w-5 h-5 ml-2" />
          اضافه کردن
          <span className="mr-[6px] block"> یادداشت</span>
        </button>
      </nav>

      <Modal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />
    </>
  );
}
