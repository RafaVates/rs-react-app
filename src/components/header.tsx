import { useState, type ChangeEvent } from 'react';
interface SearchBarProps {
  name: string;
  onSearch: (query: string) => void;
}

const Header = ({ name, onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState(name);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (query.trim() === '') {
      return;
    }
    onSearch(query);
    localStorage.setItem('busqueda', query);
  };

  return (
    <div className="bg-gray-200 p-5">
      <div className="flex border border-gray-300 rounded-md overflow-hidden">
        <input
          className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search ... Enter a valid region (Asia-America-North America-Europe)"
        />
        <button
          className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Header;
