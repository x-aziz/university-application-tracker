import { useState, useEffect } from 'react';
import { calculateOverallProgress, calculateJourneyProgress } from '../data/database';

const MOTIVATIONAL_QUOTES = [
  "Your future is created by what you do today, not tomorrow.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "Education is the most powerful weapon which you can use to change the world.",
  "The beautiful thing about learning is that no one can take it away from you.",
  "Believe you can and you're halfway there.",
  "Dream big, work hard, stay focused, and surround yourself with good people.",
  "The expert in anything was once a beginner.",
  "Your only limit is you.",
  "Great things never come from comfort zones.",
  "The future belongs to those who believe in the beauty of their dreams."
];

export default function Profile({ auth, universities, journeyData }) {
  const [displayName, setDisplayName] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState('');

  useEffect(() => {
    // Load saved display name from localStorage
    const saved = localStorage.getItem('university_tracker_display_name');
    if (saved) {
      setDisplayName(saved);
    } else {
      // Use first name as default
      const firstName = auth.name.split(' ')[0];
      setDisplayName(firstName);
    }
  }, [auth.name]);

  const saveDisplayName = () => {
    if (tempName.trim()) {
      setDisplayName(tempName.trim());
      localStorage.setItem('university_tracker_display_name', tempName.trim());
      setIsEditingName(false);
    }
  };

  // Get initials
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Calculate stats
  const totalUniversities = universities.length;
  const acceptedCount = universities.filter(u => u.status === 'accepted').length;
  const documentProgress = calculateOverallProgress(universities);
  const journeyProgress = journeyData ? calculateJourneyProgress(journeyData) : 0;

  // Calculate days
  const studyStartDate = new Date('2026-09-15');
  const joinedDate = new Date(auth.grantedAt);
  const today = new Date();
  const daysUntilStudy = Math.ceil((studyStartDate - today) / (1000 * 60 * 60 * 24));
  const daysSinceJoining = Math.ceil((today - joinedDate) / (1000 * 60 * 60 * 24));

  // Get daily quote
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  const dailyQuote = MOTIVATIONAL_QUOTES[dayOfYear % MOTIVATIONAL_QUOTES.length];

  // Mask code
  const maskedCode = auth.code.substring(0, 6) + '••••••';

  return (
    <div className="documents-section">
      <div className="section-header">
        <h2>👤 My Profile</h2>
        <p className="subtitle">Your personal information and application progress</p>
      </div>

      {/* Profile Card */}
      <div style={{
        background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
        borderRadius: 'var(--radius-lg)',
        padding: '40px',
        marginBottom: '24px',
        color: 'white',
        textAlign: 'center',
        boxShadow: 'var(--shadow-xl)'
      }}>
        {/* Avatar with upload */}
<div style={{ position: 'relative', width: '120px', margin: '0 auto 24px' }}>
  <div style={{
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '48px',
    fontWeight: '700',
    color: 'white',
    border: '4px solid white',
    boxShadow: 'var(--shadow-lg)',
    overflow: 'hidden'
  }}>
    {localStorage.getItem('university_tracker_photo') ? (
      <img 
        src={localStorage.getItem('university_tracker_photo')} 
        alt={auth.name}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
      />
    ) : (
      getInitials(auth.name)
    )}
  </div>

  {/* Upload button overlay */}
  <label style={{
    position: 'absolute',
    bottom: '0',
    right: '0',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: 'var(--shadow-md)',
    fontSize: '16px'
  }}>
    📷
    <input
      type="file"
      accept="image/*"
      style={{ display: 'none' }}
      onChange={(e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            localStorage.setItem('university_tracker_photo', event.target.result);
            window.location.reload(); // refresh to show new photo
          };
          reader.readAsDataURL(file);
        }
      }}
    />
  </label>
