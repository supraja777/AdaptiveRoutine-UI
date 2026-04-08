// src/constants/routines.ts

export interface RoutineConfig {
  label: string;
  wallpaper: string;
  allowedApps: string[]; // We can use this to hide/show apps later
  themeColor: string;
}

export const ROUTINE_MAP: Record<string, RoutineConfig> = {
  exercise: {
    label: 'Morning Exercise',
    wallpaper: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438', 
    allowedApps: ['Music', 'Maps', 'Camera'],
    themeColor: '#FF6D00',
  },
  work: {
    label: 'Focused Work',
    wallpaper: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174',
    allowedApps: ['Mail', 'Notes', 'Settings'],
    themeColor: '#4285F4',
  },
  relax: {
    label: 'Relaxation',
    wallpaper: 'https://images.unsplash.com/photo-1518057111178-44a106bad636',
    allowedApps: ['Photos', 'Music', 'Browser'],
    themeColor: '#00C853',
  },
  // Default fallback for unassigned hours
  default: {
    label: 'Standard Mode',
    wallpaper: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe',
    allowedApps: ['Mail', 'Photos', 'Settings', 'Browser', 'Notes', 'Music', 'Chat', 'Maps', 'Camera'],
    themeColor: '#1a1a1a',
  }
};