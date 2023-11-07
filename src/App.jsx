import Header from './components/Header';
import Note from './components/Note';

export default function App() {
  return (
    <div className="container my-20 mx-auto lg:max-w-[70vw]">
      <Header />
      <Note />
    </div>
  );
}