</div>

        {/* Name & Display Name */}
        <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>
          {auth.name}
        </h1>
        
        {!isEditingName ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>
            <p style={{ fontSize: '18px', opacity: 0.9 }}>
              "{displayName}"
            </p>
            <button
              onClick={() => {
                setTempName(displayName);
                setIsEditingName(true);
              }}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                color: 'white',
                padding: '4px 12px',
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: '600'
              }}
            >
              ✏️ Edit
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              placeholder="Display name"
              style={{
                padding: '8px 12px',
                border: '2px solid white',
                borderRadius: 'var(--radius-sm)',
                fontSize: '14px',
                background: 'rgba(255,255,255,0.2)',
                color: 'white'
              }}
            />
            <button
              onClick={saveDisplayName}
              style={{
                background: 'white',
                border: 'none',
                color: 'var(--primary)',
                padding: '8px 16px',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              ✓ Save
            </button>
            <button
              onClick={() => setIsEditingName(false)}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                color: 'white',
                padding: '8px 16px',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              ✗
            </button>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '24px' }}>
          <div style={{ background: 'rgba(255,255,255,0.2)', padding: '16px', borderRadius: 'var(--radius)' }}>
            <div style={{ fontSize: '13px', opacity: 0.9, marginBottom: '4px' }}>Access Code</div>
            <div style={{ fontSize: '18px', fontWeight: '700', fontFamily: 'monospace' }}>{maskedCode}</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.2)', padding: '16px', borderRadius: 'var(--radius)' }}>
            <div style={{ fontSize: '13px', opacity: 0.9, marginBottom: '4px' }}>Program</div>
            <div style={{ fontSize: '18px', fontWeight: '700' }}>{auth.program}</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.2)', padding: '16px', borderRadius: 'var(--radius)' }}>
            <div style={{ fontSize: '13px', opacity: 0.9, marginBottom: '4px' }}>Member Since</div>
            {/* <div style={{ fontSize: '18px', fontWeight: '700' }}>{new Date(auth.grantedAt).toLocaleDateString()}</div> */}
            <div style={{ fontSize: '18px', fontWeight: '700' }}>25/03/2024</div>
          </div>
        </div>
      </div>

      {/* Application Summary */}
      <div style={{
        background: 'white',
        borderRadius: 'var(--radius)',
        padding: '24px',
        marginBottom: '24px',
        boxShadow: 'var(--shadow-md)'
      }}>
        <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px', color: 'var(--gray-900)' }}>
          📊 Application Summary
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
          <div style={{ textAlign: 'center', padding: '16px', background: 'var(--gray-50)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontSize: '36px', fontWeight: '700', color: 'var(--info)' }}>{totalUniversities}</div>
            <div style={{ fontSize: '13px', color: 'var(--gray-600)', marginTop: '4px' }}>Total Universities</div>
          </div>
          <div style={{ textAlign: 'center', padding: '16px', background: 'var(--gray-50)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontSize: '36px', fontWeight: '700', color: 'var(--success)' }}>{acceptedCount}</div>
            <div style={{ fontSize: '13px', color: 'var(--gray-600)', marginTop: '4px' }}>Accepted</div>
          </div>
          <div style={{ textAlign: 'center', padding: '16px', background: 'var(--gray-50)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontSize: '36px', fontWeight: '700', color: 'var(--primary)' }}>{documentProgress}%</div>
            <div style={{ fontSize: '13px', color: 'var(--gray-600)', marginTop: '4px' }}>Documents Complete</div>
          </div>
          <div style={{ textAlign: 'center', padding: '16px', background: 'var(--gray-50)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontSize: '36px', fontWeight: '700', color: 'var(--secondary)' }}>{journeyProgress}%</div>
            <div style={{ fontSize: '13px', color: 'var(--gray-600)', marginTop: '4px' }}>Journey Progress</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div style={{
        background: 'white',
        borderRadius: 'var(--radius)',
        padding: '24px',
        marginBottom: '24px',
        boxShadow: 'var(--shadow-md)'
      }}>
        <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px', color: 'var(--gray-900)' }}>
          ⏰ Quick Stats
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <div style={{ padding: '20px', background: 'linear-gradient(135deg, var(--info), #2563eb)', borderRadius: 'var(--radius)', color: 'white' }}>
            <div style={{ fontSize: '48px', fontWeight: '700', marginBottom: '8px' }}>{daysUntilStudy}</div>
            <div style={{ fontSize: '14px', opacity: 0.9 }}>Days until September 15 (Study Start)</div>
          </div>
          <div style={{ padding: '20px', background: 'linear-gradient(135deg, var(--success), #059669)', borderRadius: 'var(--radius)', color: 'white' }}>
            <div style={{ fontSize: '48px', fontWeight: '700', marginBottom: '8px' }}>{daysSinceJoining}</div>
            <div style={{ fontSize: '14px', opacity: 0.9 }}>Days since joining platform</div>
          </div>
        </div>
      </div>

      {/* Daily Motivation */}
      <div style={{
        background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
        borderRadius: 'var(--radius)',
        padding: '24px',
        color: 'white',
        textAlign: 'center',
        boxShadow: 'var(--shadow-md)'
      }}>
        <div style={{ fontSize: '36px', marginBottom: '16px' }}>💡</div>
        <p style={{ fontSize: '18px', fontStyle: 'italic', lineHeight: '1.6', fontWeight: '500' }}>
          "{dailyQuote}"
        </p>
        <p style={{ fontSize: '13px', marginTop: '12px', opacity: 0.9 }}>
          Your Daily Motivation
        </p>
      </div>
    </div>
  );
}