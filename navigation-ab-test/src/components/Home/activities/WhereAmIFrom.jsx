import { ACTIVITY_METADATA, ACTIVITIES } from '../utils/activityConfig';
import ActivityLinkCard from './ActivityLinkCard';

export default function WhereAmIFrom() {
  const metadata = ACTIVITY_METADATA[ACTIVITIES.WHERE_AM_I_FROM];
  return <ActivityLinkCard {...metadata} />;
}
