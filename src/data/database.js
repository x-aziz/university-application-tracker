




import { db } from '../firebase/config';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

// ══════════════════════════════════════════════════════════════
// UNIVERSITY DATA - Initial Data (same as before)
// ══════════════════════════════════════════════════════════════


export const UNIVERSITIES = [
  // Manchester
  {
    id: 1,
    name: "University of Salford",
    city: "Manchester",
    specialty: "MSc Entrepreneurship & Innovation",
    fees: "£16,980",
    ielts: "6.0",
    duolingo: "105",
    intake: "September 2026",
    deadline: "31 July 2026",
    depositAmount: "£5500",
    link: "https://www.salford.ac.uk/courses/postgraduate/entrepreneurship-and-innovation",
    status: "not-applied",
    documents: [],
    notes: "",
    casReceived: false,
    depositPaid: false,
    visaApplied: false
  },  
  // Leeds
  {
    id: 2,
    name: "Leeds Beckett University",
    city: "Leeds",
    specialty: "MSc Entrepreneurship and Business Development",
    fees: "£18,440",
    ielts: "6.0",
    duolingo: "105",
    intake: "September 2026",
    deadline: "15 August 2026",
    depositAmount: "£5,500",
    link: "https://www.leedsbeckett.ac.uk/courses/entrepreneurship-business-development-msc/",
    status: "not-applied",
    documents: [],
    notes: "",
    casReceived: false,
    depositPaid: false,
    visaApplied: false
  },
  {
    id: 3,
    name: "Leeds Trinity University",
    city: "Leeds",
    specialty: "MBA",
    fees: "£15,250",
    ielts: "6.0",
    duolingo: "105",
    intake: "September 2026 / January 2027",
    deadline: "Rolling admissions",
    depositAmount: "£5,500",
    link: "https://www.leedstrinity.ac.uk/courses/postgraduate/mba/",
    status: "not-applied",
    documents: [],
    notes: "",
    casReceived: false,
    depositPaid: false,
    visaApplied: false
  },
  
  // Birmingham
  {
    id: 4,
    name: "Birmingham City University",
    city: "Birmingham",
    specialty: "MSc Management and Entrepreneurship",
    fees: "£18,970",
    ielts: "6.0",
    duolingo: "105",
    intake: "September 2026",
    deadline: "31 July 2026",
    depositAmount: "£5,500",
    link: "https://www.bcu.ac.uk/courses/management-and-entrepreneurship-msc-2026-27",
    status: "not-applied",
    documents: [],
    notes: "",
    casReceived: false,
    depositPaid: false,
    visaApplied: false
  },
  {
    id: 5,
    name: "University College Birmingham",
    city: "Birmingham",
    specialty: "MSc Enterprise Management",
    fees: "£17,500",
    ielts: "6.0",
    duolingo: "105",
    intake: "September 2026 / January 2027",
    deadline: "Rolling admissions",
    depositAmount: "£5,500",
    link: "https://www.ucb.ac.uk/university/postgraduate/courses/enterprise-management-msc-pgdip/",
    status: "not-applied",
    documents: [],
    notes: "",
    casReceived: false,
    depositPaid: false,
    visaApplied: false
  },
  
  // Sheffield
  {
    id: 6,
    name: "Sheffield Hallam University",
    city: "Sheffield",
    specialty: "MSc Entrepreneurship & Innovation Management",
    fees: "£18,600",
    ielts: "6.0",
    duolingo: "105",
    intake: "September 2026",
    deadline: "31 August 2026",
    depositAmount: "£5,500",
    link: "https://www.shu.ac.uk/courses/business-and-management/msc-international-business-management/",
    status: "not-applied",
    documents: [],
    notes: "",
    casReceived: false,
    depositPaid: false,
    visaApplied: false
  },
  
  // Leicester
  {
    id: 7,
    name: "De Montfort University (DMU)",
    city: "Leicester",
    specialty: "MSc International Business & Entrepreneurship",
    fees: "£19,000",
    ielts: "6.0",
    duolingo: "105",
    intake: "September 2026",
    deadline: "15 August 2026",
    depositAmount: "£5,500",
    link: "https://www.dmu.ac.uk/study/courses/postgraduate-courses/international-business-and-management-msc-degree/international-business-and-management-msc.aspx",
    status: "not-applied",
    documents: [],
    notes: "",
    casReceived: false,
    depositPaid: false,
    visaApplied: false
  },
  
  // Cardiff
  {
    id: 8,
    name: "Cardiff Metropolitan University",
    city: "Cardiff",
    specialty: "MSc Entrepreneurship & Innovation Management",
    fees: "£15,000",
    ielts: "6.0",
    duolingo: "105",
    intake: "September 2026",
    deadline: "31 July 2026",
    depositAmount: "£5,500",
    link: "https://www.cardiffmet.ac.uk/courses/postgraduate/msc-entrepreneurship-and-innovation-management/",
    status: "not-applied",
    documents: [],
    notes: "",
    casReceived: false,
    depositPaid: false,
    visaApplied: false
  },
  
  // Glasgow
  {
    id: 9,
    name: "University of West of Scotland",
    city: "Glasgow",
    specialty: "MBA / International Management",
    fees: "£15,250",
    ielts: "6.0",
    duolingo: "105",
    intake: "September 2026 / January 2027",
    deadline: "Rolling admissions",
    depositAmount: "£5,500",
    link: "https://www.uws.ac.uk/study/postgraduate/postgraduate-course-search/master-of-business-administration-mba-with-enterprise/",
    status: "not-applied",
    documents: [],
    notes: "",
    casReceived: false,
    depositPaid: false,
    visaApplied: false
  },
  
  // Wrexham (Cheapest!)
  {
    id: 10,
    name: "Wrexham University",
    city: "Wrexham",
    specialty: "MBA Master of Business Administration",
    fees: "£11,000",
    ielts: "6.0",
    duolingo: "100",
    intake: "September 2026",
    deadline: "Rolling admissions",
    depositAmount: "£5,500",
    link: "https://wrexham.ac.uk/courses/postgraduate-courses/mba/",
    status: "not-applied",
    documents: [],
    notes: "",
    casReceived: false,
    depositPaid: false,
    visaApplied: false
  },
  {
    id: 11,
    name: "Bristol University",
    city: "Bristol",
    specialty: "Business Management",
    fees: "£17,000",
    ielts: "6.0",
    duolingo: "100",
    intake: "September 2026",
    deadline: "Rolling admissions",
    depositAmount: "£5,500",
    link: "https://courses.uwe.ac.uk/N20B12/business-management",
    status: "not-applied",
    documents: [],
    notes: "",
    casReceived: false,
    depositPaid: false,
    visaApplied: false
  }
];

