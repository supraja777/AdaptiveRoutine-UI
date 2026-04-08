import React, { useState } from 'react';
import { ROUTINE_MAP } from '../constants/routines';

type Tab = 'fix' | 'streaks' | 'chat' | 'moodboard';

interface RightPanelProps {
  userSchedule: Record<number, string>;
  setUserSchedule: React.Dispatch<React.SetStateAction<Record<number, string>>>;
  streaks: Record<string, number>;
  setStreaks: React.Dispatch<React.SetStateAction<Record<string, number>>>;
}

const RightPanel: React.FC<RightPanelProps> = ({ userSchedule, setUserSchedule, streaks, setStreaks }) => {
  const [activeTab, setActiveTab] = useState<Tab>('fix');
  const [newStreakName, setNewStreakName] = useState('');
  const [feedback, setFeedback] = useState('');

  const hours = Array.from({ length: 16 }, (_, i) => i + 7);

  // STREAK ACTIONS
  const handleIncrement = (name: string) => {
    const nextVal = (streaks[name] || 0) + 1;
    setStreaks(prev => ({ ...prev, [name]: nextVal }));
    
    if ([7, 14, 30, 365].includes(nextVal)) setFeedback(`🏆 Milestone! ${nextVal} days of ${name}!`);
    else setFeedback(`Congratulations! ${name} streak is now ${nextVal}! ✨`);
  };

  const handleReset = (name: string) => {
    setStreaks(prev => ({ ...prev, [name]: 0 }));
    setFeedback(`Reset ${name}. All the best for your fresh start! 💪`);
  };

  return (
    <div style={panelContainer}>
      {/* Top Nav */}
      <nav style={topNav}>
        {[
          { id: 'fix', label: 'Fix Routine', icon: '🔧' },
          { id: 'streaks', label: 'Streaks', icon: '🔥' },
          { id: 'chat', label: 'Chat', icon: '💬' },
        ].map(btn => (
          <button
            key={btn.id}
            onClick={() => { setActiveTab(btn.id as Tab); setFeedback(''); }}
            style={{ 
              ...tabBtn, 
              backgroundColor: activeTab === btn.id ? '#f39c12' : 'transparent', 
              color: activeTab === btn.id ? '#fff' : '#bcaaa4' 
            }}
          >
            <span style={{ marginRight: '6px' }}>{btn.icon}</span> {btn.label}
          </button>
        ))}
      </nav>

      {/* Header */}
      <div style={headerSection}>
        <div style={labelStyle}>PARTICIPANTS</div>
        <div style={badgeStyle}>👤 Janavi</div>
        {feedback && <div style={feedbackToast}>{feedback}</div>}
      </div>

      <main style={{ padding: '0 25px 25px', overflowY: 'auto' }}>
        {activeTab === 'fix' && (
          <div style={cardWrapper}>
            <div style={gridContainer}>
              {hours.map(h => (
                <div key={h} style={slotItem}>
                  <span style={timeText}>{h > 12 ? `${h-12} PM` : h === 12 ? '12 PM' : `${h} AM`}</span>
                  <select 
                    value={userSchedule[h] || ''} 
                    onChange={e => setUserSchedule(p => ({...p, [h]: e.target.value}))}
                    style={selectStyle}
                  >
                    <option value="">None</option>
                    {Object.entries(ROUTINE_MAP).map(([id, cfg]) => <option key={id} value={id}>{cfg.label}</option>)}
                  </select>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'streaks' && (
          <div style={cardWrapper}>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
              <input 
                value={newStreakName} 
                onChange={e => setNewStreakName(e.target.value)}
                placeholder="New Streak (e.g. Gym)"
                style={{ flex: 1, padding: '10px', borderRadius: '10px', border: '1px solid #ffe0b2' }}
              />
              <button 
                onClick={() => {
                  if(!newStreakName) return;
                  setStreaks(p => ({...p, [newStreakName]: 0}));
                  setNewStreakName('');
                }}
                style={{ padding: '0 15px', backgroundColor: '#f39c12', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 'bold' }}
              >Add</button>
            </div>
            {Object.entries(streaks).map(([name, val]) => (
              <div key={name} style={streakCard}>
                <span style={{ fontWeight: '700' }}>{name}: {val} days</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => handleIncrement(name)} style={plusBtn}>+</button>
                  <button onClick={() => handleReset(name)} style={resetBtn}>Reset</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

// --- Styles (Briefly summarized) ---
const panelContainer: React.CSSProperties = { flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#fff3e0', height: '100vh', fontFamily: 'Inter, sans-serif' };
const topNav: React.CSSProperties = { display: 'flex', padding: '15px 25px', gap: '10px', borderBottom: '1px solid #ffe0b2' };
const tabBtn: React.CSSProperties = { padding: '8px 16px', border: 'none', borderRadius: '12px', fontSize: '0.85rem', fontWeight: '700', cursor: 'pointer' };
const headerSection: React.CSSProperties = { padding: '15px 25px', display: 'flex', alignItems: 'center', gap: '12px' };
const labelStyle: React.CSSProperties = { fontSize: '0.65rem', fontWeight: '900', color: '#bcaaa4', letterSpacing: '1px' };
const badgeStyle: React.CSSProperties = { padding: '6px 14px', backgroundColor: '#f39c12', color: 'white', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' };
const feedbackToast: React.CSSProperties = { color: '#d35400', fontSize: '0.75rem', fontWeight: 'bold', marginLeft: 'auto' };
const cardWrapper: React.CSSProperties = { backgroundColor: 'rgba(255,255,255,0.5)', padding: '20px', borderRadius: '24px', border: '1px solid #ffe0b2' };
const gridContainer: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' };
const slotItem: React.CSSProperties = { display: 'flex', alignItems: 'center', padding: '8px 12px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #fff3e0' };
const timeText: React.CSSProperties = { fontSize: '0.7rem', fontWeight: '800', color: '#bcaaa4', width: '45px' };
const selectStyle: React.CSSProperties = { flex: 1, border: 'none', backgroundColor: 'transparent', fontSize: '0.8rem', fontWeight: '600', color: '#5d4037', outline: 'none' };
const streakCard: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', backgroundColor: '#fff', borderRadius: '12px', marginBottom: '8px' };
const plusBtn: React.CSSProperties = { padding: '5px 12px', backgroundColor: '#27ae60', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' };
const resetBtn: React.CSSProperties = { padding: '5px 12px', backgroundColor: '#e74c3c', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' };

export default RightPanel;