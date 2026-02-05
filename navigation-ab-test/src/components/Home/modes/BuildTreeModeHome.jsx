import { useUser } from '../../../contexts/UserContext';
import { ModuleCard } from '../components';
import ModulePlaceholder from './modules/ModulePlaceholder';

export default function BuildTreeModeHome() {
  const { user } = useUser();

  return (
    <div className="space-y-6">
      <div className="text-2xl font-semibold text-gray-900">Build Your Tree</div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ModuleCard
          title="Hints"
          icon="TreePedigree"
          badge={user?.hintsCount || 0}
          content={<ModulePlaceholder message="Record hints and suggestions will appear here" />}
        />

        <ModuleCard
          title="Following"
          icon="SocialStar"
          content={<ModulePlaceholder message="People you're following will appear here" />}
        />

        <ModuleCard
          title="Recent Changes"
          icon="MenuHome"
          content={<ModulePlaceholder message="Recent tree changes and updates will appear here" />}
        />

        <ModuleCard
          title="Possible Duplicates"
          icon="Person"
          badge={user?.duplicatesCount || 0}
          content={<ModulePlaceholder message="Potential duplicate persons will appear here" />}
        />
      </div>
    </div>
  );
}