export const DOCUMENT_TYPES = [
  { 
    id: "secondary-cert",
    name: "Secondary School Certificate transcripts", 
    description: "High school diploma or equivalent",
    required: true
  },
  { 
    id: "bac-releve",
    name: "Baccalaureate Results/Transcript", 
    description: "BAC grades transcript",
    required: true
  },
  { 
    id: "licence-releve",
    name: "Bsc Results (3 years)", 
    description: "University transcript for bachelor's degree",
    required: true
  },
  { 
    id: "degree-cert",
    name: "Bsc Degree Certificate & Transcript", 
    description: "Official degree certificate Bsc",
    required: true
  },
  { 
    id: "bac-cert",
    name: "Certificate of Baccalaureate (optional)", 
    description: "Baccalaureate certificate if available",
    required: false
  },
  { 
    id: "experience-cert",
    name: "Certificate of Experience (optional)", 
    description: "Work experience letters",
    required: false
  },
  { 
    id: "cv",
    name: "CV", 
    description: "Updated curriculum vitae",
    required: true
  },
  { 
    id: "passport",
    name: "International Passport", 
    description: "Valid passport copy",
    required: true
  },
  { 
    id: "personal-statement",
    name: "Personal Statement", 
    description: "Motivation letter",
    required: true
  },
  { 
    id: "recommendation",
    name: "Recommendation Letter", 
    description: "1-2 academic or professional references",
    required: true
  },
  { 
    id: "ielts",
    name: "IELTS/Duolingo Certificate", 
    description: "English language test certificate",
    required: true
  },
  { 
    id: "financial-proof",
    name: "Financial Evidence", 
    description: "Bank statements or sponsor letter",
    required: true
  }
];

