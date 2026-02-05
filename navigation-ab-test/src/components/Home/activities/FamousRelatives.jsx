import { ACTIVITY_METADATA, ACTIVITIES } from '../utils/activityConfig';
import ActivityLinkCard from './ActivityLinkCard';

export default function FamousRelatives() {
  const metadata = ACTIVITY_METADATA[ACTIVITIES.FAMOUS_RELATIVES];
  return <ActivityLinkCard {...metadata} />;
}
