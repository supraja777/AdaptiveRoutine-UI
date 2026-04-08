// src/components/RightPanel.tsx
import React from 'react';
import { ROUTINE_MAP } from '../constants/routines';

interface RightPanelProps {
  userSchedule: Record<number, string>;
  setUserSchedule: React.Dispatch<React.SetStateAction<Record<number, string>>>;
}

const RightPanel: React.FC<RightPanelProps> = ({ userSchedule, setUserSchedule }) => {
  const hours = Array.from({ length: 16 }, (_, i) => i + 7); // 7 AM - 10 PM

  const handleUpdate = (hour: number, routineId: string) => {
    setUserSchedule(prev => ({
      ...prev,
      [hour]: routineId
    }));
  };

  return (
    <div style={{ flex: 1, padding: '40px', overflowY: 'auto', backgroundColor: '#f9f9fb' }}>
      <h2>Define Your Routine</h2>
      {hours.map((hour) => (
        <div key={hour} style={slotStyle}>
          <span style={{ width: '80px', fontWeight: 'bold' }}>
            {hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
          </span>
          
          <select 
            value={userSchedule[hour] || ''} 
            onChange={(e) => handleUpdate(hour, e.target.value)}
            style={selectStyle}
          >
            <option value="">No Routine Set</option>
            {Object.entries(ROUTINE_MAP).map(([id, config]) => (
              <option key={id} value={id}>{config.label}</option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

const slotStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '10px',
  padding: '10px',
  background: '#fff',
  borderRadius: '8px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
};

const selectStyle: React.CSSProperties = {
  flex: 1,
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #ccc'
};

export default RightPanel;