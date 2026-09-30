import React, { useEffect, useState } from 'react';
import { Terminal, Cpu, CheckCircle2, ChevronRight, Zap } from 'lucide-react';
import { SoundFX } from '../utils/soundFX';

interface BootScreenProps {
  onComplete: () => void;
}

export const BootScreen: React.FC<BootScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStageText, setCurrentStageText] = useState('Initializing runtime architecture...');
  const [logs, setLogs] = useState<string[]>([
    'SYS.INIT: MERN kernel v4.18.2 starting...',
    'NET: Binding TCP socket listeners to port 3000...'
  ]);

  useEffect(() => {
    SoundFX.playBoot();

    const stages = [
      { at: 18, text: 'Calibrating MERN environment (MongoDB, Express, React, Node)', log: 'MERN_ENV: Drivers loaded: MongoDB 7.0, Express 4.x' },
      { at: 42, text: 'Mounting React.js & Tailwind CSS UI engine', log: 'UI_CORE: Viewport verified; mobile-first grid activated' },
      { at: 68, text: 'Verifying RESTful API services & database pipelines', log: 'API_GATEWAY: REST controllers verified; token auth online' },
      { at: 88, text: 'Synchronizing ShopNest & Banking System repositories', log: 'CAPSTONE: Final Year Project ShopNest & Banking schemas indexed' },
      { at: 100, text: 'System operational. Launching Jawad Ur Rehman Portfolio...', log: 'SYS_STATUS: 100% OPERATIONAL. Welcome.' }
    ];

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 2;
        const matched = stages.find((s) => s.at === next || (next > s.at && prev < s.at));
        if (matched) {
          setCurrentStageText(matched.text);
          setLogs((l) => [...l.slice(-4), matched.log]);
          SoundFX.playHover();
        }

        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            SoundFX.playSuccess();
            onComplete();
          }, 350);
          return 100;
        }
        return next;
      });
    }, 28);

    return () => clearInterval(interval);
  }, [onComplete]);

  const handleSkip = () => {
    SoundFX.playClick();
    onComplete();
  };

  return (
    <div
      id="boot-screen"
      className="fixed inset-0 z-50 flex flex-col justify-between p-4 sm:p-8 md:p-12 bg-black text-[#ededed] select-none overflow-hidden"
    >
      {/* Top telemetry HUD */}
      <div className="flex justify-between items-start text-xs font-mono-hud text-zinc-500 uppercase tracking-widest">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#de1b1c] animate-pulse"></span>
          <span>SYS.BOOT / JAWAD_UR_REHMAN</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-zinc-600">STK: MERN / NODE.JS</span>
          <button
            id="boot-skip-btn"
            onClick={handleSkip}
            className="px-3 py-1 text-[11px] font-mono-hud text-zinc-300 hover:text-white bg-zinc-900 border border-zinc-800 hover:border-[#de1b1c] rounded transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>SKIP BOOT</span>
            <ChevronRight size={12} />
          </button>
        </div>
      </div>

      {/* Center cyber diagnostics */}
      <div className="max-w-2xl w-full mx-auto my-auto space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-[#de1b1c]">
            <Cpu className="w-8 h-8 animate-spin" style={{ animationDuration: '6s' }} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono-hud text-[#de1b1c] font-semibold tracking-wider uppercase">
                SYSTEM DIAGNOSTIC SEQUENCE
              </span>
              <span className="text-[10px] font-mono-hud text-zinc-500">[KUST CS]</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-condensed font-bold text-white tracking-wide uppercase">
              JAWAD UR REHMAN
            </h1>
            <p className="text-xs font-mono-hud text-zinc-400">MERN Stack Developer & Full-Stack Engineer</p>
          </div>
        </div>

        {/* Progress HUD bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-mono-hud">
            <span className="text-zinc-400 truncate pr-2 flex items-center gap-1.5">
              <Terminal size={12} className="text-[#de1b1c] shrink-0" />
              <span>{currentStageText}</span>
            </span>
            <span className="text-[#de1b1c] font-bold shrink-0">{progress}%</span>
          </div>

          <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden border border-zinc-800/80">
            <div
              className="h-full bg-gradient-to-r from-zinc-700 via-[#de1b1c] to-[#ff2a2b] transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Terminal Logs Window */}
        <div className="p-3 sm:p-4 rounded-xl bg-[#0c0c0c] border border-zinc-800/80 text-xs font-mono-hud space-y-1.5 min-h-[105px]">
          <div className="flex items-center justify-between text-[10px] text-zinc-500 uppercase tracking-widest pb-1 border-b border-zinc-900">
            <span className="flex items-center gap-1.5">
              <Zap size={10} className="text-[#de1b1c]" />
              CONSOLE STREAM
            </span>
            <span>STATUS: ACTIVE</span>
          </div>
          {logs.map((log, idx) => (
            <div key={idx} className="text-zinc-400 flex items-start gap-2 truncate">
              <span className="text-zinc-600 select-none">›</span>
              <span className={idx === logs.length - 1 ? 'text-zinc-200' : 'text-zinc-500'}>{log}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom status line */}
      <div className="flex flex-col sm:flex-row justify-between items-center text-[11px] font-mono-hud text-zinc-600 gap-2 border-t border-zinc-900 pt-4">
        <div className="flex items-center gap-2">
          <CheckCircle2 size={12} className="text-[#de1b1c]" />
          <span>PORTFOLIO v2026.1 // MERN ARCHITECTURE</span>
        </div>
        <div>
          <span>KUST BS COMPUTER SCIENCE (2021 – 2025)</span>
        </div>
      </div>
    </div>
  );
};
