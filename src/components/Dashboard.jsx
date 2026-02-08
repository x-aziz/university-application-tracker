import { useState } from 'react';
import { groupUniversitiesByCity, getStatusColor, getStatusLabel, calculateDocumentProgress } from '../data/database';

function UniversityCard({ university, onUpdateStatus, onDelete, onSelectUniversity, onUpdateField }) {
  const [expanded, setExpanded] = useState(false);
  
  const { 
    id, 
    name, 
    city,
    specialty, 
    fees, 
    ielts, 
    duolingo,
    intake,
    deadline,
    depositAmount,
    link, 
    status,
    notes,
    casReceived,
    depositPaid,
    visaApplied,
    documents
  } = university;

  const statuses = [
    'not-applied',
    'documents-pending',
    'submitted',
    'accepted',
    'rejected'
  ];

  const docProgress = calculateDocumentProgress(university);

  return (
    <div className="university-card">
      {/* Card Header */}
      <div className="card-header">
        <div style={{ flex: 1 }}>
          <h4>{name}</h4>
          <div style={{ 
            fontSize: '13px', 
            color: 'var(--gray-600)', 
            marginTop: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            📍 {city}
          </div>
        </div>
        <span className={`status-badge ${getStatusColor(status)}`}>
          {getStatusLabel(status)}
        </span>
      </div>

      {/* Quick Info - Always Visible */}
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
          <span className="detail-value">{ielts}</span>
        </div>
        
        {/* Show More/Less Button */}
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            width: '100%',
            padding: '8px',
            marginTop: '8px',
            background: 'var(--gray-100)',
            border: 'none',
            borderRadius: 'var(--radius-sm)',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: '600',
            color: 'var(--primary)',
            transition: 'all 0.2s ease'
          }}
        >
          {expanded ? '▲ Show Less' : '▼ Show All Details'}
        </button>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div style={{
          borderTop: '2px solid var(--gray-100)',
          paddingTop: '16px',
          marginTop: '16px',
          animation: 'fadeIn 0.3s ease'
        }}>
          {/* Full Details Grid */}
          <div style={{ 
            display: 'grid', 
            gap: '12px',
            marginBottom: '16px'
          }}>
            {/* <div className="card-detail">
              <span className="detail-label">🌐 Duolingo:</span>
              <span className="detail-value">{duolingo || 'N/A'}</span>
            </div> */}
            <div className="card-detail">
              <span className="detail-label">📅 Intake:</span>
              <span className="detail-value">{intake}</span>
            </div>
            <div className="card-detail">
              <span className="detail-label">⏰ Deadline:</span>
              <span className="detail-value" style={{ 
                color: deadline.includes('Rolling') ? 'var(--success)' : 'var(--warning)',
                fontWeight: '700'
              }}>
                {deadline}
              </span>
            </div>
            <div className="card-detail">
              <span className="detail-label">💵 Deposit Required:</span>
              <span className="detail-value">{depositAmount}</span>
            </div>
            <div className="card-detail">
              <span className="detail-label">📄 Documents Progress:</span>
              <span className="detail-value">
                <div style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  background: 'var(--gray-100)',
                  padding: '4px 12px',
                  borderRadius: '12px'
                }}>
                  <div style={{
                    width: '60px',
                    height: '6px',
                    background: 'var(--gray-200)',
                    borderRadius: '3px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${docProgress}%`,
                      height: '100%',
                      background: docProgress === 100 ? 'var(--success)' : 'var(--primary)',
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: '700' }}>{docProgress}%</span>
                </div>
              </span>
            </div>
          </div>

          {/* Visa Tracking Checkboxes */}
          <div style={{
            background: 'var(--gray-50)',
            padding: '16px',
            borderRadius: 'var(--radius-sm)',
            marginBottom: '16px'
          }}>
            <div style={{ 
              fontSize: '14px', 
              fontWeight: '700', 
              color: 'var(--gray-900)',
              marginBottom: '12px'
            }}>
              📋 Visa Process Tracker:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                cursor: 'pointer',
                fontSize: '14px'
              }}>
                <input 
                  type="checkbox" 
                  checked={casReceived || false}
                  onChange={(e) => onUpdateField(id, 'casReceived', e.target.checked)}
                  style={{ 
                    width: '18px', 
                    height: '18px',
                    cursor: 'pointer'
                  }}
                />
                <span>CAS Received</span>
              </label>
              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                cursor: 'pointer',
                fontSize: '14px'
              }}>
                <input 
                  type="checkbox" 
                  checked={depositPaid || false}
                  onChange={(e) => onUpdateField(id, 'depositPaid', e.target.checked)}
                  style={{ 
                    width: '18px', 
                    height: '18px',
                    cursor: 'pointer'
                  }}
                />
                <span>Deposit Paid ({depositAmount})</span>
              </label>
              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                cursor: 'pointer',
                fontSize: '14px'
              }}>
                <input 
                  type="checkbox" 
                  checked={visaApplied || false}
                  onChange={(e) => onUpdateField(id, 'visaApplied', e.target.checked)}
                  style={{ 
                    width: '18px', 
                    height: '18px',
                    cursor: 'pointer'
                  }}
                />
                <span>Visa Applied</span>
              </label>
            </div>
          </div>

          {/* Notes Section */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ 
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: 'var(--gray-900)',
              marginBottom: '8px'
            }}>
              📝 Notes:
            </label>
            <textarea
              value={notes || ''}
              onChange={(e) => onUpdateField(id, 'notes', e.target.value)}
              placeholder="Add notes about this application..."
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid var(--gray-200)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '14px',
                fontFamily: 'inherit',
                resize: 'vertical',
                minHeight: '80px'
              }}
            />
          </div>
        </div>
      )}

      {/* Card Actions */}
      <div className="card-actions">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-link"
        >
          🔗 View Course
        </a>

        <button
          onClick={() => onSelectUniversity(university)}
          className="btn"
          style={{
            background: 'var(--secondary)',
            color: 'white',
            flex: 1
          }}
        >
          📄 Documents
        </button>

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

