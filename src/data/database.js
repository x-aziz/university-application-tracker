import { db } from '../firebase/config'; 
import { doc, getDoc, setDoc, onSnapshot, collection, getDocs, addDoc, updateDoc, query, where } from 'firebase/firestore';

// ══════════════════════════════════════════════════════════════
// AUTHENTICATION FUNCTIONS
// ══════════════════════════════════════════════════════════════

export const validateAccessCode = async (code) => {
  try {
    const accessCodesRef = collection(db, 'access_codes');
    const q = query(accessCodesRef, where('code', '==', code));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return { valid: false, active: false };
    }
    
    const docData = querySnapshot.docs[0].data();
    return {
      valid: true,
      active: docData.active || false,
      studentName: docData.studentName,
      program: docData.program,
      createdAt: docData.createdAt,
      expiresAt: docData.expiresAt
    };
  } catch (error) {
    console.error('❌ Error validating access code:', error);
    return { valid: false, active: false };
  }
};

export const getAllAccessCodes = async () => {
  try {
    const accessCodesRef = collection(db, 'access_codes');
    const querySnapshot = await getDocs(accessCodesRef);
    
    const codes = [];
    querySnapshot.forEach((doc) => {
      codes.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return codes;
  } catch (error) {
    console.error('❌ Error getting access codes:', error);
    return [];
  }
};

export const createAccessCode = async (codeData) => {
  try {
    const accessCodesRef = collection(db, 'access_codes');
    
    // Check if code already exists
    const q = query(accessCodesRef, where('code', '==', codeData.code));
    const existing = await getDocs(q);
    
    if (!existing.empty) {
      throw new Error('Code already exists');
    }
    
    const newCode = {
      code: codeData.code,
      studentName: codeData.studentName,
      program: codeData.program,
      active: true,
      createdAt: new Date().toISOString(),
      expiresAt: codeData.expiresAt || null
    };
    
    await addDoc(accessCodesRef, newCode);
    console.log('✅ Created new access code');
    return { success: true };
  } catch (error) {
    console.error('❌ Error creating access code:', error);
    return { success: false, error: error.message };
  }
};

export const toggleCodeStatus = async (codeId, currentStatus) => {
  try {
    const codeRef = doc(db, 'access_codes', codeId);
    await updateDoc(codeRef, {
      active: !currentStatus
    });
    console.log('✅ Toggled code status');
    return { success: true };
  } catch (error) {
    console.error('❌ Error toggling code status:', error);
    return { success: false };
  }
};

export const saveProfile = async (profileData) => {
  try {
    const docRef = doc(db, 'trackers', FIREBASE_DOC_ID);
    await setDoc(docRef, { 
      profile: {
        ...profileData,
        lastActive: new Date().toISOString()
      }
    }, { merge: true });
    console.log('💾 Saved profile to Firebase');
    return true;
  } catch (error) {
    console.error('❌ Error saving profile:', error);
    return false;
  }
};

export const loadProfile = async () => {
  try {
    const docRef = doc(db, 'trackers', FIREBASE_DOC_ID);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return data.profile || null;
    }
    return null;
  } catch (error) {
    console.error('❌ Error loading profile:', error);
    return null;
  }
};

// ══════════════════════════════════════════════════════════════
// FINAL UNIVERSITY FUNCTIONS (NEW!)
// ══════════════════════════════════════════════════════════════

export const saveFinalUniversity = async (universityId) => {
  try {
    const docRef = doc(db, 'trackers', FIREBASE_DOC_ID);
    await setDoc(docRef, { 
      finalUniversityId: universityId,
      finalUniversitySetAt: new Date().toISOString()
    }, { merge: true });
    console.log('💾 Saved final university to Firebase');
    return true;
  } catch (error) {
    console.error('❌ Error saving final university:', error);
    return false;
  }
};

export const loadFinalUniversityId = async () => {
  try {
    const docRef = doc(db, 'trackers', FIREBASE_DOC_ID);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return data.finalUniversityId || null;
    }
    return null;
  } catch (error) {
    console.error('❌ Error loading final university:', error);
    return null;
  }
};

// ══════════════════════════════════════════════════════════════
// DOCUMENT TYPES - All Required Application Documents
// ══════════════════════════════════════════════════════════════

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
// FIREBASE FUNCTIONS - Universities
// ══════════════════════════════════════════════════════════════

const FIREBASE_DOC_ID = 'said-application';

