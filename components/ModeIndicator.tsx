
import React from 'react';
import { SystemMode } from '../types';

interface ModeIndicatorProps {
  mode: SystemMode;
  onBack: () => void;
}

const ModeIndicator: React.FC<ModeIndicatorProps> = ({ mode, onBack }) => {
  const getModeStyles = () => {
    switch (mode) {
      case SystemMode.DISARMED:
        return {
          bg: 'bg-emerald-500/10',
          border: 'border-emerald-500/20',
          text: 'text-emerald-400',
          dot: 'bg-emerald-400',
          glow: 'shadow-[0_0_20px_rgba(16,185,129,0.15)]'
        };
      case SystemMode.ARMED_AWAY:
        return {
          bg: 'bg-rose-500/10',
          border: 'border-rose-500/20',
          text: 'text-rose-400',
          dot: 'bg-rose-400',
          glow: 'shadow-[0_0_20px_rgba(244,63,94,0.15)]'
        };
      case SystemMode.ARMED_HOME:
        return {
          bg: 'bg-amber-500/10',
          border: 'border-amber-500/20',
          text: 'text-amber-400',
          dot: 'bg-amber-400',
          glow: 'shadow-[0_0_20px_rgba(245,158,11,0.15)]'
        };
      case SystemMode.SOS:
        return {
          bg: 'bg-red-600',
          border: 'border-red-400',
          text: 'text-white',
          dot: 'bg-white animate-pulse',
          glow: 'shadow-[0_0_30px_rgba(220,38,38,0.5)]'
        };
      default:
        return {
          bg: 'bg-white/5',
          border: 'border-white/10',
          text: 'text-white/60',
          dot: 'bg-white/40',
          glow: ''
        };
    }
  };

  const styles = getModeStyles();

  return (
    <div className={`flex flex-col items-end`}>
      {(mode === SystemMode.LOG || mode === SystemMode.SETTINGS) && (
        <button
          onClick={onBack}
          className="mb-4 flex items-center space-x-2 text-white/40 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="text-xs font-medium tracking-widest">BACK</span>
        </button>
      )}

      <div className={`flex items-center space-x-4 px-8 py-5 rounded-3xl border ${styles.bg} ${styles.border} ${styles.glow} transition-all duration-500`}>
        {mode === SystemMode.SOS ? (
          <div className={`w-3 h-3 rounded-full ${styles.dot}`}></div>
        ) : (
          <img
            src={
              mode === SystemMode.DISARMED ? "/Active Disarm.svg" :
                mode === SystemMode.ARMED_AWAY ? "/Active Arm.svg" :
                  mode === SystemMode.ARMED_HOME ? "/Active Home Arm.svg" :
                    mode === SystemMode.LOG ? "/Active log.svg" :
                      "/Active Settings.svg"
            }
            alt={mode}
            className="w-8 h-8 opacity-90"
          />
        )}
        <span className={`text-2xl font-light tracking-[0.2em] ${styles.text}`}>
          {mode}
        </span>
      </div>
    </div>
  );
};

export default ModeIndicator;
