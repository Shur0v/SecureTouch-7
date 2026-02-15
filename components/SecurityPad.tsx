
import React, { useState } from 'react';

interface SecurityPadProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    title?: string;
}

const SecurityPad: React.FC<SecurityPadProps> = ({ isOpen, onClose, onSuccess, title = "ENTER PASSCODE" }) => {
    const [code, setCode] = useState<string>("");
    const [error, setError] = useState<boolean>(false);

    if (!isOpen) return null;

    const handleNumClick = (num: string) => {
        if (code.length < 4) {
            const newCode = code + num;
            setCode(newCode);
            setError(false);

            // Auto-submit on 4th digit
            if (newCode.length === 4) {
                if (newCode === "1234") { // Mock "correct" code
                    setTimeout(() => {
                        onSuccess();
                        setCode("");
                    }, 300);
                } else {
                    setError(true);
                    setTimeout(() => setCode(""), 500);
                }
            }
        }
    };

    const handleDelete = () => {
        setCode(prev => prev.slice(0, -1));
        setError(false);
    };

    return (
        <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center animate-in fade-in duration-200">
            <div className="w-[320px] flex flex-col items-center">
                <h2 className="text-white/60 text-sm tracking-[0.3em] font-light mb-2">{title}</h2>
                <span className="text-white/20 text-[10px] tracking-widest mb-8">DEFAULT PIN: 1234</span>

                {/* Passcode Dots */}
                <div className={`flex space-x-4 mb-10 ${error ? 'animate-shake' : ''}`}>
                    {[0, 1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className={`w-4 h-4 rounded-full border transition-all duration-300
                ${code.length > i
                                    ? (error ? 'bg-red-500 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]' : 'bg-white border-white shadow-[0_0_10px_rgba(255,255,255,0.5)]')
                                    : 'border-white/20 bg-transparent'
                                }
              `}
                        />
                    ))}
                </div>

                {/* Numpad */}
                <div className="grid grid-cols-3 gap-6 w-full">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                        <button
                            key={num}
                            onClick={() => handleNumClick(num.toString())}
                            className="w-20 h-20 rounded-full border border-white/10 text-2xl font-light text-white hover:bg-white/10 active:bg-white/20 transition-all flex items-center justify-center relative overflow-hidden group"
                        >
                            <span className="relative z-10">{num}</span>
                            <div className="absolute inset-0 bg-white/5 opacity-0 group-active:opacity-100 transition-opacity rounded-full" />
                        </button>
                    ))}

                    <button
                        onClick={onClose}
                        className="w-20 h-20 rounded-full text-xs font-medium tracking-widest text-white/40 hover:text-white transition-colors flex items-center justify-center"
                    >
                        CANCEL
                    </button>

                    <button
                        onClick={() => handleNumClick("0")}
                        className="w-20 h-20 rounded-full border border-white/10 text-2xl font-light text-white hover:bg-white/10 active:bg-white/20 transition-all flex items-center justify-center"
                    >
                        0
                    </button>

                    <button
                        onClick={handleDelete}
                        className="w-20 h-20 rounded-full flex items-center justify-center text-white/40 hover:text-white transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" />
                        </svg>
                    </button>
                </div>
            </div>
            <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out 0s 2;
        }
      `}</style>
        </div>
    );
};

export default SecurityPad;
