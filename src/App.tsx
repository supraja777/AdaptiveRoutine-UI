import React, { useState } from 'react';
import PhonePanel from './components/PhonePanel';
import RightPanel from './components/RightPanel';

function App() {
  const [userSchedule, setUserSchedule] = useState<Record<number, string>>({});
  const [streaks, setStreaks] = useState<Record<string, number>>({ 
    'Morning Exercise': 0,
    'Focused Work': 0 
  });
  const [notifications, setNotifications] = useState<any[]>([]);

  const handleIncomingMessage = (text: string, sender: string) => {
    // Filter logic: currently allows all
    const isAllowed = true; 

    if (isAllowed) {
      const newNotif = {
        id: Date.now(),
        sender,
        text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setNotifications((prev) => [newNotif, ...prev]);
      setTimeout(() => {
        setNotifications((prev) => prev.filter(n => n.id !== newNotif.id));
      }, 6000);
    }
  };

  return (
    <div style={{ 
      display: 'flex', width: '100vw', height: '100vh', overflow: 'hidden', 
      backgroundColor: '#fff8f0', padding: '15px', boxSizing: 'border-box' 
    }}>
      <div style={{ flex: '0 0 38%', marginRight: '15px' }}>
        <PhonePanel 
          userSchedule={userSchedule} 
          streaks={streaks} 
          notifications={notifications} 
        />
      </div>
      <div style={{ flex: '1' }}>
        <RightPanel 
          userSchedule={userSchedule} 
          setUserSchedule={setUserSchedule} 
          streaks={streaks}
          setStreaks={setStreaks}
          onSendMessage={handleIncomingMessage}
        />
      </div>
    </div>
  );
}

export default App;