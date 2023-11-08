import Header from './components/Header';
import Note from './components/Note';

export default function App() {
  // const [selectedNotes, setSlectedNotes] = useState(null);
  // const { notes } = useSelector((state) => state.notes);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getAsyncNotes());
  // }, []);

  // useEffect(() => {
  //   setSlectedNotes(notes.filter((note) => note.category !== 'همه'));
  // }, [notes]);

  return (
    <div className="container my-20 mx-auto lg:max-w-[70vw]">
      <Header />
      <Note />
    </div>
  );
}
