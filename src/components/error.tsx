const ErrorPage = () => {
  return (
    <>
      <h1 className="p-2 text-4xl font-extrabold">
        Ops ... this is not a valid region
      </h1>
      <p className="bg-red-500 text-white font-bold py-2 px-4">
        Refresh page to go back to the app
      </p>
    </>
  );
};

export default ErrorPage;
