// AccessDenied.jsx
const AccessDenied = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="bg-white p-6 rounded-md shadow-lg text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-2">Access Denied</h1>
        <p className="text-gray-700">
          You do not have permission to view this page.
        </p>
      </div>
    </div>
  );
};

export default AccessDenied;
