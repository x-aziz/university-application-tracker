import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import StatsBar from './components/StatsBar'
import Dashboard from './components/Dashboard'
import Documents from './components/Documents'
import Communications from './components/Communications'
import Journey from './components/Journey'
import Profile from './components/Profile'
import MyUniversity from './components/MyUniversity'
import AccessGate from './components/Accessgate'
import AdminPanel from './components/AdminPanel'
import {
  loadUniversities,
  loadCommunications,
  loadJourneyData,
  loadFinalUniversityId,
  saveUniversities,
  saveCommunications,
  saveFinalUniversity,
  subscribeToUniversities,
  DOCUMENT_TYPES
} from './data/database';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [authData, setAuthData] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [universities, setUniversities] = useState([]);
  const [communications, setCommunications] = useState([]);
  const [journeyData, setJourneyData] = useState(null);
  const [finalUniversityId, setFinalUniversityId] = useState(null);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [showAddUniversity, setShowAddUniversity] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for admin panel access
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === 'aims2026') {
      setIsAdmin(true);
      setLoading(false);
      return;
    }

    // Check for existing auth
    const savedAuth = localStorage.getItem('university_tracker_auth');
    if (savedAuth) {
      try {
        const parsed = JSON.parse(savedAuth);
        if (parsed.accessGranted) {
          setAuthData(parsed);
          setAuthenticated(true);
          initializeData();
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.error('Error parsing auth:', err);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const initializeData = async () => {
    let unsubscribe;

    const universitiesData = await loadUniversities();
    const communicationsData = await loadCommunications();
    const journeyDataLoaded = await loadJourneyData();
    const finalUniId = await loadFinalUniversityId();

    setUniversities(universitiesData);
    setCommunications(communicationsData);
    setJourneyData(journeyDataLoaded);
    setFinalUniversityId(finalUniId);
    setLoading(false);

    unsubscribe = subscribeToUniversities((updatedUniversities) => {
      console.log('🔄 Real-time update received!');
      setUniversities(updatedUniversities);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  };

  const handleAuthSuccess = (auth) => {
    setAuthData(auth);
    setAuthenticated(true);
    setLoading(true);
    initializeData();
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('university_tracker_auth');
      localStorage.removeItem('university_tracker_display_name');
      setAuthenticated(false);
      setAuthData(null);
      setUniversities([]);
      setCommunications([]);
      setJourneyData(null);
    }
  };

  // Update selectedUniversity when universities array changes
  useEffect(() => {
    if (selectedUniversity) {
      const updated = universities.find(u => u.id === selectedUniversity.id);
      if (updated) {
        setSelectedUniversity(updated);
      }
    }
  }, [universities]);

  // University Handlers
  const updateUniversityStatus = (id, newStatus) => {
    const updated = universities.map(uni =>
      uni.id === id ? { ...uni, status: newStatus } : uni
    );
    setUniversities(updated);
    saveUniversities(updated);
  };

  const deleteUniversity = (id) => {
    const updated = universities.filter(uni => uni.id !== id);
    setUniversities(updated);
    saveUniversities(updated);
  };

  const updateUniversityField = (id, field, value) => {
    const updated = universities.map(uni =>
      uni.id === id ? { ...uni, [field]: value } : uni
    );
    setUniversities(updated);
    saveUniversities(updated);
  };

  const handleSelectUniversity = (university) => {
    setSelectedUniversity(university);
    setActiveTab('documents');
  };

  const addUniversity = (newUniData) => {
    const newId = Math.max(...universities.map(u => u.id), 0) + 1;
    const newUniversity = {
      id: newId,
      name: newUniData.name,
      city: newUniData.city,
      specialty: newUniData.specialty,
      fees: newUniData.fees,
      ielts: newUniData.ielts || '6.0',
      duolingo: newUniData.duolingo || '105',
      intake: newUniData.intake || 'September 2026',
      deadline: newUniData.deadline || 'Rolling admissions',
      depositAmount: newUniData.depositAmount || '£5,500',
      link: newUniData.link || '',
      status: 'not-applied',
      documents: DOCUMENT_TYPES.map(doc => ({
        id: doc.id,
        completed: false,
        uploadedDate: null,
        notes: ""
      })),
      notes: "",
      casReceived: false,
      depositPaid: false,
      visaApplied: false
    };
    
    const updated = [...universities, newUniversity];
    setUniversities(updated);
    saveUniversities(updated);
    setShowAddUniversity(false);
  };

  // Set Final University Handler
  const handleSetFinalUniversity = async (universityId) => {
    if (confirm('Set this as your final chosen university? This will create a dedicated page for tracking your progress.')) {
      await saveFinalUniversity(universityId);
      setFinalUniversityId(universityId);
      setActiveTab('myuniversity');
    }
  };

  const toggleDocument = (universityId, docId) => {
    const updated = universities.map(uni => {
      if (uni.id === universityId) {
        const updatedDocs = uni.documents.map(doc =>
          doc.id === docId ? {
            ...doc,
            completed: !doc.completed,
            uploadedDate: !doc.completed ? new Date().toISOString() : null
          } : doc
        );
        return { ...uni, documents: updatedDocs };
      }
      return uni;
    });
    setUniversities(updated);
    saveUniversities(updated);
  };

  const updateDocumentNotes = (universityId, docId, notes) => {
    const updated = universities.map(uni => {
      if (uni.id === universityId) {
        const updatedDocs = uni.documents.map(doc =>
          doc.id === docId ? { ...doc, notes } : doc
        );
        return { ...uni, documents: updatedDocs };
      }
      return uni;
    });
    setUniversities(updated);
    saveUniversities(updated);
  };

  const addCommunication = (message) => {
    const newComm = {
      id: Date.now(),
      message,
      timestamp: new Date().toLocaleString()
    };
    const updated = [newComm, ...communications];
    setCommunications(updated);
    saveCommunications(updated);
  };

  const deleteCommunication = (id) => {
    const updated = communications.filter(comm => comm.id !== id);
    setCommunications(updated);
    saveCommunications(updated);
  };

  // Admin Panel
  if (isAdmin) {
    return <AdminPanel />;
  }

  // Loading
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        fontSize: '24px',
        fontWeight: '700'
      }}>
        🔄 Loading...
      </div>
    );
  }

  // Access Gate
  if (!authenticated) {
    return <AccessGate onSuccess={handleAuthSuccess} />;
  }

  // Main App
  return (
    <div className="app">
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        auth={authData}
        onLogout={handleLogout}
        hasFinalUniversity={finalUniversityId !== null}
      />
      
      <div className="container">
        <StatsBar universities={universities} journeyData={journeyData} />

        {activeTab === 'dashboard' && (
          <>
            <div style={{ marginBottom: '20px', textAlign: 'right' }}>
              <button
                onClick={() => setShowAddUniversity(true)}
                className="btn"
                style={{
                  background: 'var(--success)',
                  color: 'white',
                  padding: '12px 24px',
                  fontSize: '15px'
                }}
              >
                ➕ Add University
              </button>
            </div>

            {showAddUniversity && (
              <AddUniversityForm
                onAdd={addUniversity}
                onCancel={() => setShowAddUniversity(false)}
              />
            )}

            <Dashboard
              universities={universities}
              onUpdateStatus={updateUniversityStatus}
              onDelete={deleteUniversity}
              onSelectUniversity={handleSelectUniversity}
              onUpdateField={updateUniversityField}
              onSetFinalUniversity={handleSetFinalUniversity}
            />
          </>
        )}

        {activeTab === 'documents' && (
          <Documents
            universities={universities}
            selectedUniversity={selectedUniversity}
            onSelectUniversity={setSelectedUniversity}
            onToggleDocument={toggleDocument}
            onUpdateNotes={updateDocumentNotes}
          />
        )}

        {activeTab === 'journey' && (
          <Journey />
        )}

        {activeTab === 'myuniversity' && (
          <MyUniversity 
            university={universities.find(u => u.id === finalUniversityId)}
            journeyData={journeyData}
          />
        )}

        {activeTab === 'communications' && (
          <Communications
            communications={communications}
            onAdd={addCommunication}
            onDelete={deleteCommunication}
          />
        )}

        {activeTab === 'profile' && (
          <Profile 
            auth={authData}
            universities={universities}
            journeyData={journeyData}
          />
        )}
      </div>

      <footer className="footer">
        {/* <p>Built by <strong>Said Abdelaziz</strong> - <i>Creative Web Developer</i> </p> */}
        <p>Built by <strong>Said Abdelaziz</strong> for AIMS Education</p>
      </footer>
    </div>
  );
}

