import { useContext } from 'react';
import { createContext } from 'react';
import { useState } from 'react';

const categoryContext = createContext();
function SelectNavCategoryContext({ children }) {
  const [selectedCat, setSelectedCat] = useState('همه');
  return (
    <categoryContext.Provider value={{ selectedCat, setSelectedCat }}>
      {children}
    </categoryContext.Provider>
  );
}

export default SelectNavCategoryContext;

export function useCategory() {
  return useContext(categoryContext);
}
