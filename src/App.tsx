import { useState, useEffect } from 'react';
import PhonePanel from './components/PhonePanel';
import RightPanel from './components/RightPanel';
import { ROUTINE_MAP } from './constants/routines';

function App() {
  /**
   * This is the "Person's Routine Map".
   * Key: The hour (number)
   * Value: The routine ID (string) from ROUTINE_MAP
   */
  const [userSchedule, setUserSchedule] = useState<Record<number, string>>({});

  // Effect to store/log whenever the person changes their routine
  useEffect(() => {
    console.log("Saving user's routine map:", userSchedule);
    // You could easily swap this for localStorage.setItem('myRoutine', JSON.stringify(userSchedule))
  }, [userSchedule]);

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
  };

  return (
    <div style={containerStyle}>
      {/* Passing the map to the phone so it knows what to do NOW */}
      <PhonePanel userSchedule={userSchedule} />
      
      {/* Passing the map and the setter to the right so the person can edit it */}
      <RightPanel 
        userSchedule={userSchedule} 
        setUserSchedule={setUserSchedule} 
      />
    </div>
  );
}

export default App;