// ══════════════════════════════════════════════════════════════
// FIREBASE FUNCTIONS - Replace LocalStorage
// ══════════════════════════════════════════════════════════════

const TRACKER_DOC_ID = 'said-application'; // Your unique tracker ID

// Initialize documents for universities
const initializeDocuments = () => {
  return DOCUMENT_TYPES.map(doc => ({
    id: doc.id,
    completed: false,
    uploadedDate: null,
    notes: "",
    modifiedBy: null,
    modifiedAt: null
  }));
};

// Save universities to Firebase
export const saveUniversities = async (universities) => {
  try {
    const docRef = doc(db, 'trackers', TRACKER_DOC_ID);
    await setDoc(docRef, { 
      universities,
      lastModified: new Date().toISOString()
    });
    console.log('✅ Saved to Firebase');
  } catch (error) {
    console.error('❌ Firebase save error:', error);
  }
};

// Load universities from Firebase
export const loadUniversities = async () => {
  try {
    const docRef = doc(db, 'trackers', TRACKER_DOC_ID);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return data.universities.map(uni => ({
        ...uni,
        documents: uni.documents || initializeDocuments()
      }));
    } else {
      // First time - initialize with default data
      const initialUniversities = UNIVERSITIES.map(uni => ({
        ...uni,
        documents: initializeDocuments()
      }));
      await setDoc(docRef, { 
        universities: initialUniversities,
        createdAt: new Date().toISOString()
      });
      return initialUniversities;
    }
  } catch (error) {
    console.error('❌ Firebase load error:', error);
    return UNIVERSITIES.map(uni => ({
      ...uni,
      documents: initializeDocuments()
    }));
  }
};

// Real-time listener for changes
export const subscribeToUniversities = (callback) => {
  const docRef = doc(db, 'trackers', TRACKER_DOC_ID);
  
  return onSnapshot(docRef, (doc) => {
    if (doc.exists()) {
      const data = doc.data();
      callback(data.universities);
    }
  }, (error) => {
    console.error('❌ Firebase subscription error:', error);
  });
};

// Communications (same Firebase pattern)
export const saveCommunications = async (communications) => {
  try {
    const docRef = doc(db, 'trackers', TRACKER_DOC_ID);
    const docSnap = await getDoc(docRef);
    const currentData = docSnap.exists() ? docSnap.data() : {};
    
    await setDoc(docRef, {
      ...currentData,
      communications,
      lastModified: new Date().toISOString()
    }, { merge: true });
  } catch (error) {
    console.error('❌ Firebase save communications error:', error);
  }
};

export const loadCommunications = async () => {
  try {
    const docRef = doc(db, 'trackers', TRACKER_DOC_ID);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists() && docSnap.data().communications) {
      return docSnap.data().communications;
    }
    return [];
  } catch (error) {
    console.error('❌ Firebase load communications error:', error);
    return [];
  }
};

// Utility functions (keep as is)
export const groupUniversitiesByCity = (universities) => {
  const grouped = {};
  universities.forEach(uni => {
    if (!grouped[uni.city]) {
      grouped[uni.city] = [];
    }
    grouped[uni.city].push(uni);
  });
  return grouped;
};

export const getStatusColor = (status) => {
  const colors = {
    'not-applied': 'bg-gray-500',
    'documents-pending': 'bg-yellow-500',
    'submitted': 'bg-blue-500',
    'accepted': 'bg-green-500',
    'rejected': 'bg-red-500'
  };
  return colors[status] || 'bg-gray-500';
};

export const getStatusLabel = (status) => {
  const labels = {
    'not-applied': 'Not Applied',
    'documents-pending': 'Documents Pending',
    'submitted': 'Submitted',
    'accepted': 'Accepted',
    'rejected': 'Rejected'
  };
  return labels[status] || 'Unknown';
};

