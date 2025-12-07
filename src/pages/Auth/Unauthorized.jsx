const Unauthorized = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold text-red-600">Access Denied</h1>
      <p className="text-gray-600 mt-4 text-lg">
        You do not have permission to view this page.
      </p>

      <a
        href="/login"
        className="mt-6 px-6 py-3 bg-primary text-white rounded-lg shadow hover:bg-purple-700 transition"
      >
        Go to Login
      </a>
    </div>
  );
};

export default Unauthorized;
