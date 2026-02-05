// Reusable component for activity link cards
export default function ActivityLinkCard({ title, description, url, gradient, buttonColor }) {
  const handleClick = () => {
    // Open in new tab or navigate to URL
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={`bg-gradient-to-br ${gradient} rounded-lg p-6 h-full flex flex-col justify-between min-h-[200px]`}>
      <div>
        <div className="text-lg font-semibold text-gray-900 mb-2">{title}</div>
        <div className="text-sm text-gray-700 mb-4">{description}</div>
      </div>
      <button
        onClick={handleClick}
        className={`px-4 py-2 ${buttonColor} text-white rounded-lg transition-colors font-medium w-full`}
      >
        Get Started
      </button>
    </div>
  );
}
