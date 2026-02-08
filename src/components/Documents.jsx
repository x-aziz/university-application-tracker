import { useState } from 'react';
import { DOCUMENT_TYPES, calculateDocumentProgress } from '../data/database';

export default function Documents({ 
  universities, 
  selectedUniversity, 
  onSelectUniversity, 
  onToggleDocument,
  onUpdateNotes 
}) {
  const [showNotes, setShowNotes] = useState({});

  const handleUniversitySelect = (uniId) => {
    const selected = universities.find(u => u.id === uniId);
    onSelectUniversity(selected);
  };

  const toggleNotes = (docId) => {
    setShowNotes(prev => ({ ...prev, [docId]: !prev[docId] }));
  };

  const handleDocumentClick = (docId) => {
    console.log('Toggling document:', docId, 'for university:', selectedUniversity?.id);
    onToggleDocument(selectedUniversity.id, docId);
  };

  return (
    <div className="documents-section">
      <div className="section-header">
        <h2>📄 Required Documents Checklist</h2>
        <p className="subtitle">Track all documents needed for your applications</p>
      </div>

      {/* University Selector */}
      <div className="university-selector" style={{ 
        marginBottom: '24px',
        background: 'white',
        padding: '20px',
        borderRadius: 'var(--radius)',
        boxShadow: 'var(--shadow-md)'
      }}>
        <label style={{ 
          display: 'block', 
          marginBottom: '12px',
          fontSize: '15px',
          fontWeight: '600',
          color: 'var(--gray-900)'
        }}>
          🏛️ Select University:
        </label>
        <select
          value={selectedUniversity?.id || ''}
          onChange={(e) => handleUniversitySelect(Number(e.target.value))}
          style={{
            width: '100%',
            padding: '12px 16px',
            fontSize: '15px',
            border: '2px solid var(--gray-200)',
            borderRadius: 'var(--radius-sm)',
            cursor: 'pointer',
            background: 'white'
          }}
        >
          <option value="">-- Select a University --</option>
          {universities.map(uni => (
            <option key={uni.id} value={uni.id}>
              {uni.name} - {uni.specialty}
            </option>
          ))}
        </select>
      </div>

      {!selectedUniversity ? (
        <div className="empty-state">
          <div className="empty-icon">🏛️</div>
          <h3>Select a University</h3>
          <p>Choose a university above to track its document requirements</p>
        </div>
      ) : (
        <>
          {/* Progress Card */}
          <div className="progress-card">
            <div className="progress-header">
              <span className="progress-label">
                📊 {selectedUniversity.name} - Document Progress
              </span>
              <span className="progress-value">
                {selectedUniversity.documents.filter(d => d.completed).length} / {selectedUniversity.documents.length} completed
              </span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${calculateDocumentProgress(selectedUniversity)}%` }}
              />
            </div>
            <div className="progress-percentage">
              {calculateDocumentProgress(selectedUniversity)}%
            </div>
          </div>

          {/* Documents List */}
          <div className="documents-list">
            {DOCUMENT_TYPES.map(docType => {
              const docStatus = selectedUniversity.documents?.find(d => d.id === docType.id);
              const isCompleted = docStatus?.completed || false;
              const notes = docStatus?.notes || '';

              return (
                <div key={docType.id}>
                  <div className={`document-item ${isCompleted ? 'completed' : ''}`}>
                    {/* Checkbox - clickable */}
                    <div 
                      className="document-checkbox"
                      onClick={() => handleDocumentClick(docType.id)}
                    >
                      {isCompleted ? '✓' : '○'}
                    </div>
                    
                    {/* Document Info - clickable */}
                    <div 
                      style={{ flex: 1, cursor: 'pointer' }}
                      onClick={() => handleDocumentClick(docType.id)}
                    >
                      <div 
                        style={{
                          fontSize: '15px',
                          fontWeight: '500',
                          textDecoration: isCompleted ? 'line-through' : 'none',
                          color: isCompleted ? 'var(--gray-600)' : 'var(--gray-900)'
                        }}
                      >
                        {docType.name}
                        {!docType.required && (
                          <span style={{ 
                            marginLeft: '8px', 
                            fontSize: '12px', 
                            color: 'var(--gray-500)',
                            fontWeight: 'normal',
                            textDecoration: 'none'
                          }}>
                            (Optional)
                          </span>
                        )}
                      </div>
                      <div style={{ 
                        fontSize: '13px', 
                        color: 'var(--gray-600)',
                        marginTop: '4px'
                      }}>
                        {docType.description}
                      </div>
                    </div>
                    
                    {/* Notes button - NOT clickable for toggle */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleNotes(docType.id);
                      }}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '20px',
                        padding: '4px 8px',
                        flexShrink: 0
                      }}
                      title="Add notes"
                    >
                      📝
                    </button>
                    
                    {/* Status indicator */}
                    <div className="document-status">
                      {isCompleted ? (
                        <span className="status-ready">Ready ✓</span>
                      ) : (
                        <span className="status-pending">Pending</span>
                      )}
                    </div>
                  </div>

                  {/* Notes Section */}
                  {showNotes[docType.id] && (
                    <div style={{
                      marginTop: '8px',
                      marginLeft: '44px',
                      marginBottom: '12px'
                    }}>
                      <textarea
                        value={notes}
                        onChange={(e) => onUpdateNotes(selectedUniversity.id, docType.id, e.target.value)}
                        placeholder="Add notes about this document..."
                        onClick={(e) => e.stopPropagation()}
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
                  )}
                </div>
              );
            })}
          </div>

          <div className="documents-footer">
            <p>💡 <strong>Tip:</strong> Click any document to mark it as completed or pending. Use 📝 to add notes.</p>
          </div>
        </>
      )}
    </div>
  );
}