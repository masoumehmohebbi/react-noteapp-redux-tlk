import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Note from './components/Note';

export default function App() {
  return (
    <div className="container relative py-20 mx-auto lg:max-w-[70vw] px-1">
      <Toaster />
      <Header />
      <Note />
    </div>
  );
}
