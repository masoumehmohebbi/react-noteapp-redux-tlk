import { LoaderIcon } from 'react-hot-toast';

function Loader() {
  return (
    <div className="flex items-center gap-4  my-4 w-full">
      <LoaderIcon style={{ width: '1.3rem', height: '1.3rem' }} />
      <p> دریافت اطلاعات...</p>
    </div>
  );
}

export default Loader;
