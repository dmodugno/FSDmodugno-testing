import { useHomeMode } from './hooks';
import { MODES } from './utils/modeConfig';
import {
  BaselineHome,
  ResearchModeHome,
  BuildTreeModeHome,
  ExploreModeHome,
  TempleModeHome
} from './modes';

export default function HomePage() {
  const { mode, baselineState } = useHomeMode();

  // Loading state
  if (!mode) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  const renderModeLayout = () => {
    switch (mode) {
      case MODES.BASELINE:
        return <BaselineHome state={baselineState} />;

      case MODES.RESEARCH:
        return <ResearchModeHome />;

      case MODES.BUILD_TREE:
        return <BuildTreeModeHome />;

      case MODES.EXPLORE:
        return <ExploreModeHome />;

      case MODES.TEMPLE:
        return <TempleModeHome />;

      default:
        // Fallback to baseline
        return <BaselineHome state={baselineState || 'no-context'} />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {renderModeLayout()}
    </div>
  );
}
