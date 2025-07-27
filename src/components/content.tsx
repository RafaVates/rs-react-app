import { Link, Outlet } from 'react-router-dom';
import type Country from './country';

interface Data {
  data: Country[];
}

const Content = ({ data }: Data) => {
  const countries = data;

  return (
    <>
      <div>
        <h2 className="p-2 text-4xl font-extrabold">
          List of countries and its population
        </h2>
        <div className="flex justify-center">
          <ul className="p-4">
            {countries.map((country, i) => (
              <li key={i}>
                <Link
                  to={`/${i}`}
                  className="grid grid-cols-2 gap-2"
                  state={{ country }}
                >
                  <div className="w-60">{country.name.common}</div>
                  <div className="w-60">{country.population}</div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default Content;
