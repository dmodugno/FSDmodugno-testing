/**
 * ToolsHub - Mobile Tools Selection
 *
 * Shows list of available tools. Selecting a tool replaces
 * the tools hub with the tool detail (not stacked).
 *
 * See ARCHITECTURE.md → Bottom Sheet Behavior (Mobile)
 */

export default function ToolsHub({ onSelectTool, tools }) {
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <div className="space-y-2">
      {tools.map((tool) => (
        <button
          key={tool.id}
          onClick={() => onSelectTool(tool.id)}
          className="w-full flex items-center gap-3 p-4 bg-white hover:bg-gray-50 rounded-lg border border-gray-200"
        >
          <img
            src={tool.icon}
            alt=""
            className="w-6 h-6"
          />
          <div className="flex-1 text-left">
            <div className="font-medium text-gray-900">{tool.label}</div>
            {tool.description && (
              <div className="text-sm text-gray-500">{tool.description}</div>
            )}
          </div>
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      ))}
    </div>
  );
}
