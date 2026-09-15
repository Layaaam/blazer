import { useAuthStore } from "../../auth/store/AuthStore";

const ContactQueries: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <div className="bg-white shadow-lg rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 font-libre-baskerville">
            Contact Queries
          </h3>
          <p className="text-sm text-gray-600 mt-1 font-poppins">
            Queries sent to {user?.college}
          </p>
        </div>
        <div className="flex gap-2">
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-poppins focus:outline-none focus:ring-2 focus:ring-[#024334]/20 focus:border-[#024334]">
            <option>All Status</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Resolved</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-poppins focus:outline-none focus:ring-2 focus:ring-[#024334]/20 focus:border-[#024334]">
            <option>All Types</option>
            <option>Academic Question</option>
            <option>Admission Info</option>
            <option>Student Services</option>
            <option>Technical Support</option>
          </select>
        </div>
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
            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900 font-poppins">
          Coming Soon
        </h3>
        <p className="mt-1 text-sm text-gray-500 font-poppins">
          Contact query management features will be implemented here.
        </p>
      </div>
    </div>
  );
};

export default ContactQueries;
