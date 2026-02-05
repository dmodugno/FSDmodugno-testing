import { ACTIVITY_METADATA, ACTIVITIES } from '../utils/activityConfig';
import ActivityLinkCard from './ActivityLinkCard';

export default function SurnameOrigins() {
  const metadata = ACTIVITY_METADATA[ACTIVITIES.SURNAME_ORIGINS];
  return <ActivityLinkCard {...metadata} />;
}
