import React, { useState } from 'react';
import PhonePanel from './components/PhonePanel';
import RightPanel from './components/RightPanel';

function App() {
  // Global State for the schedule (Hour -> Routine ID)
  const [userSchedule, setUserSchedule] = useState<Record<number, string>>({});
  
  // Global State for Streaks (Name -> Count)
  const [streaks, setStreaks] = useState<Record<string, number>>({
    'Gym': 0 // Initialized Gym streak
  });

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* 35% Width for Phone Display */}
      <div style={{ flex: '0 0 35%', borderRight: '1px solid #ddd' }}>
        <PhonePanel userSchedule={userSchedule} streaks={streaks} />
      </div>

      {/* 65% Width for Control Panel */}
      <div style={{ flex: '1' }}>
        <RightPanel 
          userSchedule={userSchedule} 
          setUserSchedule={setUserSchedule} 
          streaks={streaks}
          setStreaks={setStreaks}
        />
      </div>
    </div>
  );
}

export default App;