import { useState, useEffect } from 'react';
import Header from '../components/header';
import Content from '../components/content';
import ErrorPage from '../components/error';

const Principal = () => {
  const initialValue = localStorage.getItem('busqueda') || 'europe';
  const [name, setName] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [countries, setCountries] = useState([]);

  const handleSearchChange = (e: string) => {
    setName(e);
  };

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

  return (
    <div className="flex flex-col h-screen w-full">
      <Header name={name} onSearch={handleSearchChange} />
      <div className="flex-grow text-center p-10">
        {isLoading && (
          <p className="w-100 ml-50 bg-yellow-500 text-white font-bold py-2 px-4">
            Loading ... wait
          </p>
        )}
        {!error ? <Content data={countries} /> : <ErrorPage />}
      </div>
    </div>
  );
};

export default Principal;
