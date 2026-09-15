const EmailTracker: React.FC = () => {
  return (
    <div className="bg-white shadow-lg rounded-2xl border border-gray-100 p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6 font-libre-baskerville">
        Email Tracking
      </h3>
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
            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900 font-poppins">
          Coming Soon
        </h3>
        <p className="mt-1 text-sm text-gray-500 font-poppins">
          Email delivery tracking features will be implemented here.
        </p>
      </div>
    </div>
  );
};

export default EmailTracker;
