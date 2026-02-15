
import React, { useState } from 'react';

const SettingsView: React.FC = () => {
    const [settings, setSettings] = useState([
        { id: 1, label: 'Entry Delay', value: '30s', type: 'select', options: ['15s', '30s', '45s', '60s'] },
        { id: 2, label: 'Silent Arming', value: false, type: 'toggle' },
        { id: 3, label: 'Screen Brightness', value: 80, type: 'slider' },
        { id: 4, label: 'Volume', value: 50, type: 'slider' },
        { id: 5, label: 'Chime', value: true, type: 'toggle' },
    ]);

    const handleToggle = (id: number) => {
        setSettings(prev => prev.map(s => s.id === id ? { ...s, value: !s.value } : s));
    };

    const handleSlider = (id: number, val: number) => {
        setSettings(prev => prev.map(s => s.id === id ? { ...s, value: val } : s));
    };

    return (
        <div className="absolute inset-x-0 bottom-0 top-[120px] bg-black/95 backdrop-blur-2xl flex flex-col z-40 animate-in slide-in-from-right duration-300">
            <div className="flex-1 overflow-y-auto px-12 py-8 no-scrollbar">

                <h3 className="text-white/40 uppercase tracking-[0.2em] text-xs font-semibold mb-6">System Configuration</h3>

                <div className="grid grid-cols-2 gap-6">
                    {settings.map((setting) => (
                        <div key={setting.id} className="bg-white/[0.03] border border-white/5 p-5 rounded-2xl flex flex-col justify-between h-32 hover:border-white/10 transition-colors group">
                            <span className="text-white/70 font-medium tracking-wide group-hover:text-white transition-colors">{setting.label}</span>

                            {setting.type === 'toggle' && (
                                <button
                                    onClick={() => handleToggle(setting.id)}
                                    className={`w-12 h-7 rounded-full transition-colors relative ${setting.value ? 'bg-emerald-500' : 'bg-white/10'}`}
                                >
                                    <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${setting.value ? 'left-6' : 'left-1'}`} />
                                </button>
                            )}

                            {setting.type === 'slider' && (
                                <div className="flex items-center space-x-3 w-full">
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={setting.value as number}
                                        onChange={(e) => handleSlider(setting.id, parseInt(e.target.value))}
                                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                    />
                                    <span className="text-xs text-white/40 w-6 text-right">{setting.value}%</span>
                                </div>
                            )}

                            {setting.type === 'select' && (
                                <div className="flex items-center justify-between bg-black/20 rounded-lg px-3 py-2 cursor-pointer border border-white/5">
                                    <span className="text-sm text-emerald-400 font-mono">{setting.value}</span>
                                    <svg className="w-4 h-4 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-8 border-t border-white/5 pt-6">
                    <button className="w-full py-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 font-medium tracking-widest hover:bg-red-500/20 transition-all active:scale-[0.99]">
                        REBOOT SYSTEM
                    </button>
                </div>

            </div>
        </div>
    );
};

export default SettingsView;
