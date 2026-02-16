
import React, { useState, useEffect, useRef } from 'react';
import { SystemMode } from './types';
import StatusBar from './components/StatusBar';
import ModeIndicator from './components/ModeIndicator';
import TimeDateWeather from './components/TimeDateWeather';
import ActionButtons from './components/ActionButtons';
import SecurityPad from './components/SecurityPad';
import LogView from './components/LogView';
import SettingsView from './components/SettingsView';
import AmbientBackground, { InteractionHandler } from './components/AmbientBackground';

const App: React.FC = () => {
  const [currentMode, setCurrentMode] = useState<SystemMode>(SystemMode.DISARMED);
  const [prevMode, setPrevMode] = useState<SystemMode>(SystemMode.DISARMED);
  const [showPad, setShowPad] = useState(false);
  const [pendingMode, setPendingMode] = useState<SystemMode | null>(null);

  const interactionRef = useRef<InteractionHandler | null>(null);

  // Simulation of time update
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleGlobalClick = (e: React.MouseEvent) => {
    if (interactionRef.current) {
      interactionRef.current(e.clientX, e.clientY);
    }
  };

  const handleModeChange = (newMode: SystemMode) => {
    // If we are disarming or going to settings, require code
    if (newMode === SystemMode.DISARMED && currentMode !== SystemMode.DISARMED) {
      setPendingMode(newMode);
      setShowPad(true);
      return;
    }

    if (newMode === SystemMode.SETTINGS) {
      setPendingMode(newMode);
      setShowPad(true);
      return;
    }

    if (newMode === SystemMode.LOG) {
      setPrevMode(currentMode);
      setCurrentMode(newMode);
      return;
    }

    // Direct mode changes (arming)
    setCurrentMode(newMode);
  };

  const handleAuthSuccess = () => {
    setShowPad(false);
    if (pendingMode) {
      if (pendingMode === SystemMode.SETTINGS || pendingMode === SystemMode.LOG) {
        setPrevMode(currentMode);
      }
      setCurrentMode(pendingMode);
      setPendingMode(null);
    }
  };

  const handleBack = () => {
    setCurrentMode(prevMode);
  };

  return (
    <div
      onClick={handleGlobalClick}
      className="w-[1024px] h-[600px] bg-transparent text-white relative flex flex-col overflow-hidden shadow-2xl border border-white/5 rounded-lg select-none"
    >
      <AmbientBackground onRef={(handler) => (interactionRef.current = handler)} />

      <SecurityPad
        isOpen={showPad}
        onClose={() => setShowPad(false)}
        onSuccess={handleAuthSuccess}
        title={pendingMode === SystemMode.SETTINGS ? "ENTER ADMIN PIN" : "ENTER DISARM PIN"}
      />

      {/* 4️⃣ Always Visible Status Area & Brand Integration */}
      <StatusBar currentMode={currentMode} />

      {/* Main Dashboard Layout */}
      <div className="flex-1 px-12 pt-4 pb-8 flex flex-col transition-all duration-500 z-10">

        <div className="flex justify-between items-start mb-auto">
          {/* 1️⃣ & 2️⃣ Time, Date & Weather Module */}
          <TimeDateWeather date={time} />

          {/* 5️⃣ Clear System Mode Indicator */}
          <ModeIndicator mode={currentMode} onBack={handleBack} />
        </div>

        {/* 3️⃣ Six Required Buttons Interaction Area */}
        <div className={`transition-opacity duration-300 ${currentMode === SystemMode.LOG || currentMode === SystemMode.SETTINGS ? 'opacity-20 pointer-events-none blur-sm' : 'opacity-100'}`}>
          <ActionButtons currentMode={currentMode} onModeChange={handleModeChange} />
        </div>

      </div>

      {/* Dynamic Views */}
      {currentMode === SystemMode.LOG && <LogView />}
      {currentMode === SystemMode.SETTINGS && <SettingsView />}

      {/* SOS Overlay */}
      {currentMode === SystemMode.SOS && (
        <div className="absolute inset-0 bg-red-600/90 z-50 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300">
          <div className="w-32 h-32 rounded-full bg-white animate-ping absolute opacity-20" />
          <div className="w-24 h-24 rounded-full bg-white text-red-600 flex items-center justify-center mb-6 shadow-2xl z-10">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-4xl font-black tracking-widest mb-2">EMERGENCY</h1>
          <p className="text-white/80 tracking-widest mb-12">DISPATCHING AUTHORITIES</p>
          <button
            onClick={() => setCurrentMode(SystemMode.DISARMED)}
            className="px-8 py-3 bg-white text-red-600 font-bold rounded-full hover:scale-105 active:scale-95 transition-transform"
          >
            CANCEL ALARM
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
