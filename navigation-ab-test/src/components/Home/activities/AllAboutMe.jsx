import { ACTIVITY_METADATA, ACTIVITIES } from '../utils/activityConfig';
import ActivityLinkCard from './ActivityLinkCard';

export default function AllAboutMe() {
  const metadata = ACTIVITY_METADATA[ACTIVITIES.ALL_ABOUT_ME];
  return <ActivityLinkCard {...metadata} />;
}
