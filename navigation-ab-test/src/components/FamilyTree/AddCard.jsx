export default function AddCard({ type }) {
  const labels = {
    spouse: 'ADD SPOUSE',
    child: 'ADD CHILD',
    father: 'ADD FATHER',
    mother: 'ADD MOTHER'
  };

  const handleAdd = () => {
    console.log(`Adding ${type}`);
  };

  return (
    <button
      onClick={handleAdd}
      className="bg-white rounded-lg shadow-md border border-gray-200 p-4 w-64 hover:shadow-lg hover:border-green-500 transition-all group"
    >
      <div className="flex items-center gap-3">
        {/* Plus Icon */}
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-green-50 transition-colors flex-shrink-0">
          <svg className="w-6 h-6 text-gray-400 group-hover:text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </div>

        {/* Label */}
        <span className="text-sm font-medium text-green-600 group-hover:text-green-700">
          {labels[type]}
        </span>
      </div>
    </button>
  );
}
