import { useState, useEffect } from 'react';
import { loadJourneyData, saveJourneyData } from '../data/database';

// Default journey data structure
const DEFAULT_JOURNEY_DATA = {
  roadmap: [
    { id: 1, emoji: '🎯', title: 'Choose university & course', completed: false, date: '', notes: '' },
    { id: 2, emoji: '📄', title: 'Prepare documents', completed: false, date: '', notes: '' },
    { id: 3, emoji: '📝', title: 'Take IELTS / English test', completed: false, date: '', notes: '' },
    { id: 4, emoji: '📨', title: 'Apply to universities', completed: false, date: '', notes: '' },
    { id: 5, emoji: '✉️', title: 'Receive offer (conditional/unconditional)', completed: false, date: '', notes: '' },
    { id: 6, emoji: '✅', title: 'Accept offer & pay deposit', completed: false, date: '', notes: '' },
    { id: 7, emoji: '📋', title: 'Get CAS (Confirmation of Acceptance for Studies)', completed: false, date: '', notes: '' },
    { id: 8, emoji: '🛂', title: 'Apply for UK Student Visa', completed: false, date: '', notes: '' },
    { id: 9, emoji: '💳', title: 'Pay Immigration Health Surcharge (IHS)', completed: false, date: '', notes: '' },
    { id: 10, emoji: '✈️', title: 'Book flight / travel arrangements', completed: false, date: '', notes: '' },
    { id: 11, emoji: '🏠', title: 'Arrange accommodation', completed: false, date: '', notes: '' },
    { id: 12, emoji: '🚌', title: 'Arrange transportation', completed: false, date: '', notes: '' },
    { id: 13, emoji: '🏦', title: 'Open UK bank account', completed: false, date: '', notes: '' },
    { id: 14, emoji: '📱', title: 'Get UK SIM card / phone', completed: false, date: '', notes: '' },
    { id: 15, emoji: '🎒', title: 'Prepare essentials before travel', completed: false, date: '', notes: '' },
    { id: 16, emoji: '🛬', title: 'Arrive in the UK', completed: false, date: '', notes: '' },
    { id: 17, emoji: '🎓', title: 'Register at university & attend induction', completed: false, date: '', notes: '' },
    { id: 18, emoji: '🏥', title: 'Register with a GP (doctor)', completed: false, date: '', notes: '' },
    { id: 19, emoji: '🎉', title: 'Attend welcome week / orientation', completed: false, date: '', notes: '' },
    { id: 20, emoji: '🔧', title: 'Set up essentials for daily life', completed: false, date: '', notes: '' },
    { id: 21, emoji: '💼', title: 'Explore part-time work / internships', completed: false, date: '', notes: '' }
  ],
  financial: [
    { id: 1, date: 'May 20', action: 'First payment to university (deposit)', amountDA: '1,650,000', amountGBP: '5,500', status: 'pending' },
    { id: 2, date: 'June 01', action: 'Deposit remaining funds in bank', amountDA: '3,752,500', amountGBP: '21,704', status: 'pending' },
    { id: 3, date: 'July 25–30', action: 'Visa application + IHS payment', amountDA: '506,400', amountGBP: '2,076', status: 'pending' },
    { id: 4, date: 'Aug 25', action: 'Purchase flight ticket', amountDA: '55,000', amountGBP: '130', status: 'pending' }
  ],
  ielts: {
    startDate: '28 March',
    examDate: '28 April',
    dailySchedule: '5:00–7:00 AM + 4:00–6:00 PM',
    weeks: [
  {
    id: 1,
    phase: 'Phase 1',
    weekNum: 'Week 1',
    focus: 'Writing Task 1 – Data description',
    notes: '',
    days: [
      { id: 1, day: 'Saturday', topic: 'Charts', task: 'Bar/Pie charts, comparison vocab', completed: false },
      { id: 2, day: 'Sunday', topic: 'Tables', task: 'Key data selection, no listing', completed: false },
      { id: 3, day: 'Monday', topic: 'Graphs', task: 'Line graphs, trend verbs', completed: false },
      { id: 4, day: 'Tuesday', topic: 'Diagrams', task: 'Process diagrams, passive voice', completed: false },
      { id: 5, day: 'Wednesday', topic: 'Charts', task: 'Combination practice', completed: false },
      { id: 6, day: 'Thursday', topic: 'Tables', task: 'Timed drill (20 min limit)', completed: false },
      { id: 7, day: 'Friday', topic: 'Review All', task: 'Graph 2h + Diagram 2h + Plan 2h', completed: false }
    ]
  },
  {
    id: 2,
    phase: 'Phase 1',
    weekNum: 'Week 2',
    focus: 'Writing Task 2 – Essay structures',
    notes: '',
    days: [
      { id: 1, day: 'Saturday', topic: 'Opinion', task: 'Agree/Disagree essays', completed: false },
      { id: 2, day: 'Sunday', topic: 'Discussion', task: 'Discuss both views', completed: false },
      { id: 3, day: 'Monday', topic: 'Problem/Solution', task: 'Identify causes and solutions', completed: false },
      { id: 4, day: 'Tuesday', topic: 'Advantages/Disadvantages', task: 'Balanced argument', completed: false },
      { id: 5, day: 'Wednesday', topic: 'Two-part', task: 'Answer both questions', completed: false },
      { id: 6, day: 'Thursday', topic: 'Mixed Practice', task: 'Random essay types', completed: false },
      { id: 7, day: 'Friday', topic: 'Review All', task: 'Task 1 (1h) + Task 2 (2h)', completed: false }
    ]
  },
  {
    id: 3,
    phase: 'Phase 2',
    weekNum: 'Week 3',
    focus: 'Reading – Speed & question types',
    notes: '',
    days: [
      { id: 1, day: 'Saturday', topic: 'Matching Headings', task: 'Skim paragraphs, main ideas', completed: false },
      { id: 2, day: 'Sunday', topic: 'True/False/Not Given', task: 'Fact vs inference', completed: false },
      { id: 3, day: 'Monday', topic: 'Multiple Choice', task: 'Eliminate wrong answers', completed: false },
      { id: 4, day: 'Tuesday', topic: 'Matching Information', task: 'Locate specific details', completed: false },
      { id: 5, day: 'Wednesday', topic: 'Summary Completion', task: 'Use text vocabulary', completed: false },
      { id: 6, day: 'Thursday', topic: 'Sentence Completion', task: 'Grammar + meaning', completed: false },
      { id: 7, day: 'Friday', topic: 'Review All', task: '3 full passages (60 min)', completed: false }
    ]
  },
  {
    id: 4,
    phase: 'Phase 2',
    weekNum: 'Week 4',
    focus: 'Reading – Speed & question types (continued)',
    notes: '',
    days: [
      { id: 1, day: 'Saturday', topic: 'Matching Features', task: 'Connect info to people/dates', completed: false },
      { id: 2, day: 'Sunday', topic: 'Yes/No/Not Given', task: 'Opinion-based questions', completed: false },
      { id: 3, day: 'Monday', topic: 'Diagram Labeling', task: 'Technical vocabulary', completed: false },
      { id: 4, day: 'Tuesday', topic: 'List Selection', task: 'Choose from options', completed: false },
      { id: 5, day: 'Wednesday', topic: 'Short Answers', task: 'Word limit practice', completed: false },
      { id: 6, day: 'Thursday', topic: 'Speed Reading', task: 'Timed practice (20 min/passage)', completed: false },
      { id: 7, day: 'Friday', topic: 'Review All', task: '3 full passages + review mistakes', completed: false }
    ]
  },
  {
    id: 5,
    phase: 'Phase 3',
    weekNum: 'Week 5',
    focus: 'Listening – Sections 1–4',
    notes: '',
    days: [
      { id: 1, day: 'Saturday', topic: 'Section 1', task: 'Form filling, personal info', completed: false },
      { id: 2, day: 'Sunday', topic: 'Section 2', task: 'Monologue (map/plan)', completed: false },
      { id: 3, day: 'Monday', topic: 'Section 3', task: 'Academic discussion', completed: false },
      { id: 4, day: 'Tuesday', topic: 'Section 4', task: 'Academic lecture', completed: false },
      { id: 5, day: 'Wednesday', topic: 'Note Completion', task: 'Listen for keywords', completed: false },
      { id: 6, day: 'Thursday', topic: 'Matching', task: 'Connect speakers/ideas', completed: false },
      { id: 7, day: 'Friday', topic: 'Review All', task: 'Full listening test (30 min)', completed: false }
    ]
  },
  {
    id: 6,
    phase: 'Phase 4',
    weekNum: 'Week 6',
    focus: 'Speaking – Fluency & cue cards',
    notes: '',
    days: [
      { id: 1, day: 'Saturday', topic: 'Part 1', task: 'Personal questions practice', completed: false },
      { id: 2, day: 'Sunday', topic: 'Part 2', task: 'Cue card: Describe a person', completed: false },
      { id: 3, day: 'Monday', topic: 'Part 2', task: 'Cue card: Describe a place', completed: false },
      { id: 4, day: 'Tuesday', topic: 'Part 2', task: 'Cue card: Describe an event', completed: false },
      { id: 5, day: 'Wednesday', topic: 'Part 2', task: 'Cue card: Describe an object', completed: false },
      { id: 6, day: 'Thursday', topic: 'Part 3', task: 'Abstract discussion practice', completed: false },
      { id: 7, day: 'Friday', topic: 'Review All', task: 'Full speaking mock (11-14 min)', completed: false }
    ]
  },
  {
    id: 7,
    phase: 'Final Prep',
    weekNum: 'Week 7',
    focus: 'Mock Tests – Full timed exams',
    notes: '',
    days: [
      { id: 1, day: 'Saturday', topic: 'Mock Test 1', task: 'Full IELTS exam (2h 45min)', completed: false },
      { id: 2, day: 'Sunday', topic: 'Review Test 1', task: 'Analyze all mistakes', completed: false },
      { id: 3, day: 'Monday', topic: 'Mock Test 2', task: 'Full IELTS exam (2h 45min)', completed: false },
      { id: 4, day: 'Tuesday', topic: 'Review Test 2', task: 'Focus on weak areas', completed: false },
      { id: 5, day: 'Wednesday', topic: 'Mock Test 3', task: 'Full IELTS exam (2h 45min)', completed: false },
      { id: 6, day: 'Thursday', topic: 'Review Test 3', task: 'Final error analysis', completed: false },
      { id: 7, day: 'Friday', topic: 'Rest Day', task: 'Light review only', completed: false }
    ]
  },
  {
    id: 8,
    phase: 'Final Prep',
    weekNum: 'Week 8',
    focus: 'Mock Tests – Full timed exams',
    notes: '',
    days: [
      { id: 1, day: 'Saturday', topic: 'Mock Test 4', task: 'Full IELTS exam (2h 45min)', completed: false },
      { id: 2, day: 'Sunday', topic: 'Review Test 4', task: 'Identify patterns in mistakes', completed: false },
      { id: 3, day: 'Monday', topic: 'Speaking Practice', task: 'Record yourself, review fluency', completed: false },
      { id: 4, day: 'Tuesday', topic: 'Writing Review', task: 'Review best essays, templates', completed: false },
      { id: 5, day: 'Wednesday', topic: 'Reading & Listening', task: 'Quick practice (1h each)', completed: false },
      { id: 6, day: 'Thursday', topic: 'Rest & Prepare', task: 'Exam prep, sleep well', completed: false },
      { id: 7, day: 'Friday', topic: 'Exam Day', task: 'IELTS Exam - Good Luck! 🍀', completed: false }
    ]
  }
]
  }
};

