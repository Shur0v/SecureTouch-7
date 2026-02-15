
import React, { useState, useEffect } from 'react';
import { SystemMode } from './types';
import StatusBar from './components/StatusBar';
import ModeIndicator from './components/ModeIndicator';
import TimeDateWeather from './components/TimeDateWeather';
import ActionButtons from './components/ActionButtons';

const App: React.FC = () => {
  const [currentMode, setCurrentMode] = useState<SystemMode>(SystemMode.DISARMED);
  const [prevMode, setPrevMode] = useState<SystemMode>(SystemMode.DISARMED);

  // Simulation of time update
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleModeChange = (newMode: SystemMode) => {
    if (newMode === SystemMode.LOG || newMode === SystemMode.SETTINGS) {
        setPrevMode(currentMode);
    }
    setCurrentMode(newMode);
  };

  const handleBack = () => {
    setCurrentMode(prevMode);
  };

  return (
    <div className="w-[1024px] h-[600px] bg-[#0A0A0A] text-white relative flex flex-col overflow-hidden shadow-2xl border border-white/5 rounded-lg">
      
      {/* 4️⃣ Always Visible Status Area & Brand Integration */}
      <StatusBar currentMode={currentMode} />

      {/* Main Dashboard Layout */}
      <div className="flex-1 px-12 pt-4 pb-8 flex flex-col">
        
        <div className="flex justify-between items-start mb-auto">
            {/* 1️⃣ & 2️⃣ Time, Date & Weather Module */}
            <TimeDateWeather date={time} />

            {/* 5️⃣ Clear System Mode Indicator */}
            <ModeIndicator mode={currentMode} onBack={handleBack} />
        </div>

        {/* 3️⃣ Six Required Buttons Interaction Area */}
        <ActionButtons currentMode={currentMode} onModeChange={handleModeChange} />

      </div>

      {/* Decorative ambient background blur */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />
    </div>
  );
};

export default App;
