export default function AddPersonCard({ type, onClick }) {
  // type can be: "child", "father", "mother", "spouse"
  const labels = {
    child: "ADD CHILD",
    father: "ADD FATHER",
    mother: "ADD MOTHER",
    spouse: "ADD SPOUSE"
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md border border-gray-200 w-80 p-4 cursor-pointer hover:bg-gray-50"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        {/* Generic Avatar */}
        <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
          <svg className="w-full h-full text-gray-400 p-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        </div>

        {/* Add Text */}
        <div className="flex-1">
          <h3 className="font-medium text-blue-600 text-sm">{labels[type]}</h3>
        </div>
      </div>
    </div>
  );
}
