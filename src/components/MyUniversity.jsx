import { useState } from 'react';
import { calculateDocumentProgress, calculateJourneyProgress } from '../data/database';

export default function MyUniversity({ university, journeyData }) {
  if (!university) {
    return (
      <div className="documents-section">
        <div className="empty-state">
          <div className="empty-icon">🏛️</div>
          <h3>No Final University Selected</h3>
          <p>Go to Dashboard and click "⭐ Set as Final Choice" on your accepted university</p>
        </div>
      </div>
    );
  }

  const docProgress = calculateDocumentProgress(university);
  const completedDocs = university.documents?.filter(d => d.completed).length || 0;
  const totalDocs = university.documents?.length || 0;

  // Calculate financial progress
  const financialProgress = journeyData?.financial 
    ? Math.round((journeyData.financial.filter(item => item.status === 'done').length / journeyData.financial.length) * 100)
    : 0;

  // Calculate roadmap progress for university-related steps
  const roadmapProgress = journeyData?.roadmap
    ? Math.round((journeyData.roadmap.filter(item => item.completed).length / journeyData.roadmap.length) * 100)
    : 0;

  // Calculate IELTS progress
  const ieltsProgress = journeyData?.ielts
    ? Math.round(
        (journeyData.ielts.weeks.reduce((sum, week) => 
          sum + week.days.filter(day => day.completed).length, 0
        ) / journeyData.ielts.weeks.reduce((sum, week) => sum + week.days.length, 0)) * 100
      )
    : 0;

  const ProgressBar = ({ progress, label }) => (
    <div style={{ marginBottom: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '13px' }}>
        <span style={{ fontWeight: '600', color: 'var(--gray-700)' }}>{label}</span>
        <span style={{ fontWeight: '700', color: 'var(--primary)' }}>{progress}%</span>
      </div>
      <div style={{
        width: '100%',
        height: '8px',
        background: 'var(--gray-200)',
        borderRadius: '4px',
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${progress}%`,
          height: '100%',
          background: progress === 100 ? 'var(--success)' : 'var(--primary)',
          transition: 'width 0.3s ease'
        }} />
      </div>
    </div>
  );

  const StatusIndicator = ({ completed, label }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: completed ? 'rgba(16, 185, 129, 0.05)' : 'var(--gray-50)', borderRadius: 'var(--radius-sm)' }}>
      <div style={{
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        background: completed ? 'var(--success)' : 'var(--gray-300)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12px',
        fontWeight: '700'
      }}>
        {completed ? '✓' : '○'}
      </div>
      <span style={{ fontSize: '15px', fontWeight: completed ? '600' : '400', color: completed ? 'var(--success)' : 'var(--gray-600)' }}>
        {label}
      </span>
    </div>
  );

  return (
    <div className="documents-section">
      <div className="section-header">
        <h2>🏛️ My University - Final Choice</h2>
        <p className="subtitle">Complete overview of your chosen university and application status</p>
      </div>

      {/* University Header Card */}
      <div style={{
        background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
        borderRadius: 'var(--radius-lg)',
        padding: '40px',
        marginBottom: '24px',
        color: 'white',
        boxShadow: 'var(--shadow-xl)'
      }}>
        <div style={{ fontSize: '16px', opacity: 0.9, marginBottom: '8px' }}>
          ⭐ Your Final Choice
        </div>
        <h1 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '16px' }}>
          {university.name}
        </h1>
        <div style={{ fontSize: '18px', opacity: 0.95, marginBottom: '24px' }}>
          📍 {university.city}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <div style={{ background: 'rgba(255,255,255,0.2)', padding: '16px', borderRadius: 'var(--radius)' }}>
            <div style={{ fontSize: '13px', opacity: 0.9, marginBottom: '4px' }}>📚 Program</div>
            <div style={{ fontSize: '16px', fontWeight: '700' }}>{university.specialty}</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.2)', padding: '16px', borderRadius: 'var(--radius)' }}>
            <div style={{ fontSize: '13px', opacity: 0.9, marginBottom: '4px' }}>💰 Tuition Fees</div>
            <div style={{ fontSize: '16px', fontWeight: '700' }}>{university.fees}</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.2)', padding: '16px', borderRadius: 'var(--radius)' }}>
            <div style={{ fontSize: '13px', opacity: 0.9, marginBottom: '4px' }}>📅 Intake</div>
            <div style={{ fontSize: '16px', fontWeight: '700' }}>{university.intake}</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.2)', padding: '16px', borderRadius: 'var(--radius)' }}>
            <div style={{ fontSize: '13px', opacity: 0.9, marginBottom: '4px' }}>⏰ Deadline</div>
            <div style={{ fontSize: '16px', fontWeight: '700' }}>{university.deadline}</div>
          </div>
        </div>
      </div>

      {/* Overall Progress Dashboard */}
      <div style={{
        background: 'white',
        borderRadius: 'var(--radius)',
        padding: '24px',
        marginBottom: '24px',
        boxShadow: 'var(--shadow-md)'
      }}>
        <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px', color: 'var(--gray-900)' }}>
          📊 Overall Application Progress
        </h3>
        <div style={{ display: 'grid', gap: '16px' }}>
          <ProgressBar progress={docProgress} label="📄 Documents Progress" />
          <ProgressBar progress={financialProgress} label="💰 Financial Plan" />
          <ProgressBar progress={roadmapProgress} label="📋 Application Roadmap" />
          <ProgressBar progress={ieltsProgress} label="📝 IELTS Study Plan" />
        </div>
      </div>

      {/* Document Status */}
      <div style={{
        background: 'white',
        borderRadius: 'var(--radius)',
        padding: '24px',
        marginBottom: '24px',
        boxShadow: 'var(--shadow-md)'
      }}>
        <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px', color: 'var(--gray-900)' }}>
          📄 Document Checklist ({completedDocs}/{totalDocs})
        </h3>
        
        <div style={{ marginBottom: '20px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--gray-100)',
            padding: '8px 16px',
            borderRadius: '12px'
          }}>
            <div style={{
              width: '80px',
              height: '8px',
              background: 'var(--gray-200)',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${docProgress}%`,
                height: '100%',
                background: docProgress === 100 ? 'var(--success)' : 'var(--primary)',
                transition: 'width 0.3s ease'
              }} />
            </div>
            <span style={{ fontSize: '14px', fontWeight: '700' }}>{docProgress}%</span>
          </div>
        </div>

        {university.documents && university.documents.filter(d => !d.completed).length > 0 && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            padding: '16px',
            borderRadius: 'var(--radius-sm)',
            border: '2px solid var(--danger)',
            marginBottom: '16px'
          }}>
            <div style={{ fontWeight: '600', color: 'var(--danger)', marginBottom: '12px', fontSize: '15px' }}>
              ⚠️ Missing Documents ({university.documents.filter(d => !d.completed).length}):
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {university.documents.filter(d => !d.completed).slice(0, 5).map(doc => (
                <div key={doc.id} style={{ fontSize: '14px', color: 'var(--danger)', paddingLeft: '20px' }}>
                  • {doc.id}
                </div>
              ))}
            </div>
          </div>
        )}

        {docProgress === 100 && (
          <div style={{
            background: 'rgba(16, 185, 129, 0.1)',
            padding: '16px',
            borderRadius: 'var(--radius-sm)',
            border: '2px solid var(--success)',
            color: 'var(--success)',
            fontWeight: '600',
            textAlign: 'center'
          }}>
            ✅ All documents completed! You're ready to apply.
          </div>
        )}
      </div>

      {/* Visa Process Tracker */}
      <div style={{
        background: 'white',
        borderRadius: 'var(--radius)',
        padding: '24px',
        marginBottom: '24px',
        boxShadow: 'var(--shadow-md)'
      }}>
        <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px', color: 'var(--gray-900)' }}>
          🛂 Visa Process Tracker
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <StatusIndicator completed={university.casReceived} label="CAS Received" />
          <StatusIndicator completed={university.depositPaid} label={`Deposit Paid (${university.depositAmount})`} />
          <StatusIndicator completed={university.visaApplied} label="Visa Applied" />
        </div>
      </div>

      {/* Financial Summary */}
      <div style={{
        background: 'white',
        borderRadius: 'var(--radius)',
        padding: '24px',
        marginBottom: '24px',
        boxShadow: 'var(--shadow-md)'
      }}>
        <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px', color: 'var(--gray-900)' }}>
          💰 Financial Overview
        </h3>
        
        <div style={{ marginBottom: '20px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--gray-100)',
            padding: '8px 16px',
            borderRadius: '12px'
          }}>
            <div style={{
              width: '80px',
              height: '8px',
              background: 'var(--gray-200)',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${financialProgress}%`,
                height: '100%',
                background: financialProgress === 100 ? 'var(--success)' : 'var(--primary)',
                transition: 'width 0.3s ease'
              }} />
            </div>
            <span style={{ fontSize: '14px', fontWeight: '700' }}>{financialProgress}%</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <div style={{ padding: '16px', background: 'var(--gray-50)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontSize: '13px', color: 'var(--gray-600)', marginBottom: '4px' }}>Total Fees</div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--primary)' }}>{university.fees}</div>
          </div>
          <div style={{ padding: '16px', background: 'var(--gray-50)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontSize: '13px', color: 'var(--gray-600)', marginBottom: '4px' }}>Deposit Required</div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--warning)' }}>{university.depositAmount}</div>
          </div>
          <div style={{ padding: '16px', background: 'var(--gray-50)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontSize: '13px', color: 'var(--gray-600)', marginBottom: '4px' }}>Deposit Status</div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: university.depositPaid ? 'var(--success)' : 'var(--danger)' }}>
              {university.depositPaid ? 'Paid ✓' : 'Pending'}
            </div>
          </div>
        </div>
      </div>

      {/* Application Roadmap Progress */}
      <div style={{
        background: 'white',
        borderRadius: 'var(--radius)',
        padding: '24px',
        marginBottom: '24px',
        boxShadow: 'var(--shadow-md)'
      }}>
        <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px', color: 'var(--gray-900)' }}>
          📋 Application Steps
        </h3>
        
        <div style={{ marginBottom: '20px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--gray-100)',
            padding: '8px 16px',
            borderRadius: '12px'
          }}>
            <div style={{
              width: '80px',
              height: '8px',
              background: 'var(--gray-200)',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${roadmapProgress}%`,
                height: '100%',
                background: roadmapProgress === 100 ? 'var(--success)' : 'var(--primary)',
                transition: 'width 0.3s ease'
              }} />
            </div>
            <span style={{ fontSize: '14px', fontWeight: '700' }}>{roadmapProgress}%</span>
          </div>
        </div>

        <p style={{ fontSize: '14px', color: 'var(--gray-600)' }}>
          {journeyData?.roadmap ? (
            <>
              {journeyData.roadmap.filter(r => r.completed).length} of {journeyData.roadmap.length} steps completed
            </>
          ) : (
            'No roadmap data available'
          )}
        </p>
      </div>

      {/* IELTS Preparation */}
      <div style={{
        background: 'white',
        borderRadius: 'var(--radius)',
        padding: '24px',
        marginBottom: '24px',
        boxShadow: 'var(--shadow-md)'
      }}>
        <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px', color: 'var(--gray-900)' }}>
          📝 IELTS Preparation
        </h3>
        
        <div style={{ marginBottom: '20px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--gray-100)',
            padding: '8px 16px',
            borderRadius: '12px'
          }}>
            <div style={{
              width: '80px',
              height: '8px',
              background: 'var(--gray-200)',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${ieltsProgress}%`,
                height: '100%',
                background: ieltsProgress === 100 ? 'var(--success)' : 'var(--primary)',
                transition: 'width 0.3s ease'
              }} />
            </div>
            <span style={{ fontSize: '14px', fontWeight: '700' }}>{ieltsProgress}%</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <div style={{ padding: '16px', background: 'var(--gray-50)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontSize: '13px', color: 'var(--gray-600)', marginBottom: '4px' }}>Required Score</div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--primary)' }}>{university.ielts}</div>
          </div>
          <div style={{ padding: '16px', background: 'var(--gray-50)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontSize: '13px', color: 'var(--gray-600)', marginBottom: '4px' }}>Study Progress</div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--secondary)' }}>{ieltsProgress}%</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{
        background: 'white',
        borderRadius: 'var(--radius)',
        padding: '24px',
        boxShadow: 'var(--shadow-md)'
      }}>
        <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px', color: 'var(--gray-900)' }}>
          ⚡ Quick Actions
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          <a
            href={university.link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
            style={{
              background: 'var(--info)',
              color: 'white',
              textDecoration: 'none',
              textAlign: 'center'
            }}
          >
            🔗 View Course Page
          </a>
          <button
            onClick={() => window.location.href = '/journey'}
            className="btn"
            style={{
              background: 'var(--primary)',
              color: 'white'
            }}
          >
            🗺️ View Journey
          </button>
          <button
            onClick={() => window.location.href = '/documents'}
            className="btn"
            style={{
              background: 'var(--secondary)',
              color: 'white'
            }}
          >
            📄 Manage Documents
          </button>
        </div>
      </div>
    </div>
  );
}