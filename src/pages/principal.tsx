import { useState, useEffect, useContext } from 'react';

import Content from '../components/content';
import ErrorPage from '../components/error';
import SearchQueryContext from '../context/context';

const PAGE_SIZE = 20;

const Principal = () => {
  const name = useContext(SearchQueryContext);
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchData = async (region: string) => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://restcountries.com/v3.1/region/${region}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCountries(data);
        setIsLoading(false);
      } catch (error) {
        localStorage.setItem('busqueda', '');
        setError(error instanceof Error ? error : new Error(String(error)));
        setIsLoading(false);
      }
    };
    fetchData(name);
  }, [name]);

  const totalPages = Math.ceil(countries.length / PAGE_SIZE);
  const start = page * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  return (
    <>
      {isLoading && (
        <p className="w-100 ml-50 bg-yellow-500 text-white font-bold py-2 px-4">
          Loading ... wait
        </p>
      )}
      <div className="flex justify-center grid grid-cols-2 gap-2">
        {!error ? (
          <Content data={countries.slice(start, end)} />
        ) : (
          <ErrorPage />
        )}
        {!error && (
          <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                className={`px-3 py-1 rounded ${page === idx ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => {
                  setPage(idx);
                }}
                disabled={page === idx}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Principal;
