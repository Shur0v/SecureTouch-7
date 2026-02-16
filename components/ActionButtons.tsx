
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
              relative flex flex-col items-center justify-center rounded-[32px] transition-all duration-300 group/btn overflow-hidden
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
                mb-3 transition-transform duration-300 group-active/btn:scale-90
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
                absolute inset-2 border rounded-[24px] opacity-0 group-active/btn:opacity-100 transition-opacity pointer-events-none
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
  <img
    src="/Active log.svg"
    alt="Log"
    className={`w-8 h-8 ${active ? 'opacity-100' : 'opacity-50'}`}
  />
);

const SettingsIcon = ({ active }: { active: boolean }) => (
  <img
    src="/Active Settings.svg"
    alt="Settings"
    className={`w-8 h-8 ${active ? 'opacity-100' : 'opacity-50'}`}
  />
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
  <img
    src={active ? "/Active Disarm.svg" : "/Disarm deactive.svg"}
    alt="Disarm"
    className={`w-10 h-10 transition-opacity duration-300 ${active ? 'opacity-100' : 'opacity-60'}`}
  />
);

const HomeArmIcon = ({ active }: { active: boolean }) => (
  <img
    src={active ? "/Active Home Arm.svg" : "/home Arm deactive.svg"}
    alt="Home Arm"
    className={`w-10 h-10 transition-opacity duration-300 ${active ? 'opacity-100' : 'opacity-60'}`}
  />
);

const ArmIcon = ({ active }: { active: boolean }) => (
  <img
    src={active ? "/Active Arm.svg" : "/Arm deactive.svg"}
    alt="Arm Away"
    className={`w-10 h-10 transition-opacity duration-300 ${active ? 'opacity-100' : 'opacity-60'}`}
  />
);

export default ActionButtons;
