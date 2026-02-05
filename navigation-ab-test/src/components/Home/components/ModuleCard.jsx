export default function ModuleCard({ title, icon, badge, content }) {
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          {icon && (
            <img
              src={`${baseUrl}icons/${icon}.svg`}
              alt=""
              className="w-6 h-6"
            />
          )}
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        {badge !== undefined && badge !== null && (
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
            {badge}
          </span>
        )}
      </div>
      <div className="text-gray-700">
        {content}
      </div>
    </div>
  );
}
