import { ActivityCard } from '../components';
import {
  TogetherApp,
  RecordMyStory,
  CompareAFace,
  WhereAmIFrom,
  FamousRelatives,
  AllAboutMe,
  SurnameOrigins,
  PictureMyHeritage
} from '../activities';

export default function ExploreModeHome() {
  const activities = [
    { id: 'together-app', component: TogetherApp },
    { id: 'record-my-story', component: RecordMyStory },
    { id: 'compare-a-face', component: CompareAFace },
    { id: 'where-am-i-from', component: WhereAmIFrom },
    { id: 'famous-relatives', component: FamousRelatives },
    { id: 'all-about-me', component: AllAboutMe },
    { id: 'surname-origins', component: SurnameOrigins },
    { id: 'picture-my-heritage', component: PictureMyHeritage }
  ];

  return (
    <div className="space-y-8">
      <div>
        <div className="text-2xl font-semibold text-gray-900 mb-2">Explore & Discover</div>
        <div className="text-gray-600">
          Fun ways to learn about your family history
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map(activity => (
          <ActivityCard
            key={activity.id}
            activity={activity}
          />
        ))}
      </div>
    </div>
  );
}
