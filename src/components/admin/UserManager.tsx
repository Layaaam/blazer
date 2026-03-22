const UserManager: React.FC = () => {
  return (
    <div className="bg-white shadow-lg rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 font-libre-baskerville">
          User Management
        </h3>
        <button className="bg-[#024334] hover:bg-[#08795F] text-white px-4 py-2 rounded-xl font-poppins font-semibold transition-colors duration-200">
          Add User
        </button>
      </div>
      <div className="text-center py-12">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900 font-poppins">
          Coming Soon
        </h3>
        <p className="mt-1 text-sm text-gray-500 font-poppins">
          User management features will be implemented here.
        </p>
      </div>
    </div>
  );
};

export default UserManager;
