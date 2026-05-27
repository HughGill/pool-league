const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to North Inishowen Pool League</h1>
      <p className="text-xl mb-8">The home of competitive pool in North Inishowen.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl w-full">
        <div className="bg-blue-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-2">Fixtures</h2>
          <p>Check out the upcoming matches for all divisions.</p>
        </div>
        <div className="bg-green-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-2">Tables</h2>
          <p>See where your team stands in the league rankings.</p>
        </div>
        <div className="bg-yellow-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-2">Results</h2>
          <p>Catch up on the latest scores and match details.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
