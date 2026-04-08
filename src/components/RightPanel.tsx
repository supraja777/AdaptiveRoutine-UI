import React, { useState } from 'react';
import { ROUTINE_MAP } from '../constants/routines';

interface Props {
  userSchedule: Record<number, string>;
  setUserSchedule: any;
  streaks: Record<string, number>;
  setStreaks: any;
  onSendMessage: (text: string, sender: string) => void;
}

const RightPanel: React.FC<Props> = ({ userSchedule, setUserSchedule, streaks, setStreaks, onSendMessage }) => {
  const [activeTab, setActiveTab] = useState('fix');
  const [newStreakName, setNewStreakName] = useState('');
  const [msgData, setMsgData] = useState({ sender: '', text: '' });
  const [feedback, setFeedback] = useState('');

  const hours = Array.from({ length: 16 }, (_, i) => i + 7);

  return (
    <div style={panelContainer}>
      <nav style={topNav}>
        {['fix', 'streaks', 'chat'].map(t => (
          <button key={t} onClick={() => {setActiveTab(t); setFeedback('');}} style={{...tabBtn, backgroundColor: activeTab === t ? '#f39c12' : 'transparent', color: activeTab === t ? '#fff' : '#bcaaa4'}}>
            {t === 'fix' ? 'ROUTINE' : t.toUpperCase()}
          </button>
        ))}
      </nav>

      <div style={headerSection}>
        <div style={badgeStyle}>👤 Janavi</div>
        {feedback && <span style={{fontSize: '0.8rem', color: '#d35400', fontWeight: 'bold'}}>{feedback}</span>}
      </div>

      <main style={{ padding: '0 25px 25px', overflowY: 'auto' }}>
        {activeTab === 'fix' && (
          <div style={cardWrapper}>
            <div style={gridContainer}>
              {hours.map(h => (
                <div key={h} style={slotItem}>
                  <span style={timeText}>{h > 12 ? `${h-12} PM` : h === 12 ? '12 PM' : `${h} AM`}</span>
                  <select value={userSchedule[h] || ''} onChange={e => setUserSchedule((p:any) => ({...p, [h]: e.target.value}))} style={selectStyle}>
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
            <h4 style={{marginTop: 0}}>Create New Goal</h4>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
              <input placeholder="Streak Name (e.g. Reading)" value={newStreakName} onChange={(e) => setNewStreakName(e.target.value)} style={inputStyle} />
              <button onClick={() => { if(!newStreakName) return; setStreaks((p:any) => ({...p, [newStreakName]: 0})); setNewStreakName(''); setFeedback('Goal added!'); }} style={addBtn}>Add</button>
            </div>
            
            <h4 style={{borderTop: '1px solid #eee', paddingTop: '15px'}}>Active Streaks</h4>
            {Object.entries(streaks).map(([name, val]) => (
              <div key={name} style={streakItem}>
                <span>{name}: <b>{val} days</b></span>
                <div style={{display: 'flex', gap: '8px'}}>
                  <button onClick={() => setStreaks((p:any) => ({ ...p, [name]: (Number(p[name]) || 0) + 1 }))} style={plusBtn}>+</button>
                  <button onClick={() => setStreaks((p:any) => ({ ...p, [name]: 0 }))} style={{...plusBtn, backgroundColor: '#e74c3c'}}>↺</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'chat' && (
          <div style={cardWrapper}>
            <h4 style={{marginTop: 0}}>AI Message Filter</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input placeholder="Sender" value={msgData.sender} onChange={e => setMsgData({...msgData, sender: e.target.value})} style={inputStyle} />
                <textarea placeholder="Message..." value={msgData.text} onChange={e => setMsgData({...msgData, text: e.target.value})} style={{...inputStyle, height: '100px'}} />
                <button onClick={() => { onSendMessage(msgData.text, msgData.sender); setMsgData({sender:'', text:''}); setFeedback('Sent!'); }} style={actionBtn}>Send to Phone</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

const panelContainer: React.CSSProperties = { flex: 1, display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#fffcf5', borderRadius: '25px', border: '1px solid #ffe0b2' };
const topNav: React.CSSProperties = { display: 'flex', padding: '20px 25px', gap: '15px', borderBottom: '1px solid #ffe0b2' };
const tabBtn: React.CSSProperties = { padding: '10px 18px', border: 'none', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer' };
const headerSection: React.CSSProperties = { padding: '15px 25px', display: 'flex', alignItems: 'center', gap: '15px' };
const badgeStyle: React.CSSProperties = { padding: '8px 16px', backgroundColor: '#f39c12', color: 'white', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' };
const cardWrapper: React.CSSProperties = { backgroundColor: '#fff', padding: '25px', borderRadius: '24px', border: '1px solid #ffe0b2' };
const gridContainer: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' };
const slotItem: React.CSSProperties = { display: 'flex', alignItems: 'center', padding: '10px', backgroundColor: '#fff9f2', borderRadius: '12px' };
const timeText: React.CSSProperties = { fontSize: '0.7rem', width: '50px', color: '#bcaaa4', fontWeight: 'bold' };
const selectStyle: React.CSSProperties = { flex: 1, border: 'none', fontSize: '0.8rem', outline: 'none', backgroundColor: 'transparent' };
const inputStyle: React.CSSProperties = { flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid #ffe0b2', boxSizing: 'border-box' };
const addBtn: React.CSSProperties = { padding: '0 20px', backgroundColor: '#f39c12', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold' };
const actionBtn: React.CSSProperties = { width: '100%', padding: '12px', backgroundColor: '#f39c12', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold' };
const streakItem: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', backgroundColor: '#fff9f2', borderRadius: '15px', marginBottom: '10px' };
const plusBtn: React.CSSProperties = { padding: '8px 15px', backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '10px' };

export default RightPanel;