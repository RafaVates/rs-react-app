import { useNavigate, useLocation } from 'react-router-dom';

const Detail = () => {
  // let params= useParams()
  const location = useLocation();
  const { country } = location.state || {};
  const navigate = useNavigate();

  return (
    <div className="max-w-sm mx-auto my-40 bg-white rounded-lg shadow-md overflow-hidden">
      <img src={country.flags?.png} alt={country.name.common} />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{country.name.common}</h2>
        <p className="text-gray-600 mb-4">
          Its capital name is: {country.capital || '-'}
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Volver
        </button>
      </div>
    </div>
  );
};

export default Detail;
