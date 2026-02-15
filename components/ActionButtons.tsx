
import React from 'react';
import { SystemMode } from '../types';

interface ActionButtonsProps {
  currentMode: SystemMode;
  onModeChange: (mode: SystemMode) => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ currentMode, onModeChange }) => {
  const buttons = [
    { id: SystemMode.LOG, label: 'Log', icon: LogIcon },
    { id: SystemMode.SETTINGS, label: 'Settings', icon: SettingsIcon },
    { id: SystemMode.SOS, label: 'SOS', icon: SOSIcon, special: 'sos' },
    { id: SystemMode.DISARMED, label: 'Disarm', icon: DisarmIcon, mode: true },
    { id: SystemMode.ARMED_HOME, label: 'Home Arm', icon: HomeArmIcon, mode: true },
    { id: SystemMode.ARMED_AWAY, label: 'Arm', icon: ArmIcon, mode: true },
  ];

  return (
    <div className="grid grid-cols-6 gap-6 h-[160px]">
      {buttons.map((btn) => {
        const isActive = currentMode === btn.id;
        const Icon = btn.icon;

        return (
          <button
            key={btn.id}
            onClick={() => onModeChange(btn.id)}
            className={`
              relative flex flex-col items-center justify-center rounded-[32px] transition-all duration-300 group overflow-hidden
              ${btn.special === 'sos' ? 'bg-red-500/10 border-red-500/20 hover:bg-red-500/20 active:scale-95' : ''}
              ${!btn.special && !isActive ? 'bg-white/[0.03] border-white/5 hover:bg-white/[0.07] active:scale-95' : ''}
              ${isActive && !btn.special ? 'bg-white/10 border-white/20' : 'border'}
            `}
          >
            {/* Active Highlight Layer */}
            {isActive && !btn.special && (
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
            )}

            <div className={`
                mb-3 transition-transform duration-300 group-active:scale-90
                ${isActive ? 'text-white' : 'text-white/30'}
                ${btn.special === 'sos' ? 'text-red-400' : ''}
            `}>
              <Icon active={isActive} />
            </div>

            <span className={`
                text-[10px] font-medium tracking-[0.2em] uppercase
                ${isActive ? 'text-white' : 'text-white/40'}
                ${btn.special === 'sos' ? 'text-red-400 font-semibold' : ''}
            `}>
              {btn.label}
            </span>

            {/* Tap feedback ring */}
            <div className={`
                absolute inset-2 border rounded-[24px] opacity-0 group-active:opacity-100 transition-opacity pointer-events-none
                ${btn.special === 'sos' ? 'border-red-500/50' : 'border-white/20'}
            `} />
          </button>
        );
      })}
    </div>
  );
};

// --- Custom Icons matching the industrial aesthetic ---

const LogIcon = ({ active }: { active: boolean }) => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const SettingsIcon = ({ active }: { active: boolean }) => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const SOSIcon = () => (
  <div className="relative">
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
    <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
  </div>
);

const DisarmIcon = ({ active }: { active: boolean }) => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    {active ? (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
    ) : (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
    )}
  </svg>
);

const HomeArmIcon = ({ active }: { active: boolean }) => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const ArmIcon = ({ active }: { active: boolean }) => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 11V7a4 4 0 118 0V11" />
  </svg>
);

export default ActionButtons;
