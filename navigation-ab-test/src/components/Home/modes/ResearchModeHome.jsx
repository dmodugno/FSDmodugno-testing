import { ModuleCard } from '../components';
import ModulePlaceholder from './modules/ModulePlaceholder';

export default function ResearchModeHome() {
  return (
    <div className="space-y-6">
      <div className="text-2xl font-semibold text-gray-900">Research</div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ModuleCard
          title="Recent Searches"
          icon="DocumentRecordSearch"
          content={<ModulePlaceholder message="Your recent search history will appear here" />}
        />

        <ModuleCard
          title="Favorite Collections"
          icon="SocialStar"
          content={<ModulePlaceholder message="Your saved collections will appear here" />}
        />

        <ModuleCard
          title="Saved Items"
          icon="DocumentBox"
          content={<ModulePlaceholder message="Your saved records and documents will appear here" />}
        />

        <ModuleCard
          title="Search Tools"
          icon="ControlList"
          content={<ModulePlaceholder message="Quick access to search tools and filters" />}
        />
      </div>
    </div>
  );
}
