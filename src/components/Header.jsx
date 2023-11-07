import { useState } from 'react';
import { BiPlus, BiSearch } from 'react-icons/bi';
import Modal from './modal';
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
  return (
    <div className="flex items-center p-3 w-full mb-5 shadow-md bg-white">
      <BiSearch className="text-primary w-5 h-5" />
      <input
        type="text"
        className="capitalize outline-none mr-2 w-full text-primary"
        placeholder="جستجو یادداشت..."
      />
    </div>
  );
}
function Navbar() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <>
      <nav className="flex justify-between py-6 items-center">
        <ul className="flex space-x-9 pl-9 text-primary">
          <li className="before:bg-blue-300 rounded-lg bg-blue-300">همه</li>
          <li className="before:bg-orange-300">خانه</li>
          <li className="before:bg-purple-300">کار</li>
          <li className="before:bg-green-300">شخصی</li>
        </ul>
        <button
          onClick={() => setIsOpenModal((is) => !is)}
          className="bg-purple-500 hover:ring-2 duration-500 hover:bg-purple-600 hover:ring-purple-600 hover:ring-offset-2 hover:ring-offset-current py-[6px] px-4 justify-between flex items-center rounded-md text-white"
        >
          اضافه کردن
          <span className="mr-[6px] hidden md:block"> یادداشت</span>
          <BiPlus className="w-5 h-5 ml-2" />
        </button>
      </nav>
      <Modal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />
    </>
  );
}
