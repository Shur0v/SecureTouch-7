
import React from 'react';

interface TimeDateWeatherProps {
  date: Date;
}

const TimeDateWeather: React.FC<TimeDateWeatherProps> = ({ date }) => {
  const timeStr = date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
  const dayStr = date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
  const monthStr = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  const dateNum = date.getDate();
  const year = date.getFullYear();

  return (
    <div className="flex flex-col">
      <div className="flex items-baseline space-x-6">
        <h1 className="text-[110px] font-extralight tracking-tighter leading-none text-white/95">
          {timeStr}
        </h1>
        <div className="flex flex-col border-l border-white/10 pl-6 space-y-1">
          <div className="text-2xl font-light tracking-[0.2em] text-white/80">{dayStr}</div>
          <div className="text-sm font-medium tracking-widest text-white/40">
            {monthStr} {dateNum}, {year}
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center space-x-4 bg-white/5 w-fit px-5 py-3 rounded-2xl border border-white/5">
        <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M16.95 16.95l.707.707M7.05 7.05l.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        <div className="flex flex-col">
          <span className="text-2xl font-light">21°</span>
          <span className="text-[10px] font-medium text-white/40 tracking-widest">18° / 24°</span>
        </div>
        <div className="h-6 w-px bg-white/10 mx-2"></div>
        <span className="text-xs font-light text-white/60 tracking-wider">CLEAR SKIES</span>
      </div>
    </div>
  );
};

export default TimeDateWeather;
