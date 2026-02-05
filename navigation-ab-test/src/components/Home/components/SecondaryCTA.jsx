export default function SecondaryCTA({ text, action, onAction }) {
  const handleClick = () => {
    if (onAction) {
      onAction(action);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors"
    >
      {text}
    </button>
  );
}
