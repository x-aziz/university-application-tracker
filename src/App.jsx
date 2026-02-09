import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import StatsBar from './components/StatsBar'
import Dashboard from './components/Dashboard'
import Documents from './components/Documents'
import Communications from './components/Communications'
import {
  loadUniversities,
  loadCommunications,
  saveUniversities,
  saveCommunications,
  subscribeToUniversities,
  DOCUMENT_TYPES  // ✅ ADD THIS
} from './data/database';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [universities, setUniversities] = useState([]);
  const [communications, setCommunications] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [showAddUniversity, setShowAddUniversity] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  let unsubscribe;

  const initializeData = async () => {
    const universitiesData = await loadUniversities();
    const communicationsData = await loadCommunications();

    setUniversities(universitiesData);
    setCommunications(communicationsData);
    setLoading(false);

    unsubscribe = subscribeToUniversities((updatedUniversities) => {
      console.log('🔄 Real-time update received!');
      setUniversities(updatedUniversities);
    });
  };

  initializeData();

  return () => {
    if (unsubscribe) unsubscribe();
  };
}, []);
  

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

  // Add new university
 
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
    documents: DOCUMENT_TYPES.map(doc => ({  // ✅ FIXED
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

  // Document Handlers
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

  // Communications Handlers
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
      🔄 Loading your universities...
    </div>
  );
}

  return (
    <div className="app">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="container">
        <StatsBar universities={universities} />

        {activeTab === 'dashboard' && (
          <>
            {/* Add University Button */}
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

            {/* Add University Form Modal */}
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

        {activeTab === 'communications' && (
          <Communications
            communications={communications}
            onAdd={addCommunication}
            onDelete={deleteCommunication}
          />
        )}
      </div>

      <footer className="footer">
        <p>Built by <strong>Said Abdelaziz</strong> for AIMS Education</p>
      </footer>
    </div>
  );
}

// Add University Form Component
function AddUniversityForm({ onAdd, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    specialty: '',
    fees: '',
    ielts: '6.0',
    duolingo: '105',
    intake: 'September 2026',
    deadline: 'Rolling admissions',
    depositAmount: '',
    link: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.city && formData.specialty && formData.fees) {
      onAdd(formData);
    } else {
      alert('Please fill in all required fields (Name, City, Program, Fees)');
    }
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: 'var(--radius-lg)',
        padding: '30px',
        maxWidth: '600px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto',
        boxShadow: 'var(--shadow-xl)'
      }}>
        <h2 style={{ marginBottom: '24px', fontSize: '24px', fontWeight: '700' }}>
          ➕ Add New University
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* University Name */}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px' }}>
                University Name <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="e.g., University of Manchester"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid var(--gray-200)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '15px'
                }}
                required
              />
            </div>

            {/* City */}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px' }}>
                City <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => handleChange('city', e.target.value)}
                placeholder="e.g., Manchester"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid var(--gray-200)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '15px'
                }}
                required
              />
            </div>

            {/* Program/Specialty */}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px' }}>
                Program/Specialty <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="text"
                value={formData.specialty}
                onChange={(e) => handleChange('specialty', e.target.value)}
                placeholder="e.g., MSc Entrepreneurship & Innovation"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid var(--gray-200)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '15px'
                }}
                required
              />
            </div>

            {/* Fees */}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px' }}>
                Tuition Fees <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="text"
                value={formData.fees}
                onChange={(e) => handleChange('fees', e.target.value)}
                placeholder="e.g., £16,980"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid var(--gray-200)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '15px'
                }}
                required
              />
            </div>

            {/* Two columns for IELTS and Duolingo */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px' }}>
                  IELTS Score
                </label>
                <input
                  type="text"
                  value={formData.ielts}
                  onChange={(e) => handleChange('ielts', e.target.value)}
                  placeholder="6.0"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid var(--gray-200)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '15px'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px' }}>
                  Duolingo Score
                </label>
                <input
                  type="text"
                  value={formData.duolingo}
                  onChange={(e) => handleChange('duolingo', e.target.value)}
                  placeholder="105"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid var(--gray-200)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '15px'
                  }}
                />
              </div>
            </div>

            {/* Intake */}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px' }}>
                Intake
              </label>
              <input
                type="text"
                value={formData.intake}
                onChange={(e) => handleChange('intake', e.target.value)}
                placeholder="September 2026 / January 2027"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid var(--gray-200)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '15px'
                }}
              />
            </div>

            {/* Deadline */}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px' }}>
                Application Deadline
              </label>
              <input
                type="text"
                value={formData.deadline}
                onChange={(e) => handleChange('deadline', e.target.value)}
                placeholder="31 July 2026 or Rolling admissions"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid var(--gray-200)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '15px'
                }}
              />
            </div>

            {/* Deposit Amount */}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px' }}>
                Deposit Amount
              </label>
              <input
                type="text"
                value={formData.depositAmount}
                onChange={(e) => handleChange('depositAmount', e.target.value)}
                placeholder="e.g., £3,000"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid var(--gray-200)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '15px'
                }}
              />
            </div>

            {/* Course Link */}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px' }}>
                Course Website URL
              </label>
              <input
                type="url"
                value={formData.link}
                onChange={(e) => handleChange('link', e.target.value)}
                placeholder="https://university.ac.uk/course"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid var(--gray-200)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '15px'
                }}
              />
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ flex: 1 }}
              >
                ✓ Add University
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="btn"
                style={{
                  flex: 1,
                  background: 'var(--gray-200)',
                  color: 'var(--gray-700)'
                }}
              >
                ✗ Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;