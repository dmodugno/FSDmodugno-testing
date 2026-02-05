import { useUser } from '../../../contexts/UserContext';
import { ModuleCard } from '../components';
import ModulePlaceholder from './modules/ModulePlaceholder';
import BaselineHome from './BaselineHome';
import { BASELINE_STATES } from '../utils/modeConfig';

export default function TempleModeHome() {
  const { user } = useUser();

  // If not LDS, fall back to baseline
  if (user?.churchMembership !== 'LDS') {
    return <BaselineHome state={BASELINE_STATES.NO_CONTEXT} />;
  }

  return (
    <div className="space-y-6">
      <div className="text-2xl font-semibold text-gray-900">Temple</div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ModuleCard
          title="My Reservations"
          icon="PlaceTemple"
          badge={user?.reservationsCount || 0}
          content={<ModulePlaceholder message="Your temple reservations will appear here" />}
        />

        <ModuleCard
          title="Ordinances Ready"
          icon="PlaceTemple"
          badge={user?.ordinancesReadyCount || 0}
          content={<ModulePlaceholder message="Ordinances ready for temple work will appear here" />}
        />

        <ModuleCard
          title="Family Name Assist"
          icon="PlaceTemple"
          content={<ModulePlaceholder message="Family Name Assist will help find temple work" />}
        />

        <ModuleCard
          title="Schedule Appointment"
          icon="PlaceTemple"
          content={<ModulePlaceholder message="Schedule your temple appointment here" />}
        />
      </div>
    </div>
  );
}
