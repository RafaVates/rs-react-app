import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/header';
import SearchQueryContext from '../context/context';

const Layout = () => {
  const initialValue = localStorage.getItem('busqueda') || 'europe';
  const [name, setName] = useState(initialValue);
  const handleSearchChange = (e: string) => {
    setName(e);
  };

  return (
    <SearchQueryContext value={name}>
      <div className="flex flex-col h-screen w-full">
        <Header name={name} onSearch={handleSearchChange} />
        <div className="flex-grow text-center p-10">
          <Outlet />
        </div>
      </div>
    </SearchQueryContext>
  );
};

export default Layout;
