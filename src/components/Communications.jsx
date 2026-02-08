import { useState } from 'react';

export default function Communications({ communications, onAdd, onDelete }) {
  const [newMessage, setNewMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onAdd(newMessage.trim());
      setNewMessage('');
    }
  };

  return (
    <div className="communications-section">
      <div className="section-header">
        <h2>💬 AIMS Education Communication Log</h2>
        <p className="subtitle">Track all conversations, questions, and updates</p>
      </div>

      <form onSubmit={handleSubmit} className="message-form">
        <textarea
          className="message-input"
          placeholder="Add a new communication log entry...&#10;&#10;Example:&#10;- Asked about IELTS deadline&#10;- Submitted transcript to AIMS&#10;- Received confirmation for Salford application"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          rows="4"
        />
        <button type="submit" className="btn btn-primary">
          ➕ Add Communication
        </button>
      </form>

      <div className="communications-list">
        {communications.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">💬</div>
            <h3>No communications logged yet</h3>
            <p>Add your first conversation with AIMS Education above</p>
          </div>
        ) : (
          communications.map(comm => (
            <div key={comm.id} className="communication-card">
              <div className="comm-header">
                <span className="comm-time">🕐 {comm.timestamp}</span>
                <button
                  className="btn btn-delete-small"
                  onClick={() => onDelete(comm.id)}
                  title="Delete this entry"
                >
                  🗑️
                </button>
              </div>
              <div className="comm-message">
                {comm.message}
              </div>
            </div>
          ))
        )}
      </div>

      {communications.length > 0 && (
        <div className="communications-footer">
          <p>📝 Total communications: <strong>{communications.length}</strong></p>
        </div>
      )}
    </div>
  );
}