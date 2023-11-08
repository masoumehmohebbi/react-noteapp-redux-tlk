import CategoryNotesContext from '../context/CategoryNotesContext';
import SelectNavCategoryContext from '../context/SelectNavCategoryContext';

function Providers({ children }) {
  return (
    <CategoryNotesContext>
      <SelectNavCategoryContext>{children}</SelectNavCategoryContext>
    </CategoryNotesContext>
  );
}

export default Providers;
