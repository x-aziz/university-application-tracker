export default function Navbar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'dashboard', label: '🏛️ Dashboard', icon: '📊' },
    { id: 'documents', label: '📄 Documents', icon: '✓' },
    { id: 'communications', label: '💬 Communications', icon: '📝' }
  ];

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>🎓 University Application Tracker</h1>
        <p>AIMS Education Partnership</p>
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