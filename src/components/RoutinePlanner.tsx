import React from 'react';
import { ROUTINE_MAP } from '../constants/routines';

interface Props {
  userSchedule: Record<number, string>;
  setUserSchedule: React.Dispatch<React.SetStateAction<Record<number, string>>>;
}

const RoutinePlanner: React.FC<Props> = ({ userSchedule, setUserSchedule }) => {
  const hours = Array.from({ length: 16 }, (_, i) => i + 7);

  return (
    <div style={plannerContainer}>
      <h3 style={titleStyle}>Adjust Schedule</h3>
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
                <option key={id} value={id}>{config.label}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Compact Styles ---

const plannerContainer: React.CSSProperties = {
  backgroundColor: 'rgba(255, 255, 255, 0.6)',
  padding: '15px',
  borderRadius: '20px',
  border: '1px solid #ffe0b2',
};

const titleStyle: React.CSSProperties = {
  fontSize: '0.9rem',
  color: '#8d6e63',
  marginBottom: '12px',
  marginTop: '0',
};

const gridContainer: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)', // Two columns to save vertical space
  gap: '8px',
};

const compactSlotStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  padding: '6px 10px',
  backgroundColor: '#fff',
  borderRadius: '10px',
  border: '1px solid #fff3e0',
};

const timeTextStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  fontWeight: '700',
  color: '#bcaaa4',
  width: '45px',
};

const compactSelectStyle: React.CSSProperties = {
  flex: 1,
  fontSize: '0.8rem',
  padding: '4px',
  border: 'none',
  backgroundColor: 'transparent',
  color: '#5d4037',
  outline: 'none',
  cursor: 'pointer',
};

export default RoutinePlanner;