function UniversityGroup({ city, universities, onUpdateStatus, onDelete, onSelectUniversity, onUpdateField }) {
  return (
    <div className="city-group">
      <div className="city-header">
        <h3>📍 {city}</h3>
        <span className="city-count">
          {universities.length} {universities.length === 1 ? 'university' : 'universities'}
        </span>
      </div>

      <div className="university-cards">
        {universities.map(university => (
          <UniversityCard
            key={university.id}
            university={university}
            onUpdateStatus={onUpdateStatus}
            onDelete={onDelete}
            onSelectUniversity={onSelectUniversity}
            onUpdateField={onUpdateField}
          />
        ))}
      </div>
    </div>
  );
}

export default function Dashboard({ 
  universities, 
  onUpdateStatus, 
  onDelete, 
  onSelectUniversity,
  onUpdateField 
}) {
  const groupedUniversities = groupUniversitiesByCity(universities);
  const cities = Object.keys(groupedUniversities).sort();

  return (
    <>
      <div className="dashboard-header">
        <h2>🎓 UK Universities - Master's Programs</h2>
        <p className="subtitle">
          {universities.length} universities across {cities.length} cities - Click "Show All Details" on any card to see complete information
        </p>
      </div>

      {universities.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🏛️</div>
          <h3>No Universities Found</h3>
          <p>Loading university data...</p>
        </div>
      ) : (
        <div className="city-groups">
          {cities.map(city => (
            <UniversityGroup
              key={city}
              city={city}
              universities={groupedUniversities[city]}
              onUpdateStatus={onUpdateStatus}
              onDelete={onDelete}
              onSelectUniversity={onSelectUniversity}
              onUpdateField={onUpdateField}
            />
          ))}
        </div>
      )}
    </>
  );
}