export const calculateDocumentProgress = (university) => {
  if (!university || !university.documents) return 0;
  const completed = university.documents.filter(doc => doc.completed).length;
  const total = university.documents.length;
  return total > 0 ? Math.round((completed / total) * 100) : 0;
};

export const calculateOverallProgress = (universities) => {
  if (!universities || universities.length === 0) return 0;
  const totalDocs = universities.reduce((sum, uni) => 
    sum + (uni.documents ? uni.documents.length : 0), 0);
  const completedDocs = universities.reduce((sum, uni) => 
    sum + (uni.documents ? uni.documents.filter(d => d.completed).length : 0), 0);
  return totalDocs > 0 ? Math.round((completedDocs / totalDocs) * 100) : 0;
};

export const clearAllData = () => {
  console.warn('⚠️ clearAllData disabled with Firebase');
};







// import { db } from '../firebase/config';
// import { 
//   collection, 
//   doc, 
//   getDocs, 
//   setDoc, 
//   updateDoc, 
//   deleteDoc,
//   onSnapshot 
// } from 'firebase/firestore';








// // ══════════════════════════════════════════════════════════════
// // DOCUMENT TYPES - All Required Application Documents
// // ══════════════════════════════════════════════════════════════

// // ══════════════════════════════════════════════════════════════
// // DOCUMENT TYPES - Required for All Applications
// // ══════════════════════════════════════════════════════════════

// export const DOCUMENT_TYPES = [
//   { 
//     id: "secondary-cert",
//     name: "Secondary School Certificate transcripts", 
//     description: "High school diploma or equivalent",
//     required: true
//   },
//   { 
//     id: "bac-releve",
//     name: "Baccalaureate Results/Transcript", 
//     description: "BAC grades transcript",
//     required: true
//   },
//   { 
//     id: "licence-releve",
//     name: "Bsc Results (3 years)", 
//     description: "University transcript for bachelor's degree",
//     required: true
//   },
//   { 
//     id: "degree-cert",
//     name: "Bsc Degree Certificate & Transcript", 
//     description: "Official degree certificate Bsc",
//     required: true
//   },
//   { 
//     id: "bac-cert",
//     name: "Certificate of Baccalaureate (optional)", 
//     description: "Baccalaureate certificate if available",
//     required: false
//   },
//   { 
//     id: "experience-cert",
//     name: "Certificate of Experience (optional)", 
//     description: "Work experience letters",
//     required: false
//   },
//   { 
//     id: "cv",
//     name: "CV", 
//     description: "Updated curriculum vitae",
//     required: true
//   },
//   { 
//     id: "passport",
//     name: "International Passport", 
//     description: "Valid passport copy",
//     required: true
//   },
//   { 
//     id: "personal-statement",
//     name: "Personal Statement", 
//     description: "Motivation letter",
//     required: true
//   },
//   { 
//     id: "recommendation",
//     name: "Recommendation Letter", 
//     description: "1-2 academic or professional references",
//     required: true
//   },
//   { 
//     id: "ielts",
//     name: "IELTS/Duolingo Certificate", 
//     description: "English language test certificate",
//     required: true
//   },
//   { 
//     id: "financial-proof",
//     name: "Financial Evidence", 
//     description: "Bank statements or sponsor letter",
//     required: true
//   }
// ];


// // ══════════════════════════════════════════════════════════════
// // COMMUNICATIONS - Template Structure
// // ══════════════════════════════════════════════════════════════

// export const INITIAL_COMMUNICATIONS = [];


// // ══════════════════════════════════════════════════════════════
// // LOCALSTORAGE FUNCTIONS - Persistent Data Management
// // ══════════════════════════════════════════════════════════════

// const STORAGE_KEYS = {
//   UNIVERSITIES: 'universities_data',
//   DOCUMENTS: 'documents_data',
//   COMMUNICATIONS: 'communications_data'
// };

// // ─────────────────────────────────────────────────────────────
// // Save Functions
// // ─────────────────────────────────────────────────────────────

// export const saveUniversities = (universities) => {
//   localStorage.setItem(STORAGE_KEYS.UNIVERSITIES, JSON.stringify(universities));
// };

// export const saveDocuments = (documents) => {
//   localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(documents));
// };

