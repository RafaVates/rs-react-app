import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1 className="p-2 text-4xl font-extrabold">
        Ops ... this is not a valid URL
      </h1>
      <button
        onClick={() => navigate('/')}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Volver
      </button>
    </>
  );
};

export default PageNotFound;
