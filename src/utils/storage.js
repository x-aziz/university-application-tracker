// LocalStorage utility functions
// Said Abdelaziz - University Application Tracker

const STORAGE_KEYS = {
    UNIVERSITIES: 'university_tracker_universities',
    DOCUMENTS: 'university_tracker_documents',
    COMMUNICATIONS: 'university_tracker_communications',
    SETTINGS: 'university_tracker_settings'
};

/**
 * Save data to LocalStorage
 * @param {string} key - Storage key from STORAGE_KEYS
 * @param {any} data - Data to store
 */
export const saveToStorage = (key, data) => {
    try {
        const serialized = JSON.stringify(data);
        localStorage.setItem(key, serialized);
        return true;
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        return false;
    }
};

/**
 * Load data from LocalStorage
 * @param {string} key - Storage key from STORAGE_KEYS
 * @param {any} defaultValue - Default value if key doesn't exist
 * @returns {any} Parsed data or defaultValue
 */
export const loadFromStorage = (key, defaultValue = null) => {
    try {
        const serialized = localStorage.getItem(key);
        if (serialized === null) {
            return defaultValue;
        }
        return JSON.parse(serialized);
    } catch (error) {
        console.error('Error loading from localStorage:', error);
        return defaultValue;
    }
};

/**
 * Clear specific key from LocalStorage
 * @param {string} key - Storage key to clear
 */
export const clearStorage = (key) => {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error('Error clearing localStorage:', error);
        return false;
    }
};

/**
 * Clear all tracker data from LocalStorage
 */
export const clearAllTrackerData = () => {
    try {
        Object.values(STORAGE_KEYS).forEach(key => {
            localStorage.removeItem(key);
        });
        return true;
    } catch (error) {
        console.error('Error clearing all data:', error);
        return false;
    }
};

/**
 * Export all tracker data as JSON
 * @returns {object} All tracker data
 */
export const exportData = () => {
    return {
        universities: loadFromStorage(STORAGE_KEYS.UNIVERSITIES, []),
        documents: loadFromStorage(STORAGE_KEYS.DOCUMENTS, []),
        communications: loadFromStorage(STORAGE_KEYS.COMMUNICATIONS, []),
        settings: loadFromStorage(STORAGE_KEYS.SETTINGS, {}),
        exportDate: new Date().toISOString(),
        version: '1.0.0'
    };
};

/**
 * Import data from JSON
 * @param {object} data - Data to import
 * @returns {boolean} Success status
 */
export const importData = (data) => {
    try {
        if (data.universities) {
            saveToStorage(STORAGE_KEYS.UNIVERSITIES, data.universities);
        }
        if (data.documents) {
            saveToStorage(STORAGE_KEYS.DOCUMENTS, data.documents);
        }
        if (data.communications) {
            saveToStorage(STORAGE_KEYS.COMMUNICATIONS, data.communications);
        }
        if (data.settings) {
            saveToStorage(STORAGE_KEYS.SETTINGS, data.settings);
        }
        return true;
    } catch (error) {
        console.error('Error importing data:', error);
        return false;
    }
};

/**
 * Download tracker data as JSON file
 */
export const downloadBackup = () => {
    const data = exportData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `university-tracker-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};

/**
 * Get storage usage info
 * @returns {object} Storage statistics
 */
export const getStorageInfo = () => {
    const universities = loadFromStorage(STORAGE_KEYS.UNIVERSITIES, []);
    const documents = loadFromStorage(STORAGE_KEYS.DOCUMENTS, []);
    const communications = loadFromStorage(STORAGE_KEYS.COMMUNICATIONS, []);
    
    const totalSize = JSON.stringify({
        universities,
        documents,
        communications
    }).length;
    
    return {
        universitiesCount: universities.length,
        documentsCount: documents.length,
        communicationsCount: communications.length,
        totalSizeBytes: totalSize,
        totalSizeKB: (totalSize / 1024).toFixed(2)
    };
};

export { STORAGE_KEYS };