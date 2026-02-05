import { useState } from 'react';
import { useUser } from '../../../contexts/UserContext';
import { BASELINE_STATES } from '../utils/modeConfig';
import { BASELINE_ALLOWED_ACTIVITIES } from '../utils/activityConfig';
import { MinimalGreeting, PrimaryCTA, SecondaryCTA, ActivityCard } from '../components';
import { AllAboutMe, SurnameOrigins, PictureMyHeritage } from '../activities';

export default function BaselineHome({ state }) {
  const { user } = useUser();
  const [selectedActivity, setSelectedActivity] = useState(0);

  const handleCTAAction = (action) => {
    console.log('CTA action:', action);
    // Placeholder - would navigate or trigger action
  };

  const getContent = () => {
    const firstName = user?.name?.split(' ')[0] || 'there';

    switch (state) {
      case BASELINE_STATES.NO_CONTEXT:
        return {
          greeting: 'Welcome to FamilySearch',
          primaryCTA: { text: 'Search historical records', action: 'search' },
          secondaryCTA: { text: 'Learn how it works', action: 'learn' },
          showActivity: false
        };

      case BASELINE_STATES.CONTEXTUAL_ENTRY:
        const lastAction = user?.lastAction || 'your previous activity';
        return {
          greeting: `Welcome back, ${firstName}`,
          primaryCTA: { text: `Continue ${lastAction}`, action: 'continue' },
          secondaryCTA: null,
          showActivity: false
        };

      case BASELINE_STATES.EMPTY_TREE:
        return {
          greeting: `Welcome, ${firstName}`,
          primaryCTA: { text: 'Search for ancestors', action: 'search' },
          secondaryCTA: { text: 'Save what you find by starting a tree', action: 'start-tree' },
          showActivity: true
        };

      case BASELINE_STATES.ASSISTED_SESSION:
        return {
          greeting: 'Welcome, helper',
          primaryCTA: { text: 'Start helping someone', action: 'assist' },
          secondaryCTA: { text: 'Search records', action: 'search' },
          showActivity: false
        };

      default:
        return {
          greeting: 'Welcome to FamilySearch',
          primaryCTA: { text: 'Get started', action: 'start' },
          secondaryCTA: null,
          showActivity: false
        };
    }
  };

  const content = getContent();

  // Allowed activities for Empty Tree baseline (rotated, one at a time)
  const baselineActivities = [
    { id: 'all-about-me', component: AllAboutMe },
    { id: 'surname-origins', component: SurnameOrigins },
    { id: 'picture-my-heritage', component: PictureMyHeritage }
  ];

  const currentActivity = baselineActivities[selectedActivity % baselineActivities.length];

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] text-center px-4">
      <MinimalGreeting text={content.greeting} />

      <div className="mt-8 flex flex-col items-center space-y-4">
        <PrimaryCTA {...content.primaryCTA} onAction={handleCTAAction} />
        {content.secondaryCTA && (
          <SecondaryCTA {...content.secondaryCTA} onAction={handleCTAAction} />
        )}
      </div>

      {content.showActivity && (
        <div className="mt-16 w-full max-w-md">
          <div className="text-sm text-gray-500 mb-3">Optional: Try this activity</div>
          <ActivityCard activity={currentActivity} />
        </div>
      )}
    </div>
  );
}
