import { useState } from 'react';
import { validateAccessCode } from '../data/database';

export default function AccessGate({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    code: ''
  });
  const [showCode, setShowCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await validateAccessCode(formData.code);
      
      if (!result.valid) {
        setError('❌ Invalid access code. Please contact AIMS Education.');
        setLoading(false);
        return;
      }

      if (!result.active) {
        setError('⛔ Your access has been suspended. Contact AIMS Education.');
        setLoading(false);
        return;
      }

      // Save to localStorage
      const authData = {
        name: formData.name,
        code: formData.code,
        program: result.program,
        studentName: result.studentName,
        accessGranted: true,
        grantedAt: new Date().toISOString()
      };

      localStorage.setItem('university_tracker_auth', JSON.stringify(authData));
      
      // Call success callback
      onSuccess(authData);
    } catch (err) {
      console.error('Authentication error:', err);
      setError('❌ An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '20px'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: 'var(--radius-lg)',
        padding: '40px',
        maxWidth: '500px',
        width: '100%',
        boxShadow: 'var(--shadow-xl)',
        border: '1px solid rgba(255, 255, 255, 0.5)'
      }}>
        {/* Logo & Title */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: '700',
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '8px'
          }}>
            🎓 University Application Tracker
          </h1>
          <p style={{
            fontSize: '14px',
            color: 'var(--gray-600)',
            fontWeight: '500'
          }}>
            Powered by AIMS Education
          </p>
        </div>

        {/* Welcome Message */}
        <div style={{
          background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
          padding: '20px',
          borderRadius: 'var(--radius)',
          color: 'white',
          marginBottom: '32px',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
            👋 Welcome! Please enter your details to access your personal tracker.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Full Name */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: '600',
                color: 'var(--gray-900)'
              }}>
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your full name"
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid var(--gray-200)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '15px',
                  transition: 'all 0.2s ease'
                }}
              />
            </div>

            {/* Access Code */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: '600',
                color: 'var(--gray-900)'
              }}>
                Access Code
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showCode ? 'text' : 'password'}
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="Enter your access code"
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    paddingRight: '50px',
                    border: '2px solid var(--gray-200)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '15px',
                    transition: 'all 0.2s ease'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowCode(!showCode)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '18px',
                    padding: '4px'
                  }}
                >
                  {showCode ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div style={{
                padding: '12px 16px',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '2px solid var(--danger)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--danger)',
                fontSize: '14px',
                fontWeight: '600'
              }}>
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{
                marginTop: '8px',
                fontSize: '16px',
                opacity: loading ? 0.6 : 1,
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? '🔄 Verifying...' : '🔓 Access My Tracker'}
            </button>
          </div>
        </form>

        {/* Help Text */}
        <div style={{
          marginTop: '24px',
          padding: '16px',
          background: 'var(--gray-50)',
          borderRadius: 'var(--radius-sm)',
          textAlign: 'center',
          fontSize: '13px',
          color: 'var(--gray-600)'
        }}>
          Don't have a code? <strong style={{ color: 'var(--primary)' }}>Contact AIMS Education</strong> to get started.
        </div>
      </div>
    </div>
  );
}