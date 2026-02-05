export default function PrimaryCTA({ text, action, onAction }) {
  const handleClick = () => {
    if (onAction) {
      onAction(action);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="px-8 py-4 bg-green-600 text-white text-lg font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-md hover:shadow-lg"
    >
      {text}
    </button>
  );
}
