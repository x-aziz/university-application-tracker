import { useState, useEffect } from 'react';
import { getAllAccessCodes, createAccessCode, toggleCodeStatus } from '../data/database';

export default function AdminPanel() {
  const [authenticated, setAuthenticated] = useState(false);
  const [codes, setCodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    studentName: '',
    program: '',
    code: '',
    autoGenerate: true,
    expiresAt: ''
  });
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    // Check if admin is already authenticated
    const adminAuth = sessionStorage.getItem('admin_authenticated');
    if (adminAuth === 'true') {
      setAuthenticated(true);
      loadCodes();
    } else {
      // Prompt for password
      const password = prompt('🔐 Enter Admin Password:');
      if (password === 'aims-admin-2026') {
        sessionStorage.setItem('admin_authenticated', 'true');
        setAuthenticated(true);
        loadCodes();
      } else {
        alert('❌ Invalid admin password');
        window.location.href = '/';
      }
    }
  }, []);

  const loadCodes = async () => {
    setLoading(true);
    const allCodes = await getAllAccessCodes();
    setCodes(allCodes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    setLoading(false);
  };

  const generateRandomCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let random = '';
    for (let i = 0; i < 5; i++) {
      random += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `AIMS-2026-${random}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });
    
    const codeToUse = formData.autoGenerate ? generateRandomCode() : formData.code;
    
    if (!codeToUse || !formData.studentName || !formData.program) {
      setMessage({ text: '❌ Please fill all required fields', type: 'error' });
      return;
    }

    setLoading(true);
    const result = await createAccessCode({
      code: codeToUse,
      studentName: formData.studentName,
      program: formData.program,
      expiresAt: formData.expiresAt || null
    });

    if (result.success) {
      setMessage({ text: `✅ Access code created: ${codeToUse}`, type: 'success' });
      setFormData({ studentName: '', program: '', code: '', autoGenerate: true, expiresAt: '' });
      loadCodes();
    } else {
      setMessage({ text: `❌ Error: ${result.error}`, type: 'error' });
    }
    
    setLoading(false);
  };

  const handleToggleStatus = async (codeId, currentStatus) => {
    const result = await toggleCodeStatus(codeId, currentStatus);
    if (result.success) {
      loadCodes();
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setMessage({ text: '📋 Copied to clipboard!', type: 'success' });
    setTimeout(() => setMessage({ text: '', type: '' }), 2000);
  };

  if (!authenticated) {
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
        🔐 Authenticating...
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: 'var(--radius-lg)',
          padding: '30px',
          marginBottom: '24px',
          boxShadow: 'var(--shadow-xl)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: '700', color: 'var(--gray-900)', marginBottom: '8px' }}>
                🔐 AIMS Education - Admin Panel
              </h1>
              <p style={{ fontSize: '14px', color: 'var(--gray-600)' }}>
                Manage student access codes and permissions
              </p>
            </div>
            <button
              onClick={() => {
                sessionStorage.removeItem('admin_authenticated');
                window.location.href = '/';
              }}
              className="btn"
              style={{
                background: 'var(--danger)',
                color: 'white',
                padding: '10px 20px'
              }}
            >
              🚪 Exit Admin
            </button>
          </div>
        </div>

        {/* Create Code Form */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: 'var(--radius-lg)',
          padding: '30px',
          marginBottom: '24px',
          boxShadow: 'var(--shadow-xl)'
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px', color: 'var(--gray-900)' }}>
            ➕ Generate New Access Code
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>
                  Student Name *
                </label>
                <input
                  type="text"
                  value={formData.studentName}
                  onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  placeholder="e.g., Said Abdelaziz"
                  required
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '2px solid var(--gray-200)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '14px'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>
                  Program *
                </label>
                <input
                  type="text"
                  value={formData.program}
                  onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                  placeholder="e.g., MSc Entrepreneurship"
                  required
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '2px solid var(--gray-200)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '14px'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>
                  <input
                    type="checkbox"
                    checked={formData.autoGenerate}
                    onChange={(e) => setFormData({ ...formData, autoGenerate: e.target.checked })}
                    style={{ marginRight: '8px' }}
                  />
                  Auto-generate Code
                </label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="AIMS-2026-XXXXX"
                  disabled={formData.autoGenerate}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '2px solid var(--gray-200)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '14px',
                    opacity: formData.autoGenerate ? 0.5 : 1
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>
                  Expiry Date (Optional)
                </label>
                <input
                  type="date"
                  value={formData.expiresAt}
                  onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '2px solid var(--gray-200)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '14px'
                  }}
                />
              </div>
            </div>

            {message.text && (
              <div style={{
                padding: '12px 16px',
                background: message.type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                border: `2px solid ${message.type === 'success' ? 'var(--success)' : 'var(--danger)'}`,
                borderRadius: 'var(--radius-sm)',
                color: message.type === 'success' ? 'var(--success)' : 'var(--danger)',
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '16px'
              }}>
                {message.text}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ opacity: loading ? 0.6 : 1 }}
            >
              {loading ? '⏳ Creating...' : '✅ Create Access Code'}
            </button>
          </form>
        </div>

        {/* Codes Table */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: 'var(--radius-lg)',
          padding: '30px',
          boxShadow: 'var(--shadow-xl)'
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px', color: 'var(--gray-900)' }}>
            📋 All Access Codes ({codes.length})
          </h2>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--gray-600)' }}>
              ⏳ Loading codes...
            </div>
          ) : codes.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--gray-600)' }}>
              No access codes created yet.
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--gray-200)' }}>
                    <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: '700', color: 'var(--gray-700)' }}>Student Name</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: '700', color: 'var(--gray-700)' }}>Access Code</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: '700', color: 'var(--gray-700)' }}>Program</th>
                    <th style={{ padding: '12px', textAlign: 'center', fontSize: '13px', fontWeight: '700', color: 'var(--gray-700)' }}>Status</th>
                    <th style={{ padding: '12px', textAlign: 'center', fontSize: '13px', fontWeight: '700', color: 'var(--gray-700)' }}>Created</th>
                    <th style={{ padding: '12px', textAlign: 'center', fontSize: '13px', fontWeight: '700', color: 'var(--gray-700)' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {codes.map((code) => (
                    <tr key={code.id} style={{ borderBottom: '1px solid var(--gray-100)' }}>
                      <td style={{ padding: '12px', fontSize: '14px', fontWeight: '600' }}>{code.studentName}</td>
                      <td style={{ padding: '12px', fontSize: '14px', fontFamily: 'monospace', color: 'var(--primary)' }}>
                        {code.code}
                      </td>
                      <td style={{ padding: '12px', fontSize: '14px' }}>{code.program}</td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        <span style={{
                          padding: '4px 12px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '600',
                          background: code.active ? 'var(--success)' : 'var(--danger)',
                          color: 'white'
                        }}>
                          {code.active ? '✓ Active' : '✗ Inactive'}
                        </span>
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center', fontSize: '13px', color: 'var(--gray-600)' }}>
                        {new Date(code.createdAt).toLocaleDateString()}
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                          <button
                            onClick={() => copyToClipboard(code.code)}
                            style={{
                              background: 'var(--info)',
                              color: 'white',
                              border: 'none',
                              padding: '6px 12px',
                              borderRadius: 'var(--radius-sm)',
                              cursor: 'pointer',
                              fontSize: '12px',
                              fontWeight: '600'
                            }}
                          >
                            📋 Copy
                          </button>
                          <button
                            onClick={() => handleToggleStatus(code.id, code.active)}
                            style={{
                              background: code.active ? 'var(--warning)' : 'var(--success)',
                              color: 'white',
                              border: 'none',
                              padding: '6px 12px',
                              borderRadius: 'var(--radius-sm)',
                              cursor: 'pointer',
                              fontSize: '12px',
                              fontWeight: '600'
                            }}
                          >
                            {code.active ? '⏸️ Suspend' : '▶️ Activate'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}