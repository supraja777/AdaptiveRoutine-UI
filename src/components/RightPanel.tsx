import React, { useState } from 'react';
import { ROUTINE_MAP } from '../constants/routines';

type Tab = 'fix' | 'messages' | 'streaks' | 'moodboard';

interface RightPanelProps {
  userSchedule: Record<number, string>;
  setUserSchedule: React.Dispatch<React.SetStateAction<Record<number, string>>>;
}

const RightPanel: React.FC<RightPanelProps> = ({ userSchedule, setUserSchedule }) => {
  const [activeTab, setActiveTab] = useState<Tab>('fix');

  // Generate hours for the planner
  const hours = Array.from({ length: 16 }, (_, i) => i + 7);

  const navButtons = [
    { id: 'fix', label: 'Chat', icon: '💬' }, // Using 'Chat' label to match screenshot
    { id: 'moodboard', label: 'Moodboard', icon: '🖼️' },
    { id: 'messages', label: 'AI Messages', icon: '🤖' },
    { id: 'streaks', label: 'Streaks', icon: '🔥' },
  ];

  return (
    <div style={containerStyle}>
      {/* 1. TOP NAVIGATION BAR */}
      <nav style={topNavStyle}>
        {navButtons.map((btn) => (
          <button
            key={btn.id}
            onClick={() => setActiveTab(btn.id as Tab)}
            style={{
              ...tabButtonStyle,
              backgroundColor: activeTab === btn.id ? '#f39c12' : 'transparent',
              color: activeTab === btn.id ? '#fff' : '#bcaaa4',
              boxShadow: activeTab === btn.id ? '0 4px 10px rgba(243, 156, 18, 0.3)' : 'none',
            }}
          >
            <span style={{ marginRight: '6px', fontSize: '1.1rem' }}>{btn.icon}</span>
            {btn.label}
          </button>
        ))}
      </nav>

      {/* 2. PARTICIPANTS SECTION */}
      <div style={participantsSection}>
        <div style={sectionLabel}>PARTICIPANTS</div>
        <div style={userBadge}>
          <span style={{ marginRight: '6px' }}>👤</span> Janavi
        </div>
      </div>

      {/* 3. MAIN CONTENT AREA */}
      <main style={contentAreaStyle}>
        {activeTab === 'fix' ? (
          <div style={plannerWrapper}>
            <div style={plannerHeader}>
              <h3 style={{ margin: 0, fontSize: '1rem', color: '#5d4037' }}>Fix Your Routine</h3>
              <span style={{ fontSize: '0.7rem', color: '#8d6e63' }}>Assign AI modes to hours</span>
            </div>
            
            <div style={gridContainer}>
              {hours.map((hour) => (
                <div key={hour} style={compactSlotStyle}>
                  <span style={timeTextStyle}>
                    {hour > 12 ? `${hour - 12} PM` : hour === 12 ? '12 PM' : `${hour} AM`}
                  </span>
                  <select 
                    value={userSchedule[hour] || ''} 
                    onChange={(e) => setUserSchedule(prev => ({...prev, [hour]: e.target.value}))}
                    style={compactSelectStyle}
                  >
                    <option value="">None</option>
                    {Object.entries(ROUTINE_MAP).map(([id, config]) => (
                      <option key={id} value={id}>{config.label.split(' ')[1] || config.label}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={placeholderCard}>
            <h3>{activeTab.toUpperCase()}</h3>
            <p>Adaptive AI module loading...</p>
          </div>
        )}
      </main>
    </div>
  );
};

// --- STYLES ---

const containerStyle: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#fff3e0', // Warm cream background
  height: '100vh',
  fontFamily: '"Inter", "Segoe UI", sans-serif',
};

const topNavStyle: React.CSSProperties = {
  display: 'flex',
  padding: '15px 25px',
  gap: '12px',
  borderBottom: '1px solid #ffe0b2',
  alignItems: 'center',
};

const tabButtonStyle: React.CSSProperties = {
  padding: '8px 18px',
  border: 'none',
  borderRadius: '12px',
  fontSize: '0.85rem',
  fontWeight: '700',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  transition: 'all 0.2s ease',
};

const participantsSection: React.CSSProperties = {
  padding: '15px 25px',
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
};

const sectionLabel: React.CSSProperties = {
  fontSize: '0.65rem',
  fontWeight: '900',
  color: '#bcaaa4',
  letterSpacing: '1.5px',
};

const userBadge: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  padding: '6px 16px',
  backgroundColor: '#f39c12',
  color: 'white',
  borderRadius: '20px',
  fontSize: '0.8rem',
  fontWeight: 'bold',
  boxShadow: '0 2px 8px rgba(243, 156, 18, 0.2)',
};

const contentAreaStyle: React.CSSProperties = {
  flex: 1,
  padding: '0 25px 25px 25px',
  overflowY: 'auto',
};

const plannerWrapper: React.CSSProperties = {
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  borderRadius: '24px',
  padding: '20px',
  border: '1px solid #ffe0b2',
};

const plannerHeader: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  marginBottom: '15px',
  borderBottom: '1px solid #ffe0b2',
  paddingBottom: '10px',
};

const gridContainer: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '10px',
};

const compactSlotStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  padding: '8px 12px',
  backgroundColor: '#fff',
  borderRadius: '12px',
  border: '1px solid #fff3e0',
};

const timeTextStyle: React.CSSProperties = {
  fontSize: '0.7rem',
  fontWeight: '800',
  color: '#bcaaa4',
  width: '50px',
};

const compactSelectStyle: React.CSSProperties = {
  flex: 1,
  fontSize: '0.8rem',
  border: 'none',
  backgroundColor: 'transparent',
  color: '#5d4037',
  outline: 'none',
  fontWeight: '600',
  cursor: 'pointer',
};

const placeholderCard: React.CSSProperties = {
  height: '200px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.3)',
  borderRadius: '24px',
  border: '2px dashed #ffe0b2',
  color: '#8d6e63',
  marginTop: '20px',
};

export default RightPanel;