export default function Journey() {
  const [activeSubTab, setActiveSubTab] = useState('roadmap');
  const [journeyData, setJourneyData] = useState(DEFAULT_JOURNEY_DATA);
  const [expandedNotes, setExpandedNotes] = useState({});
  const [customFinancialEntry, setCustomFinancialEntry] = useState({
    date: '',
    action: '',
    amountDA: '',
    amountGBP: ''
  });
  const [editingRoadmapItem, setEditingRoadmapItem] = useState(null);
  const [editingFinancialItem, setEditingFinancialItem] = useState(null);
  const [editingIELTSSettings, setEditingIELTSSettings] = useState(false);
  const [tempIELTSSettings, setTempIELTSSettings] = useState({});
  const [weekNotes, setWeekNotes] = useState({});
const [expandedWeekNotes, setExpandedWeekNotes] = useState({});
  useEffect(() => {
    const loadData = async () => {
      const data = await loadJourneyData();
      if (data) {
        setJourneyData(data);
      }
    };
    loadData();
  }, []);

  const saveData = (newData) => {
    setJourneyData(newData);
    saveJourneyData(newData);
  };

  // Sort roadmap by date
  const sortRoadmapByDate = (roadmap) => {
    return [...roadmap].sort((a, b) => {
      if (!a.date && !b.date) return 0;
      if (!a.date) return 1;
      if (!b.date) return -1;
      return new Date(a.date) - new Date(b.date);
    });
  };

  // Roadmap handlers
  const toggleRoadmapItem = (id) => {
    const updated = {
      ...journeyData,
      roadmap: journeyData.roadmap.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    };
    saveData(updated);
  };

  const updateRoadmapField = (id, field, value) => {
    const updated = {
      ...journeyData,
      roadmap: sortRoadmapByDate(journeyData.roadmap.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      ))
    };
    saveData(updated);
  };

  const addRoadmapStep = () => {
    const newId = Math.max(...journeyData.roadmap.map(r => r.id), 0) + 1;
    const newStep = {
      id: newId,
      emoji: '📌',
      title: 'New Step',
      completed: false,
      date: '',
      notes: ''
    };
    const updated = {
      ...journeyData,
      roadmap: sortRoadmapByDate([...journeyData.roadmap, newStep])
    };
    saveData(updated);
    setEditingRoadmapItem(newId);
  };

  const deleteRoadmapStep = (id) => {
    if (confirm('Delete this step?')) {
      const updated = {
        ...journeyData,
        roadmap: journeyData.roadmap.filter(item => item.id !== id)
      };
      saveData(updated);
    }
  };

  const saveRoadmapEdit = (id, newTitle, newEmoji) => {
    const updated = {
      ...journeyData,
      roadmap: journeyData.roadmap.map(item =>
        item.id === id ? { ...item, title: newTitle, emoji: newEmoji } : item
      )
    };
    saveData(updated);
    setEditingRoadmapItem(null);
  };

  // Financial handlers
  const toggleFinancialStatus = (id) => {
    const updated = {
      ...journeyData,
      financial: journeyData.financial.map(item =>
        item.id === id 
          ? { ...item, status: item.status === 'pending' ? 'done' : 'pending' }
          : item
      )
    };
    saveData(updated);
  };

  const addCustomFinancial = () => {
    if (customFinancialEntry.action && customFinancialEntry.date) {
      const newId = Math.max(...journeyData.financial.map(f => f.id), 0) + 1;
      const updated = {
        ...journeyData,
        financial: [
          ...journeyData.financial,
          {
            id: newId,
            ...customFinancialEntry,
            status: 'pending'
          }
        ]
      };
      saveData(updated);
      setCustomFinancialEntry({ date: '', action: '', amountDA: '', amountGBP: '' });
    }
  };

  const deleteFinancialEntry = (id) => {
    if (confirm('Delete this financial entry?')) {
      const updated = {
        ...journeyData,
        financial: journeyData.financial.filter(item => item.id !== id)
      };
      saveData(updated);
    }
  };

  const saveFinancialEdit = (id, field, value) => {
    const updated = {
      ...journeyData,
      financial: journeyData.financial.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    };
    saveData(updated);
  };

  // IELTS handlers
  const toggleIELTSDay = (weekId, dayId) => {
    const updated = {
      ...journeyData,
      ielts: {
        ...journeyData.ielts,
        weeks: journeyData.ielts.weeks.map(week =>
          week.id === weekId
            ? {
                ...week,
                days: week.days.map(day =>
                  day.id === dayId ? { ...day, completed: !day.completed } : day
                )
              }
            : week
        )
      }
    };
    saveData(updated);
  };

  const saveIELTSSettings = () => {
    const updated = {
      ...journeyData,
      ielts: {
        ...journeyData.ielts,
        startDate: tempIELTSSettings.startDate,
        examDate: tempIELTSSettings.examDate,
        dailySchedule: tempIELTSSettings.dailySchedule
      }
    };
    saveData(updated);
    setEditingIELTSSettings(false);
  };

  // Calculate progress
  const roadmapProgress = Math.round(
    (journeyData.roadmap.filter(item => item.completed).length / journeyData.roadmap.length) * 100
  );

  const financialProgress = Math.round(
    (journeyData.financial.filter(item => item.status === 'done').length / journeyData.financial.length) * 100
  );

  const ieltsProgress = Math.round(
    (journeyData.ielts.weeks.reduce((sum, week) => 
      sum + week.days.filter(day => day.completed).length, 0
    ) / journeyData.ielts.weeks.reduce((sum, week) => sum + week.days.length, 0)) * 100
  );

  const overallJourneyProgress = Math.round((roadmapProgress + financialProgress + ieltsProgress) / 3);

  // Sort roadmap for display
  const sortedRoadmap = sortRoadmapByDate(journeyData.roadmap);

  return (
    <div className="documents-section">
      <div className="section-header">
        <h2>🗺️ My Journey to UK Studies</h2>
        <p className="subtitle">Complete roadmap, financial planning, and IELTS preparation tracker</p>
      </div>

      {/* Overall Progress */}
      <div className="progress-card" style={{ marginBottom: '24px' }}>
        <div className="progress-header">
          <span className="progress-label">🎯 Overall Journey Completion</span>
          <span className="progress-value">{overallJourneyProgress}%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${overallJourneyProgress}%` }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '16px', fontSize: '13px' }}>
          <span>📋 Roadmap: {roadmapProgress}%</span>
          <span>💰 Financial: {financialProgress}%</span>
          <span>📝 IELTS: {ieltsProgress}%</span>
        </div>
      </div>

      {/* Sub-tabs */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '24px',
        flexWrap: 'wrap'
      }}>
        {[
          { id: 'roadmap', label: '📋 Application Roadmap', icon: '🗺️' },
          { id: 'financial', label: '💰 Financial Plan', icon: '💳' },
          { id: 'ielts', label: '📝 IELTS Study Plan', icon: '📚' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id)}
            className={`nav-tab ${activeSubTab === tab.id ? 'active' : ''}`}
            style={{ flex: '1', minWidth: '150px' }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Roadmap Tab */}
      {activeSubTab === 'roadmap' && (
        <div>
          <div style={{
            background: 'white',
            borderRadius: 'var(--radius)',
            padding: '20px',
            marginBottom: '16px',
            boxShadow: 'var(--shadow-md)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <div style={{ marginBottom: '12px', fontWeight: '600', fontSize: '16px', color: 'var(--gray-900)' }}>
                📊 Application Progress: {journeyData.roadmap.filter(i => i.completed).length} / {journeyData.roadmap.length} completed
              </div>
              <div className="progress-bar" style={{ background: 'var(--gray-200)', height: '8px', width: '300px' }}>
                <div 
                  className="progress-fill" 
                  style={{ 
                    background: 'var(--primary)', 
                    width: `${roadmapProgress}%`,
                    height: '100%'
                  }} 
                />
              </div>
            </div>
            <button
              onClick={addRoadmapStep}
              className="btn"
              style={{
                background: 'var(--success)',
                color: 'white',
                padding: '10px 20px'
              }}
            >
              ➕ Add Step
            </button>
          </div>

          <div className="documents-list">
            {sortedRoadmap.map(item => (
              <div key={item.id}>
                <div 
                  className={`document-item ${item.completed ? 'completed' : ''}`}
                  style={{ cursor: 'default' }}
                >
                  <div 
                    className="document-checkbox"
                    onClick={() => toggleRoadmapItem(item.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    {item.completed ? '✓' : item.emoji}
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    {editingRoadmapItem === item.id ? (
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <input
                          type="text"
                          defaultValue={item.emoji}
                          placeholder="Emoji"
                          style={{ width: '50px', padding: '6px', border: '2px solid var(--gray-200)', borderRadius: 'var(--radius-sm)' }}
                          id={`emoji-${item.id}`}
                        />
                        <input
                          type="text"
                          defaultValue={item.title}
                          placeholder="Title"
                          style={{ flex: 1, padding: '6px', border: '2px solid var(--gray-200)', borderRadius: 'var(--radius-sm)' }}
                          id={`title-${item.id}`}
                        />
                        <button
                          onClick={() => {
                            const newEmoji = document.getElementById(`emoji-${item.id}`).value;
                            const newTitle = document.getElementById(`title-${item.id}`).value;
                            saveRoadmapEdit(item.id, newTitle, newEmoji);
                          }}
                          style={{
                            background: 'var(--success)',
                            color: 'white',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: 'var(--radius-sm)',
                            cursor: 'pointer',
                            fontSize: '12px'
                          }}
                        >
                          ✓ Save
                        </button>
                        <button
                          onClick={() => setEditingRoadmapItem(null)}
                          style={{
                            background: 'var(--gray-200)',
                            color: 'var(--gray-700)',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: 'var(--radius-sm)',
                            cursor: 'pointer',
                            fontSize: '12px'
                          }}
                        >
                          ✗
                        </button>
                      </div>
                    ) : (
                      <div style={{
                        fontSize: '15px',
                        fontWeight: '600',
                        textDecoration: item.completed ? 'line-through' : 'none',
                        color: item.completed ? 'var(--gray-600)' : 'var(--gray-900)',
                        marginBottom: '4px'
                      }}>
                        {item.title}
                      </div>
                    )}
                    {item.date && (
                      <div style={{ fontSize: '13px', color: 'var(--info)', marginTop: '4px' }}>
                        📅 {new Date(item.date).toLocaleDateString()}
                      </div>
                    )}
                  </div>

                  <input
                    type="date"
                    value={item.date}
                    onChange={(e) => updateRoadmapField(item.id, 'date', e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      padding: '6px 10px',
                      border: '2px solid var(--gray-200)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '13px',
                      marginRight: '8px'
                    }}
                  />

                  <button
                    onClick={() => setEditingRoadmapItem(item.id)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '18px',
                      padding: '4px 8px',
                      color: 'var(--info)'
                    }}
                  >
                    ✏️
                  </button>

                  <button
                    onClick={() => setExpandedNotes(prev => ({
                      ...prev,
                      [`roadmap-${item.id}`]: !prev[`roadmap-${item.id}`]
                    }))}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '18px',
                      padding: '4px 8px'
                    }}
                  >
                    📝
                  </button>

                  <button
                    onClick={() => deleteRoadmapStep(item.id)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '18px',
                      padding: '4px 8px',
                      color: 'var(--danger)'
                    }}
                  >
                    🗑️
                  </button>
                </div>

                {expandedNotes[`roadmap-${item.id}`] && (
                  <div style={{ marginLeft: '44px', marginTop: '8px', marginBottom: '12px' }}>
                    <textarea
                      value={item.notes}
                      onChange={(e) => updateRoadmapField(item.id, 'notes', e.target.value)}
                      placeholder="Add notes..."
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
            ))}
          </div>
        </div>
      )}

      {/* Financial Plan Tab */}
      {activeSubTab === 'financial' && (
        <div>
          {/* Budget Summary */}
          <div style={{
            background: 'linear-gradient(135deg, var(--success), #059669)',
            borderRadius: 'var(--radius)',
            padding: '24px',
            marginBottom: '24px',
            color: 'white',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <div style={{ fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>
              💰 Total Budget Summary
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <div>
                <div style={{ fontSize: '24px', fontWeight: '700' }}>
                  {journeyData.financial.reduce((sum, item) => sum + (parseFloat(item.amountDA.replace(/,/g, '')) || 0), 0).toLocaleString()} DA
                </div>
                <div style={{ fontSize: '13px', opacity: 0.9 }}>Total Budget (Algerian Dinar)</div>
              </div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: '700' }}>
                  £{journeyData.financial.reduce((sum, item) => sum + (parseFloat(item.amountGBP.replace(/,/g, '')) || 0), 0).toLocaleString()}
                </div>
                <div style={{ fontSize: '13px', opacity: 0.9 }}>Total Budget (British Pounds)</div>
              </div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: '700' }}>{financialProgress}%</div>
                <div style={{ fontSize: '13px', opacity: 0.9 }}>Completed</div>
              </div>
            </div>
          </div>

          {/* Timeline Table */}
          <div style={{
            background: 'white',
            borderRadius: 'var(--radius)',
            padding: '20px',
            marginBottom: '16px',
            boxShadow: 'var(--shadow-md)',
            overflowX: 'auto'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--gray-200)' }}>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: '700', color: 'var(--gray-700)' }}>✓</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: '700', color: 'var(--gray-700)' }}>Date</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: '700', color: 'var(--gray-700)' }}>Action</th>
                  <th style={{ padding: '12px', textAlign: 'right', fontSize: '13px', fontWeight: '700', color: 'var(--gray-700)' }}>Amount (DA)</th>
                  <th style={{ padding: '12px', textAlign: 'right', fontSize: '13px', fontWeight: '700', color: 'var(--gray-700)' }}>Amount (GBP)</th>
                  <th style={{ padding: '12px', textAlign: 'center', fontSize: '13px', fontWeight: '700', color: 'var(--gray-700)' }}>Status</th>
                  <th style={{ padding: '12px', textAlign: 'center', fontSize: '13px', fontWeight: '700', color: 'var(--gray-700)' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {journeyData.financial.map(item => (
                  <tr 
                    key={item.id} 
                    style={{ 
                      borderBottom: '1px solid var(--gray-100)',
                      background: item.status === 'done' ? 'rgba(16, 185, 129, 0.05)' : 'transparent'
                    }}
                  >
                    <td style={{ padding: '12px' }}>
                      <div
                        onClick={() => toggleFinancialStatus(item.id)}
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          border: `2px solid ${item.status === 'done' ? 'var(--success)' : 'var(--gray-300)'}`,
                          background: item.status === 'done' ? 'var(--success)' : 'white',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          fontSize: '12px',
                          fontWeight: '700'
                        }}
                      >
                        {item.status === 'done' ? '✓' : ''}
                      </div>
                    </td>
                    <td style={{ padding: '12px' }}>
                      {editingFinancialItem === item.id ? (
                        <input
                          type="text"
                          defaultValue={item.date}
                          onBlur={(e) => {
                            saveFinancialEdit(item.id, 'date', e.target.value);
                            setEditingFinancialItem(null);
                          }}
                          autoFocus
                          style={{ padding: '4px', border: '2px solid var(--primary)', borderRadius: 'var(--radius-sm)', fontSize: '14px' }}
                        />
                      ) : (
                        <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--primary)', cursor: 'pointer' }}
                          onClick={() => setEditingFinancialItem(item.id)}
                        >
                          {item.date}
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '12px' }}>
                      {editingFinancialItem === item.id ? (
                        <input
                          type="text"
                          defaultValue={item.action}
                          onBlur={(e) => {
                            saveFinancialEdit(item.id, 'action', e.target.value);
                          }}
                          style={{ width: '100%', padding: '4px', border: '2px solid var(--primary)', borderRadius: 'var(--radius-sm)', fontSize: '14px' }}
                        />
                      ) : (
                        <span style={{ fontSize: '14px', color: 'var(--gray-900)' }}>{item.action}</span>
                      )}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>
                      {editingFinancialItem === item.id ? (
                        <input
                          type="text"
                          defaultValue={item.amountDA}
                          onBlur={(e) => {
                            saveFinancialEdit(item.id, 'amountDA', e.target.value);
                          }}
                          style={{ width: '100px', padding: '4px', border: '2px solid var(--primary)', borderRadius: 'var(--radius-sm)', fontSize: '14px', textAlign: 'right' }}
                        />
                      ) : (
                        <span style={{ fontSize: '14px', fontWeight: '600' }}>{item.amountDA} DA</span>
                      )}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>
                      {editingFinancialItem === item.id ? (
                        <input
                          type="text"
                          defaultValue={item.amountGBP}
                          onBlur={(e) => {
                            saveFinancialEdit(item.id, 'amountGBP', e.target.value);
                          }}
                          style={{ width: '80px', padding: '4px', border: '2px solid var(--primary)', borderRadius: 'var(--radius-sm)', fontSize: '14px', textAlign: 'right' }}
                        />
                      ) : (
                        <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--success)' }}>£{item.amountGBP}</span>
                      )}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <span style={{
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '600',
                        background: item.status === 'done' ? 'var(--success)' : 'var(--warning)',
                        color: 'white'
                      }}>
                        {item.status === 'done' ? 'Done' : 'Pending'}
                      </span>
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
                        <button
                          onClick={() => setEditingFinancialItem(item.id)}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '16px',
                            color: 'var(--info)'
                          }}
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => deleteFinancialEntry(item.id)}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '16px',
                            color: 'var(--danger)'
                          }}
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add Custom Entry */}
          <div style={{
            background: 'white',
            borderRadius: 'var(--radius)',
            padding: '20px',
            boxShadow: 'var(--shadow-md)'
          }}>
            <div style={{ fontWeight: '700', fontSize: '16px', marginBottom: '16px', color: 'var(--gray-900)' }}>
              ➕ Add Custom Financial Entry
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
              <input
                type="text"
                placeholder="Date (e.g., Oct 15)"
                value={customFinancialEntry.date}
                onChange={(e) => setCustomFinancialEntry({ ...customFinancialEntry, date: e.target.value })}
                style={{
                  padding: '10px',
                  border: '2px solid var(--gray-200)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '14px'
                }}
              />
              <input
                type="text"
                placeholder="Action"
                value={customFinancialEntry.action}
                onChange={(e) => setCustomFinancialEntry({ ...customFinancialEntry, action: e.target.value })}
                style={{
                  padding: '10px',
                  border: '2px solid var(--gray-200)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '14px',
                  gridColumn: 'span 2'
                }}
              />
              <input
                type="number"
                placeholder="Amount DA"
                value={customFinancialEntry.amountDA}
                onChange={(e) => setCustomFinancialEntry({ ...customFinancialEntry, amountDA: e.target.value })}
                style={{
                  padding: '10px',
                  border: '2px solid var(--gray-200)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '14px'
                }}
              />
              <input
                type="number"
                placeholder="Amount GBP"
                value={customFinancialEntry.amountGBP}
                onChange={(e) => setCustomFinancialEntry({ ...customFinancialEntry, amountGBP: e.target.value })}
                style={{
                  padding: '10px',
                  border: '2px solid var(--gray-200)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '14px'
                }}
              />
              <button
                onClick={addCustomFinancial}
                className="btn btn-primary"
                style={{ gridColumn: 'span 4' }}
              >
                ➕ Add Entry
              </button>
            </div>
          </div>
        </div>
      )}

      {/* IELTS Study Plan Tab */}
      {activeSubTab === 'ielts' && (
        <div>
          {/* IELTS Header Info */}
          <div style={{
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            borderRadius: 'var(--radius)',
            padding: '24px',
            marginBottom: '24px',
            color: 'white',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ fontSize: '20px', fontWeight: '700' }}>
                📝 8-Week IELTS Intensive Study Plan
              </div>
              <button
                onClick={() => {
                  setTempIELTSSettings({
                    startDate: journeyData.ielts.startDate,
                    examDate: journeyData.ielts.examDate,
                    dailySchedule: journeyData.ielts.dailySchedule
                  });
                  setEditingIELTSSettings(true);
                }}
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600'
                }}
              >
                ✏️ Edit Schedule
              </button>
            </div>

            {editingIELTSSettings ? (
              <div style={{ background: 'rgba(255,255,255,0.2)', padding: '16px', borderRadius: 'var(--radius)', marginBottom: '16px' }}>
                <div style={{ display: 'grid', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>Start Date</label>
                    <input
                      type="text"
                      value={tempIELTSSettings.startDate}
                      onChange={(e) => setTempIELTSSettings({ ...tempIELTSSettings, startDate: e.target.value })}
                      style={{ width: '100%', padding: '8px', border: 'none', borderRadius: 'var(--radius-sm)' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>Exam Date</label>
                    <input
                      type="text"
                      value={tempIELTSSettings.examDate}
                      onChange={(e) => setTempIELTSSettings({ ...tempIELTSSettings, examDate: e.target.value })}
                      style={{ width: '100%', padding: '8px', border: 'none', borderRadius: 'var(--radius-sm)' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>Daily Schedule</label>
                    <input
                      type="text"
                      value={tempIELTSSettings.dailySchedule}
                      onChange={(e) => setTempIELTSSettings({ ...tempIELTSSettings, dailySchedule: e.target.value })}
                      style={{ width: '100%', padding: '8px', border: 'none', borderRadius: 'var(--radius-sm)' }}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={saveIELTSSettings}
                      style={{
                        flex: 1,
                        background: 'white',
                        color: 'var(--primary)',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: 'var(--radius-sm)',
                        cursor: 'pointer',
                        fontWeight: '600'
                      }}
                    >
                      ✓ Save
                    </button>
                    <button
                      onClick={() => setEditingIELTSSettings(false)}
                      style={{
                        flex: 1,
                        background: 'rgba(255,255,255,0.3)',
                        color: 'white',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: 'var(--radius-sm)',
                        cursor: 'pointer',
                        fontWeight: '600'
                      }}
                    >
                      ✗ Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div>
                  <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '4px' }}>📅 Start Date</div>
                  <div style={{ fontSize: '18px', fontWeight: '700' }}>{journeyData.ielts.startDate}</div>
                </div>
                <div>
                  <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '4px' }}>🎯 Exam Date</div>
                  <div style={{ fontSize: '18px', fontWeight: '700' }}>{journeyData.ielts.examDate}</div>
                </div>
                <div>
                  <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '4px' }}>⏰ Daily Schedule</div>
                  <div style={{ fontSize: '18px', fontWeight: '700' }}>{journeyData.ielts.dailySchedule}</div>
                </div>
                <div>
                  <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '4px' }}>📊 Progress</div>
                  <div style={{ fontSize: '24px', fontWeight: '700' }}>{ieltsProgress}%</div>
                </div>
              </div>
            )}
          </div>

          {/* Weekly Schedule */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {journeyData.ielts.weeks.map(week => {
              const weekProgress = Math.round(
                (week.days.filter(day => day.completed).length / week.days.length) * 100
              );

              return (
                <div 
                  key={week.id}
                  style={{
                    background: 'white',
                    borderRadius: 'var(--radius)',
                    padding: '20px',
                    boxShadow: 'var(--shadow-md)',
                    border: '2px solid var(--gray-100)'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '16px',
                    paddingBottom: '12px',
                    borderBottom: '2px solid var(--gray-100)'
                  }}>
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--primary)', marginBottom: '4px' }}>
                        {week.phase}
                      </div>
                      <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--gray-900)', marginBottom: '4px' }}>
                        {week.weekNum}
                      </div>
                      <div style={{ fontSize: '14px', color: 'var(--gray-600)' }}>
                        {week.focus}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--primary)' }}>
                        {weekProgress}%
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--gray-600)' }}>
                        {week.days.filter(d => d.completed).length}/{week.days.length} days
                      </div>
                    </div>
                  </div>


<div style={{ marginBottom: '16px' }}>
  <button
    onClick={() => setExpandedWeekNotes(prev => ({
      ...prev,
      [`week-${week.id}`]: !prev[`week-${week.id}`]
    }))}
    style={{
      background: 'var(--gray-100)',
      border: 'none',
      padding: '8px 16px',
      borderRadius: 'var(--radius-sm)',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '600',
      color: 'var(--primary)'
    }}
  >
    {expandedWeekNotes[`week-${week.id}`] ? '📝 Hide Notes' : '📝 Add Weekly Notes'}
  </button>
</div>

{expandedWeekNotes[`week-${week.id}`] && (
  <div style={{ marginBottom: '16px' }}>
    <textarea
      value={week.notes || ''}
      onChange={(e) => {
        const updated = {
          ...journeyData,
          ielts: {
            ...journeyData.ielts,
            weeks: journeyData.ielts.weeks.map(w =>
              w.id === week.id ? { ...w, notes: e.target.value } : w
            )
          }
        };
        saveData(updated);
      }}
      placeholder="Add notes about this week's focus, resources, or progress..."
      style={{
        width: '100%',
        padding: '12px',
        border: '2px solid var(--gray-200)',
        borderRadius: 'var(--radius-sm)',
        fontSize: '14px',
        fontFamily: 'inherit',
        resize: 'vertical',
        minHeight: '100px',
        background: 'var(--gray-50)'
      }}
    />
  </div>
)}

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {week.days.map(day => (
                      <div
                        key={day.id}
                        onClick={() => toggleIELTSDay(week.id, day.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '12px',
                          background: day.completed ? 'rgba(16, 185, 129, 0.05)' : 'var(--gray-50)',
                          border: `2px solid ${day.completed ? 'var(--success)' : 'var(--gray-200)'}`,
                          borderRadius: 'var(--radius-sm)',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <div style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          border: `2px solid ${day.completed ? 'var(--success)' : 'var(--gray-300)'}`,
                          background: day.completed ? 'var(--success)' : 'white',
                          color: day.completed ? 'white' : 'var(--gray-400)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '14px',
                          fontWeight: '700',
                          marginRight: '12px',
                          flexShrink: 0
                        }}>
                          {day.completed ? '✓' : '○'}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ 
                            fontSize: '14px', 
                            fontWeight: '600', 
                            color: day.completed ? 'var(--gray-600)' : 'var(--gray-900)',
                            textDecoration: day.completed ? 'line-through' : 'none',
                            marginBottom: '2px'
                          }}>
                            {day.day} - {day.topic}
                          </div>
                          <div style={{ fontSize: '13px', color: 'var(--gray-600)' }}>
                            {day.task}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

