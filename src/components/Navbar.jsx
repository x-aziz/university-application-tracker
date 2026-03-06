export default function Navbar({ activeTab, setActiveTab, auth, onLogout, hasFinalUniversity }) {
  const tabs = [
    { id: 'dashboard', label: '🏛️ Dashboard', icon: '📊' },
    { id: 'documents', label: '📄 Documents', icon: '✓' },
    { id: 'journey', label: '🗺️ Journey', icon: '🎯' },
    { id: 'communications', label: '💬 Communications', icon: '📝' },
    { id: 'profile', label: '👤 Profile', icon: '👤' }
  ];

  if (hasFinalUniversity) {
    tabs.splice(2, 0, { id: 'myuniversity', label: '🏛️ My University', icon: '⭐' });
  }

  const getInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  // Load profile photo from localStorage
  const profilePhoto = localStorage.getItem('university_tracker_photo');

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div>
          <h1>🎓 University Application Tracker</h1>
        </div>

        <div className="user-info">
          {auth && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              
              {/* Avatar — shows photo if uploaded, otherwise initials */}
              <div
                onClick={() => setActiveTab('profile')}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: profilePhoto 
                    ? 'transparent' 
                    : 'linear-gradient(135deg, var(--primary), var(--secondary))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: '700',
                  fontSize: '14px',
                  cursor: 'pointer',
                  border: '2px solid white',
                  boxShadow: 'var(--shadow-md)',
                  transition: 'transform 0.2s ease',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                title={auth.name}
              >
                {profilePhoto ? (
                  <img 
                    src={profilePhoto} 
                    alt={auth.name}
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      borderRadius: '50%'
                    }} 
                  />
                ) : (
                  getInitials(auth.name)
                )}
              </div>

              <button
                onClick={onLogout}
                className="btn"
                style={{
                  background: 'var(--danger)',
                  color: 'white',
                  padding: '8px 16px',
                  fontSize: '14px'
                }}
              >
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="navbar-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  );
}