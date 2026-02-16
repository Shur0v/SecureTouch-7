
import React from 'react';

const mockLogs = [
    { type: 'DISARMED', time: '12:30 PM', user: 'Admin', date: 'Today' },
    { type: 'ARMED AWAY', time: '08:15 AM', user: 'System', date: 'Today' },
    { type: 'DISARMED', time: '06:45 PM', user: 'Admin', date: 'Yesterday' },
    { type: 'ALARM TRIGGER', time: '04:20 PM', user: 'Zone 2', date: 'Yesterday', alert: true },
    { type: 'ARMED HOME', time: '10:00 PM', user: 'User 1', date: 'Yesterday' },
];

const LogView: React.FC = () => {
    return (
        <div className="absolute inset-x-0 bottom-0 top-[120px] bg-black/50 backdrop-blur-xl flex flex-col z-40 animate-in slide-in-from-bottom duration-300">
            <div className="flex-1 overflow-y-auto px-12 py-8 no-scrollbar">
                <div className="space-y-4">
                    {mockLogs.map((log, i) => (
                        <div key={i} className={`
                        flex items-center justify-between p-4 rounded-xl border border-white/5 
                        ${log.alert ? 'bg-red-500/10 border-red-500/20' : 'bg-white/5 hover:bg-white/10 transition-colors'}
                    `}>
                            <div className="flex items-center space-x-4">
                                <img
                                    src={
                                        log.type === 'DISARMED' ? '/Disarm deactive.svg' :
                                            log.type === 'ARMED AWAY' ? '/Arm deactive.svg' :
                                                log.type === 'ARMED HOME' ? '/home Arm deactive.svg' :
                                                    '/Active log.svg'
                                    }
                                    alt={log.type}
                                    className={`w-6 h-6 object-contain opacity-80 ${log.alert ? 'animate-pulse' : ''}`}
                                />
                                <div className="flex flex-col">
                                    <span className={`text-sm font-medium tracking-wide ${log.alert ? 'text-red-400' : 'text-white/80'}`}>
                                        {log.type}
                                    </span>
                                    <span className="text-xs text-white/40">{log.user}</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-end text-right">
                                <span className="text-sm font-light text-white/60">{log.time}</span>
                                <span className="text-xs text-white/20 tracking-widest uppercase">{log.date}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer Fade */}
            <div className="h-12 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none absolute bottom-0 inset-x-0" />
        </div>
    );
};

export default LogView;