function AddUniversityForm({ onAdd, onCancel }) {
  const [formData, setFormData] = useState({
    name: '', city: '', specialty: '', fees: '',
    ielts: '6.0', duolingo: '105', intake: 'September 2026',
    deadline: 'Rolling admissions', depositAmount: '', link: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.city && formData.specialty && formData.fees) {
      onAdd(formData);
    } else {
      alert('Please fill in all required fields');
    }
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
      <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '30px', maxWidth: '600px', width: '100%', maxHeight: '90vh', overflow: 'auto', boxShadow: 'var(--shadow-xl)' }}>
        <h2>➕ Add New University</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
          <input type="text" placeholder="University Name *" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required style={{ padding: '10px', border: '2px solid var(--gray-200)', borderRadius: 'var(--radius-sm)', fontSize: '14px' }} />
          <input type="text" placeholder="City *" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} required style={{ padding: '10px', border: '2px solid var(--gray-200)', borderRadius: 'var(--radius-sm)', fontSize: '14px' }} />
          <input type="text" placeholder="Program *" value={formData.specialty} onChange={(e) => setFormData({...formData, specialty: e.target.value})} required style={{ padding: '10px', border: '2px solid var(--gray-200)', borderRadius: 'var(--radius-sm)', fontSize: '14px' }} />
          <input type="text" placeholder="Fees *" value={formData.fees} onChange={(e) => setFormData({...formData, fees: e.target.value})} required style={{ padding: '10px', border: '2px solid var(--gray-200)', borderRadius: 'var(--radius-sm)', fontSize: '14px' }} />
          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>✓ Add</button>
            <button type="button" onClick={onCancel} className="btn" style={{ flex: 1, background: 'var(--gray-200)', color: 'var(--gray-700)' }}>✗ Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;