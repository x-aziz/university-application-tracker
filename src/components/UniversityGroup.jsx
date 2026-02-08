import UniversityCard from './UniversityCard';

export default function UniversityGroup({ city, universities, onUpdateStatus, onDelete }) {
  return (
    <div className="city-group">
      <div className="city-header">
        <h3>📍 {city}</h3>
        <span className="city-count">{universities.length} {universities.length === 1 ? 'university' : 'universities'}</span>
      </div>

      <div className="university-cards">
        {universities.map(university => (
          <UniversityCard
            key={university.id}
            university={university}
            onUpdateStatus={onUpdateStatus}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}