export const loadUniversities = async () => {
  try {
    const docRef = doc(db, 'trackers', FIREBASE_DOC_ID);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log('✅ Loaded universities from Firebase:', data.universities?.length || 0);
      return data.universities || [];
    } else {
      console.log('📝 No data found, returning empty array');
      return [];
    }
  } catch (error) {
    console.error('❌ Error loading universities:', error);
    return [];
  }
};

export const saveUniversities = async (universities) => {
  try {
    const docRef = doc(db, 'trackers', FIREBASE_DOC_ID);
    await setDoc(docRef, { universities }, { merge: true });
    console.log('💾 Saved universities to Firebase');
    return true;
  } catch (error) {
    console.error('❌ Error saving universities:', error);
    return false;
  }
};

export const subscribeToUniversities = (callback) => {
  const docRef = doc(db, 'trackers', FIREBASE_DOC_ID);
  
  return onSnapshot(docRef, (doc) => {
    if (doc.exists()) {
      const data = doc.data();
      callback(data.universities || []);
    }
  }, (error) => {
    console.error('❌ Error in real-time listener:', error);
  });
};

// ══════════════════════════════════════════════════════════════
// FIREBASE FUNCTIONS - Communications
// ══════════════════════════════════════════════════════════════

export const loadCommunications = async () => {
  try {
    const docRef = doc(db, 'trackers', FIREBASE_DOC_ID);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return data.communications || [];
    }
    return [];
  } catch (error) {
    console.error('❌ Error loading communications:', error);
    return [];
  }
};

export const saveCommunications = async (communications) => {
  try {
    const docRef = doc(db, 'trackers', FIREBASE_DOC_ID);
    await setDoc(docRef, { communications }, { merge: true });
    console.log('💾 Saved communications to Firebase');
    return true;
  } catch (error) {
    console.error('❌ Error saving communications:', error);
    return false;
  }
};

// ══════════════════════════════════════════════════════════════
// FIREBASE FUNCTIONS - Journey Data (NEW!)
// ══════════════════════════════════════════════════════════════

export const loadJourneyData = async () => {
  try {
    const docRef = doc(db, 'trackers', FIREBASE_DOC_ID);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log('✅ Loaded journey data from Firebase');
      return data.journeyData || null;
    }
    return null;
  } catch (error) {
    console.error('❌ Error loading journey data:', error);
    return null;
  }
};

export const saveJourneyData = async (journeyData) => {
  try {
    const docRef = doc(db, 'trackers', FIREBASE_DOC_ID);
    await setDoc(docRef, { journeyData }, { merge: true });
    console.log('💾 Saved journey data to Firebase');
    return true;
  } catch (error) {
    console.error('❌ Error saving journey data:', error);
    return false;
  }
};

export const subscribeToJourneyData = (callback) => {
  const docRef = doc(db, 'trackers', FIREBASE_DOC_ID);
  
  return onSnapshot(docRef, (doc) => {
    if (doc.exists()) {
      const data = doc.data();
      callback(data.journeyData || null);
    }
  }, (error) => {
    console.error('❌ Error in journey data listener:', error);
  });
};

// ══════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ══════════════════════════════════════════════════════════════

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

export const getDaysUntilDeadline = (deadlineStr) => {
  if (deadlineStr === "Rolling admissions") return null;
  const deadline = new Date(deadlineStr);
  const today = new Date();
  const diff = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
  return diff;
};

export const getDocumentInfo = (docId) => {
  return DOCUMENT_TYPES.find(doc => doc.id === docId);
};

// ══════════════════════════════════════════════════════════════
// JOURNEY PROGRESS CALCULATION (NEW!)
// ══════════════════════════════════════════════════════════════

export const calculateJourneyProgress = (journeyData) => {
  if (!journeyData) return 0;
  
  const roadmapProgress = journeyData.roadmap 
    ? Math.round((journeyData.roadmap.filter(item => item.completed).length / journeyData.roadmap.length) * 100)
    : 0;
  
  const financialProgress = journeyData.financial
    ? Math.round((journeyData.financial.filter(item => item.status === 'done').length / journeyData.financial.length) * 100)
    : 0;
  
  const ieltsProgress = journeyData.ielts
    ? Math.round(
        (journeyData.ielts.weeks.reduce((sum, week) => 
          sum + week.days.filter(day => day.completed).length, 0
        ) / journeyData.ielts.weeks.reduce((sum, week) => sum + week.days.length, 0)) * 100
      )
    : 0;
  
  return Math.round((roadmapProgress + financialProgress + ieltsProgress) / 3);
};