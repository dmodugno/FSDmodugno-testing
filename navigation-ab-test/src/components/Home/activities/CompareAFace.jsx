import { ACTIVITY_METADATA, ACTIVITIES } from '../utils/activityConfig';
import ActivityLinkCard from './ActivityLinkCard';

export default function CompareAFace() {
  const metadata = ACTIVITY_METADATA[ACTIVITIES.COMPARE_A_FACE];
  return <ActivityLinkCard {...metadata} />;
}
