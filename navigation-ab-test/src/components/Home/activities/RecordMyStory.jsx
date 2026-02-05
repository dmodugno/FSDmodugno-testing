import { ACTIVITY_METADATA, ACTIVITIES } from '../utils/activityConfig';
import ActivityLinkCard from './ActivityLinkCard';

export default function RecordMyStory() {
  const metadata = ACTIVITY_METADATA[ACTIVITIES.RECORD_MY_STORY];
  return <ActivityLinkCard {...metadata} />;
}
