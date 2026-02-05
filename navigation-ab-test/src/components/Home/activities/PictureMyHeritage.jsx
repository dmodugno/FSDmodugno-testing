import { ACTIVITY_METADATA, ACTIVITIES } from '../utils/activityConfig';
import ActivityLinkCard from './ActivityLinkCard';

export default function PictureMyHeritage() {
  const metadata = ACTIVITY_METADATA[ACTIVITIES.PICTURE_MY_HERITAGE];
  return <ActivityLinkCard {...metadata} />;
}
