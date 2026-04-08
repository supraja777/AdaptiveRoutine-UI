import React, { useState, useEffect } from 'react';
import { ROUTINE_MAP, RoutineConfig } from '../constants/routines';

interface PhonePanelProps {
  userSchedule: Record<number, string>;
  streaks: Record<string, number>;
  notifications: any[];
}

const PhonePanel: React.FC<PhonePanelProps> = ({ userSchedule, streaks, notifications }) => {
  const [activeConfig, setActiveConfig] = useState<RoutineConfig>(ROUTINE_MAP.default);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const ticker = setInterval(() => setTime(new Date()), 1000);
    const hour = time.getHours();
    const assignedId = userSchedule[hour];
    const nextConfig = (assignedId && ROUTINE_MAP[assignedId]) ? ROUTINE_MAP[assignedId] : ROUTINE_MAP.default;
    if (nextConfig.label !== activeConfig.label) setActiveConfig(nextConfig);
    return () => clearInterval(ticker);
  }, [userSchedule, time, activeConfig.label]);

  return (
    <div style={containerStyle}>
      <div style={phoneBezelStyle}>
        <div style={notchStyle} />
        <div style={{ ...screenStyle, backgroundImage: `url(${activeConfig?.wallpaper})`, borderColor: activeConfig?.themeColor }}>
          
          {notifications.length > 0 && (
            <div style={notificationPopup}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: '900', fontSize: '0.7rem' }}>💬 {notifications[0].sender}</span>
                <span style={{ fontSize: '0.6rem', color: '#999' }}>now</span>
              </div>
              <div style={{ fontSize: '0.8rem', color: '#444', marginTop: '4px' }}>{notifications[0].text}</div>
            </div>
          )}

          <div style={statusBarStyle}>
            <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            <span style={{ fontWeight: '800' }}>{activeConfig?.label?.toUpperCase()}</span>
            <span>🔋</span>
          </div>

          <div style={gridStyle}>
            {activeConfig?.allowedApps?.map((appName) => (
              <div key={appName} style={appItemStyle}>
                <div style={{...appIconBase, backgroundColor: activeConfig.themeColor}} />
                <span style={appTextStyle}>{appName}</span>
              </div>
            ))}
          </div>

          {/* DYNAMIC STREAK OVERLAY: Shows if a streak name matches the current Mode Label */}
          {activeConfig?.label && streaks[activeConfig.label] !== undefined && streaks[activeConfig.label] > 0 && (
            <div style={streakOverlay}>
              <div style={{fontSize: '0.65rem', opacity: 0.8, letterSpacing: '1px'}}>CURRENT STREAK</div>
              <div style={{fontSize: '2.4rem', fontWeight: '900', margin: '4px 0'}}>{streaks[activeConfig.label]}</div>
              <div style={{fontSize: '0.65rem', fontWeight: 'bold'}}>DAYS COMPLETED</div>
            </div>
          )}

          <div style={{...modeIndicator, backgroundColor: activeConfig?.themeColor}}>{activeConfig?.label} Mode</div>
        </div>
      </div>
    </div>
  );
};

const containerStyle: React.CSSProperties = { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' };
const phoneBezelStyle: React.CSSProperties = { width: '300px', height: '620px', backgroundColor: '#1a1a1a', borderRadius: '45px', padding: '12px', position: 'relative', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' };
const screenStyle: React.CSSProperties = { height: '100%', borderRadius: '35px', overflow: 'hidden', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', flexDirection: 'column', position: 'relative' };
const notificationPopup: React.CSSProperties = { position: 'absolute', top: '55px', left: '12px', right: '12px', backgroundColor: 'rgba(255,255,255,0.98)', padding: '12px', borderRadius: '18px', zIndex: 100, boxShadow: '0 8px 25px rgba(0,0,0,0.15)' };
const statusBarStyle: React.CSSProperties = { height: '45px', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white', fontSize: '11px', backgroundColor: 'rgba(0,0,0,0.2)' };
const gridStyle: React.CSSProperties = { flex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', padding: '25px', alignContent: 'start' };
const appItemStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' };
const appIconBase: React.CSSProperties = { width: '52px', height: '52px', borderRadius: '14px' };
const appTextStyle: React.CSSProperties = { color: 'white', fontSize: '10px', fontWeight: '700' };
const notchStyle: React.CSSProperties = { position: 'absolute', top: '12px', left: '50%', transform: 'translateX(-50%)', width: '70px', height: '22px', backgroundColor: '#1a1a1a', borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px', zIndex: 10 };
const modeIndicator: React.CSSProperties = { margin: '15px', padding: '10px', borderRadius: '15px', color: 'white', textAlign: 'center', fontSize: '12px', fontWeight: 'bold' };
const streakOverlay: React.CSSProperties = { margin: '0 25px 20px', padding: '20px', backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: '22px', color: 'white', textAlign: 'center', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' };

export default PhonePanel;