// Generic placeholder for module content
export default function ModulePlaceholder({ message = 'Module content coming soon...' }) {
  return (
    <div className="text-gray-500 text-sm py-4">
      <p>{message}</p>
      <p className="mt-2 text-xs">This module will be built out with real functionality.</p>
    </div>
  );
}
