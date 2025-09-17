// Local Storage helpers for AiSuite frontend demo

const STORAGE_KEYS = {
  HISTORY: 'aisuite_history',
  SETTINGS: 'aisuite_settings',
  DEV_MODE: 'aisuite_dev_mode'
};

// History management
export const saveToHistory = (entry) => {
  try {
    const history = getHistory();
    const newEntry = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      ...entry
    };
    
    // Keep only last 20 entries
    const updatedHistory = [newEntry, ...history].slice(0, 20);
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updatedHistory));
    
    return newEntry;
  } catch (error) {
    console.error('Failed to save to history:', error);
    return null;
  }
};

export const getHistory = () => {
  try {
    const history = localStorage.getItem(STORAGE_KEYS.HISTORY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Failed to load history:', error);
    return [];
  }
};

export const removeFromHistory = (id) => {
  try {
    const history = getHistory();
    const filteredHistory = history.filter(entry => entry.id !== id);
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(filteredHistory));
    return true;
  } catch (error) {
    console.error('Failed to remove from history:', error);
    return false;
  }
};

export const clearHistory = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.HISTORY);
    return true;
  } catch (error) {
    console.error('Failed to clear history:', error);
    return false;
  }
};

// Settings management
export const getSettings = () => {
  try {
    const settings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return settings ? JSON.parse(settings) : {
      ttsEnabled: true,
      autoAllowMic: false,
      theme: 'retro',
      notifications: true
    };
  } catch (error) {
    console.error('Failed to load settings:', error);
    return {
      ttsEnabled: true,
      autoAllowMic: false,
      theme: 'retro',
      notifications: true
    };
  }
};

export const updateSettings = (newSettings) => {
  try {
    const currentSettings = getSettings();
    const updatedSettings = { ...currentSettings, ...newSettings };
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updatedSettings));
    return updatedSettings;
  } catch (error) {
    console.error('Failed to update settings:', error);
    return null;
  }
};

// Dev Mode management
export const getDevMode = () => {
  try {
    const devMode = localStorage.getItem(STORAGE_KEYS.DEV_MODE);
    return devMode === null ? true : devMode === 'true'; // Default to true for demo
  } catch (error) {
    console.error('Failed to load dev mode setting:', error);
    return true;
  }
};

export const setDevMode = (enabled) => {
  try {
    localStorage.setItem(STORAGE_KEYS.DEV_MODE, enabled.toString());
    return true;
  } catch (error) {
    console.error('Failed to set dev mode:', error);
    return false;
  }
};

// Data export/import utilities
export const exportData = () => {
  try {
    const data = {
      history: getHistory(),
      settings: getSettings(),
      devMode: getDevMode(),
      exportDate: new Date().toISOString(),
      version: '1.0.0'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `aisuite-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
    return true;
  } catch (error) {
    console.error('Failed to export data:', error);
    return false;
  }
};

export const importData = async (file) => {
  try {
    const text = await file.text();
    const data = JSON.parse(text);
    
    if (data.history) {
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(data.history));
    }
    
    if (data.settings) {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(data.settings));
    }
    
    if (typeof data.devMode === 'boolean') {
      setDevMode(data.devMode);
    }
    
    return true;
  } catch (error) {
    console.error('Failed to import data:', error);
    return false;
  }
};

// Sample data seeding for demo
export const seedSampleData = () => {
  const existingHistory = getHistory();
  
  if (existingHistory.length === 0) {
    const sampleHistory = [
      {
        id: '1',
        timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        tool: 'task-scheduler',
        excerpt: 'Team standup meeting scheduled for tomorrow',
        data: {
          title: 'Daily Standup',
          date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
          time: '09:00',
          duration_minutes: 30
        }
      },
      {
        id: '2',
        timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
        tool: 'text-summarizer',
        excerpt: 'Summarized quarterly report document',
        data: {
          summary: 'Q3 performance showed 15% growth with strong customer satisfaction metrics.',
          wordCount: 1250
        }
      },
      {
        id: '3',
        timestamp: new Date(Date.now() - 10800000).toISOString(), // 3 hours ago
        tool: 'code-explainer',
        excerpt: 'Explained React component structure',
        data: {
          explanation: 'This component implements a reusable UI element with state management.',
          language: 'javascript'
        }
      }
    ];
    
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(sampleHistory));
  }
};