// export const saveCommunications = (communications) => {
//   localStorage.setItem(STORAGE_KEYS.COMMUNICATIONS, JSON.stringify(communications));
// };

// // ─────────────────────────────────────────────────────────────
// // Load Functions (with fallback to initial data)
// // ─────────────────────────────────────────────────────────────



// export const loadUniversities = () => {
//   const saved = localStorage.getItem(STORAGE_KEYS.UNIVERSITIES);
//   if (saved) {
//     const parsed = JSON.parse(saved);
//     // Ensure each university has documents array
//     return parsed.map(uni => ({
//       ...uni,
//       documents: uni.documents || DOCUMENT_TYPES.map(doc => ({
//         id: doc.id,
//         completed: false,
//         uploadedDate: null,
//         notes: ""
//       }))
//     }));
//   }
//   // Initialize with empty documents for each university
//   return UNIVERSITIES.map(uni => ({
//     ...uni,
//     documents: DOCUMENT_TYPES.map(doc => ({
//       id: doc.id,
//       completed: false,
//       uploadedDate: null,
//       notes: ""
//     }))
//   }));
// };

// export const loadDocuments = () => {
//   return DOCUMENT_TYPES;
// };

// export const loadCommunications = () => {
//   const saved = localStorage.getItem(STORAGE_KEYS.COMMUNICATIONS);
//   return saved ? JSON.parse(saved) : INITIAL_COMMUNICATIONS;
// };

// // ─────────────────────────────────────────────────────────────
// // Clear All Data (Reset Function)
// // ─────────────────────────────────────────────────────────────

// export const clearAllData = () => {
//   localStorage.removeItem(STORAGE_KEYS.UNIVERSITIES);
//   localStorage.removeItem(STORAGE_KEYS.DOCUMENTS);
//   localStorage.removeItem(STORAGE_KEYS.COMMUNICATIONS);
// };
// // ══════════════════════════════════════════════════════════════
// // UTILITY FUNCTIONS
// // ══════════════════════════════════════════════════════════════

// export const groupUniversitiesByCity = (universities) => {
//   const grouped = {};
//   universities.forEach(uni => {
//     if (!grouped[uni.city]) {
//       grouped[uni.city] = [];
//     }
//     grouped[uni.city].push(uni);
//   });
//   return grouped;
// };

// export const getStatusColor = (status) => {
//   const colors = {
//     'not-applied': 'bg-gray-500',
//     'documents-pending': 'bg-yellow-500',
//     'submitted': 'bg-blue-500',
//     'accepted': 'bg-green-500',
//     'rejected': 'bg-red-500'
//   };
//   return colors[status] || 'bg-gray-500';
// };

// export const getStatusLabel = (status) => {
//   const labels = {
//     'not-applied': 'Not Applied',
//     'documents-pending': 'Documents Pending',
//     'submitted': 'Submitted',
//     'accepted': 'Accepted',
//     'rejected': 'Rejected'
//   };
//   return labels[status] || 'Unknown';
// };

// export const calculateDocumentProgress = (university) => {
//   if (!university || !university.documents) return 0;
//   const completed = university.documents.filter(doc => doc.completed).length;
//   const total = university.documents.length;
//   return total > 0 ? Math.round((completed / total) * 100) : 0;
// };

// export const calculateOverallProgress = (universities) => {
//   if (!universities || universities.length === 0) return 0;
//   const totalDocs = universities.reduce((sum, uni) => 
//     sum + (uni.documents ? uni.documents.length : 0), 0);
//   const completedDocs = universities.reduce((sum, uni) => 
//     sum + (uni.documents ? uni.documents.filter(d => d.completed).length : 0), 0);
//   return totalDocs > 0 ? Math.round((completedDocs / totalDocs) * 100) : 0;
// };

// export const getDaysUntilDeadline = (deadlineStr) => {
//   if (deadlineStr === "Rolling admissions") return null;
//   const deadline = new Date(deadlineStr);
//   const today = new Date();
//   const diff = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
//   return diff;
// };

// export const getDocumentInfo = (docId) => {
//   return DOCUMENT_TYPES.find(doc => doc.id === docId);
// };


