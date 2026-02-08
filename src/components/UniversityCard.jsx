import { getStatusColor, getStatusLabel } from '../data/database';
const { id, name, specialty, fees, ielts, duolingo, intake, deadline, depositAmount, link, status } = university;
export default function UniversityCard({ university, onUpdateStatus, onDelete }) {
  const { id, name, specialty, fees, ielts, link, status } = university;

  const statuses = [
    'not-applied',
    'documents-pending',
    'submitted',
    'accepted',
    'rejected'
  ];

  return (
    <div className="university-card">
      <div className="card-header">
        <h4>{name}</h4>
        <span className={`status-badge ${getStatusColor(status)}`}>
          {getStatusLabel(status)}
        </span>
      </div>

     <div className="card-body">
  <div className="card-detail">
    <span className="detail-label">📚 Program:</span>
    <span className="detail-value">{specialty}</span>
  </div>
  <div className="card-detail">
    <span className="detail-label">💰 Fees:</span>
    <span className="detail-value">{fees}</span>
  </div>
  <div className="card-detail">
    <span className="detail-label">📝 IELTS:</span>
    <span className="detail-value">{ielts} / Duolingo {duolingo || 'N/A'}</span>
  </div>
  <div className="card-detail">
    <span className="detail-label">📅 Intake:</span>
    <span className="detail-value">{intake}</span>
  </div>
  <div className="card-detail">
    <span className="detail-label">⏰ Deadline:</span>
    <span className="detail-value deadline">{deadline}</span>
  </div>
  <div className="card-detail">
    <span className="detail-label">💵 Deposit:</span>
    <span className="detail-value">{depositAmount}</span>
  </div>
</div>

      <div className="card-actions">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-link"
        >
          🔗 View Course
        </a>

        <select
          className="status-select"
          value={status}
          onChange={(e) => onUpdateStatus(id, e.target.value)}
        >
          {statuses.map(s => (
            <option key={s} value={s}>
              {getStatusLabel(s)}
            </option>
          ))}
        </select>

        <button
          className="btn btn-delete"
          onClick={() => {
            if (window.confirm(`Delete ${name}?`)) {
              onDelete(id);
            }
          }}
        >
          🗑️
        </button>
      </div>
    </div>
  );
}