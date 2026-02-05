import { ACTIVITY_METADATA, ACTIVITIES } from '../utils/activityConfig';
import ActivityLinkCard from './ActivityLinkCard';

export default function TogetherApp() {
  const metadata = ACTIVITY_METADATA[ACTIVITIES.TOGETHER_APP];
  return <ActivityLinkCard {...metadata} />;
}
