
import React from 'react';
import { SystemMode } from '../types';

interface StatusBarProps {
  currentMode: SystemMode;
}

const StatusBar: React.FC<StatusBarProps> = ({ currentMode }) => {
  return (
    <div className="h-16 px-12 flex items-center justify-between border-b border-white/5">
      {/* Top Left: Mini clock & Status Icon */}
      <div className="flex items-center space-x-4">
        <div className="text-white/40 text-sm font-light tracking-widest flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
            SECURE SYSTEM ACTIVE
        </div>
      </div>

      {/* Center: Branding */}
      <div className="absolute left-1/2 -translate-x-1/2">
        <span className="text-white/80 font-normal tracking-[0.4em] text-xs">SECURE</span>
      </div>

      {/* Top Right: System Status */}
      <div className="flex items-center space-x-6 text-white/40">
        <div className="flex items-center space-x-1">
          <div className="flex items-end space-x-0.5 h-3">
            <div className="w-1 h-[20%] bg-current rounded-t-sm"></div>
            <div className="w-1 h-[40%] bg-current rounded-t-sm"></div>
            <div className="w-1 h-[70%] bg-current rounded-t-sm"></div>
            <div className="w-1 h-[100%] bg-current rounded-t-sm"></div>
          </div>
          <span className="text-[10px] font-medium ml-1">LTE</span>
        </div>

        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
        </svg>

        <div className="flex items-center space-x-1">
          <div className="w-6 h-3.5 border border-white/20 rounded-sm p-0.5 relative">
            <div className="h-full w-4/5 bg-emerald-500/60 rounded-[1px]"></div>
            <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-0.5 h-1 bg-white/20 rounded-r-sm"></div>
          </div>
          <svg className="w-3 h-3 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
             <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
