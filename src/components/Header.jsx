import { BiPlus, BiSearch } from 'react-icons/bi';
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
      <BiSearch />
      <input
        type="text"
        className="capitalize outline-none ml-2"
        placeholder="Search notes..."
      />
    </div>
  );
}
function Navbar() {
  return (
    <nav className="flex justify-between py-6 items-center">
      <ul className="flex space-x-9 pl-9">
        <li className="before:bg-blue-300 rounded-lg bg-blue-300">All</li>
        <li className="before:bg-orange-300">Home</li>
        <li className="before:bg-purple-300">Work</li>
        <li className="before:bg-green-300">Personal</li>
      </ul>
      <button className="bg-purple-500 py-[6px] px-4 justify-between flex items-center rounded-md text-white">
        <BiPlus className="w-5 h-5 mr-2" /> ADD NOTE
      </button>
    </nav>
  );
}
