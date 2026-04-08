import React, { useState, useEffect } from 'react';
import { ROUTINE_MAP, RoutineConfig } from '../constants/routines';

interface PhonePanelProps {
  userSchedule: Record<number, string>;
  streaks: Record<string, number>;
}

const PhonePanel: React.FC<PhonePanelProps> = ({ userSchedule, streaks }) => {
  const [activeConfig, setActiveConfig] = useState<RoutineConfig>(ROUTINE_MAP.default);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const ticker = setInterval(() => setTime(new Date()), 1000);
    const hour = time.getHours();
    const assignedId = userSchedule[hour];
    
    // CRASH PROTECTION: Fallback to default if assignedId is invalid or missing
    const nextConfig = (assignedId && ROUTINE_MAP[assignedId]) 
      ? ROUTINE_MAP[assignedId] 
      : ROUTINE_MAP.default;
    
    if (nextConfig.label !== activeConfig.label) {
      setActiveConfig(nextConfig);
    }
    
    return () => clearInterval(ticker);
  }, [userSchedule, time, activeConfig.label]);

  return (
    <div style={containerStyle}>
      <div style={phoneBezelStyle}>
        <div style={notchStyle} />
        
        <div style={{ 
          ...screenStyle, 
          backgroundImage: `url(${activeConfig?.wallpaper})`,
          borderColor: activeConfig?.themeColor || '#000'
        }}>
          {/* Status Bar */}
          <div style={statusBarStyle}>
            <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            <span style={{ fontWeight: '800' }}>{activeConfig?.label?.toUpperCase()}</span>
            <span>🔋</span>
          </div>

          {/* Apps Grid */}
          <div style={gridStyle}>
            {activeConfig?.allowedApps?.map((appName) => (
              <div key={appName} style={appItemStyle}>
                <div style={{...appIconBase, backgroundColor: activeConfig.themeColor}} />
                <span style={appTextStyle}>{appName}</span>
              </div>
            ))}
          </div>

          {/* CONTEXTUAL STREAK OVERLAY */}
          {activeConfig?.label === 'Morning Exercise' && streaks['Gym'] !== undefined && (
            <div style={streakOverlay}>
              <div style={{fontSize: '0.7rem', letterSpacing: '1px'}}>GYM STREAK</div>
              <div style={{fontSize: '2.2rem', fontWeight: '900'}}>
                {streaks['Gym']}<span style={{fontSize: '1rem', marginLeft: '4px'}}>days</span>
              </div>
            </div>
          )}

          <div style={{...modeIndicator, backgroundColor: activeConfig?.themeColor}}>
            {activeConfig?.label} Mode Active
          </div>
        </div>
      </div>
    </div>
  );
};

// Styles remain as defined in previous steps
const containerStyle: React.CSSProperties = { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f0f2' };
const phoneBezelStyle: React.CSSProperties = { width: '310px', height: '630px', backgroundColor: '#1a1a1a', borderRadius: '45px', padding: '12px', position: 'relative' };
const screenStyle: React.CSSProperties = { height: '100%', borderRadius: '35px', overflow: 'hidden', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', flexDirection: 'column' };
const statusBarStyle: React.CSSProperties = { height: '45px', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white', fontSize: '11px', backgroundColor: 'rgba(0,0,0,0.2)' };
const gridStyle: React.CSSProperties = { flex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', padding: '25px', alignContent: 'start' };
const appItemStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' };
const appIconBase: React.CSSProperties = { width: '52px', height: '52px', borderRadius: '14px' };
const appTextStyle: React.CSSProperties = { color: 'white', fontSize: '10px', fontWeight: '700' };
const notchStyle: React.CSSProperties = { position: 'absolute', top: '12px', left: '50%', transform: 'translateX(-50%)', width: '70px', height: '22px', backgroundColor: '#1a1a1a', borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px', zIndex: 10 };
const modeIndicator: React.CSSProperties = { margin: '15px', padding: '10px', borderRadius: '15px', color: 'white', textAlign: 'center', fontSize: '12px', fontWeight: 'bold' };
const streakOverlay: React.CSSProperties = { margin: '0 20px', padding: '20px', backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: '20px', color: 'white', textAlign: 'center', backdropFilter: 'blur(8px)' };

export default PhonePanel;