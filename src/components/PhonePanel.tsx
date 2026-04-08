import React, { useState, useEffect } from 'react';
import { ROUTINE_MAP, RoutineConfig } from '../constants/routines';

interface PhonePanelProps {
  userSchedule: Record<number, string>;
}

const PhonePanel: React.FC<PhonePanelProps> = ({ userSchedule }) => {
  const [currentHour, setCurrentHour] = useState(new Date().getHours());
  const [activeConfig, setActiveConfig] = useState<RoutineConfig>(ROUTINE_MAP.default);

  // 1. Logic to sync the phone state with the current hour and user's schedule
  useEffect(() => {
    const updatePhoneState = () => {
      const hour = new Date().getHours();
      setCurrentHour(hour);

      // Look up the routine ID assigned by the user for this hour
      const assignedRoutineId = userSchedule[hour];
      
      // If the user assigned a routine, get its config; otherwise, use default
      if (assignedRoutineId && ROUTINE_MAP[assignedRoutineId]) {
        setActiveConfig(ROUTINE_MAP[assignedRoutineId]);
      } else {
        setActiveConfig(ROUTINE_MAP.default);
      }
    };

    updatePhoneState();
    const interval = setInterval(updatePhoneState, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [userSchedule]); // Re-run if the user changes their routine map

  return (
    <div style={containerStyle}>
      <div style={phoneBezelStyle}>
        {/* Physical Notch */}
        <div style={notchStyle} />

        {/* The "Adaptable" Screen */}
        <div style={{ 
          ...screenStyle, 
          backgroundImage: `url(${activeConfig.wallpaper})`,
          borderColor: activeConfig.themeColor 
        }}>
          
          {/* Status Bar */}
          <div style={statusBarStyle}>
            <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            <span style={{ fontWeight: 'bold' }}>{activeConfig.label.toUpperCase()}</span>
            <span>🔋</span>
          </div>

          {/* Apps Grid - Filtered by activeConfig.allowedApps */}
          <div style={gridStyle}>
            {activeConfig.allowedApps.map((appName) => (
              <div key={appName} style={appItemStyle}>
                <div style={{
                  ...appIconBase,
                  backgroundColor: activeConfig.themeColor // Themed icons
                }} />
                <span style={appTextStyle}>{appName}</span>
              </div>
            ))}
          </div>

          {/* Suggestion Toast */}
          <div style={{...toastStyle, backgroundColor: activeConfig.themeColor}}>
            Mode: {activeConfig.label}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Styles ---

const containerStyle: React.CSSProperties = {
  flex: 1,
  backgroundColor: '#f0f0f2',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRight: '1px solid #ddd',
};

const phoneBezelStyle: React.CSSProperties = {
  width: '320px',
  height: '650px',
  backgroundColor: '#1a1a1a',
  borderRadius: '45px',
  padding: '12px',
  position: 'relative',
  boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
};

const screenStyle: React.CSSProperties = {
  height: '100%',
  borderRadius: '35px',
  overflow: 'hidden',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.8s ease', // Smooth transition when routine changes
  border: '2px solid transparent',
};

const statusBarStyle: React.CSSProperties = {
  height: '50px',
  padding: '0 25px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  color: 'white',
  fontSize: '12px',
  backgroundColor: 'rgba(0,0,0,0.3)',
  backdropFilter: 'blur(5px)',
};

const gridStyle: React.CSSProperties = {
  flex: 1,
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '20px',
  padding: '30px 20px',
  alignContent: 'start',
};

const appItemStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
};

const appIconBase: React.CSSProperties = {
  width: '55px',
  height: '55px',
  borderRadius: '14px',
  boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
};

const appTextStyle: React.CSSProperties = {
  color: 'white',
  fontSize: '11px',
  fontWeight: '600',
  textShadow: '1px 1px 3px rgba(0,0,0,0.8)',
};

const notchStyle: React.CSSProperties = {
  position: 'absolute',
  top: '12px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '80px',
  height: '25px',
  backgroundColor: '#1a1a1a',
  borderBottomLeftRadius: '18px',
  borderBottomRightRadius: '18px',
  zIndex: 10,
};

const toastStyle: React.CSSProperties = {
  margin: '20px',
  padding: '10px',
  borderRadius: '12px',
  color: 'white',
  textAlign: 'center',
  fontSize: '13px',
  fontWeight: 'bold',
  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
};

export default PhonePanel;