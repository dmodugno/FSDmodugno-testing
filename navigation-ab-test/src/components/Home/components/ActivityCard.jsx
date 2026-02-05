export default function ActivityCard({ activity }) {
  const Component = activity.component;

  return (
    <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
      <Component />
    </div>
  );
}
