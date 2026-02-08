import { calculateOverallProgress } from '../data/database';

export default function StatsBar({ universities }) {
  if (!universities || universities.length === 0) {
    return null; // Don't show stats if no data loaded yet
  }

  const totalUniversities = universities.length;
  const appliedCount = universities.filter(u => u.status !== 'not-applied').length;
  const submittedCount = universities.filter(u => u.status === 'submitted').length;
  const acceptedCount = universities.filter(u => u.status === 'accepted').length;
  const documentProgress = calculateOverallProgress(universities);

  const stats = [
    { label: 'Total Universities', value: totalUniversities, icon: '🏛️', color: 'blue' },
    { label: 'In Progress', value: appliedCount, icon: '⏳', color: 'yellow' },
    { label: 'Submitted', value: submittedCount, icon: '✉️', color: 'purple' },
    { label: 'Accepted', value: acceptedCount, icon: '🎉', color: 'green' },
    { label: 'Documents Ready', value: `${documentProgress}%`, icon: '📄', color: 'orange' }
  ];

  return (
    <div className="stats-bar">
      {stats.map((stat, index) => (
        <div key={index} className={`stat-card stat-${stat.color}`}>
          <div className="stat-icon">{stat.icon}</div>
          <div className="stat-content">
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}