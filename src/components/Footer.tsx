import React, { useState, useEffect } from 'react';
import {
  ArrowUp,
  Clock
} from 'lucide-react';
import { SoundFX } from '../utils/soundFX';
import { PROFILE } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

export const Footer: React.FC = () => {
  const { isDark } = useTheme();
  const [timeString, setTimeString] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Karachi',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    SoundFX.playSelect();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className={`py-12 px-4 sm:px-6 lg:px-8 border-t text-xs font-mono-hud transition-colors ${
        isDark ? 'bg-[#050505] border-zinc-900 text-zinc-500' : 'bg-white border-zinc-200 text-zinc-600'
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-8">
        <div
          className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b ${
            isDark ? 'border-zinc-900' : 'border-zinc-200'
          }`}
        >
          {/* Logo & Identity */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#de1b1c]"></span>
              <span
                className={`font-condensed font-bold text-lg uppercase tracking-wider ${
                  isDark ? 'text-white' : 'text-zinc-950'
                }`}
              >
                {PROFILE.name}
              </span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded border ${
                  isDark
                    ? 'bg-zinc-900 border-zinc-800 text-zinc-400'
                    : 'bg-zinc-100 border-zinc-300 text-zinc-700'
                }`}
              >
                MERN STACK DEVELOPER
              </span>
            </div>
            <p className={isDark ? 'text-zinc-400 font-light' : 'text-zinc-600 font-light'}>
              Kohat University of Science and Technology (KUST) · BS Computer Science (2021 – 2025)
            </p>
          </div>

          {/* Live Telemetry Time */}
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border ${
                isDark
                  ? 'bg-zinc-900/80 border-zinc-800 text-zinc-300'
                  : 'bg-zinc-50 border-zinc-200 text-zinc-800 shadow-sm'
              }`}
            >
              <Clock size={13} className="text-[#de1b1c]" />
              <span>PKT (ISLAMABAD/KARACHI):</span>
              <span className={`font-bold ${isDark ? 'text-white' : 'text-zinc-950'}`}>
                {timeString || '06:40 PM'}
              </span>
            </div>

            <button
              onClick={scrollToTop}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 group ${
                isDark
                  ? 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border-zinc-800 hover:border-[#de1b1c]'
                  : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800 hover:text-zinc-950 border-zinc-300 hover:border-[#de1b1c]'
              }`}
            >
              <span>TOP</span>
              <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform text-[#de1b1c]" />
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div>
            © {new Date().getFullYear()} {PROFILE.name}. All rights reserved. Built with React 19 &amp; Tailwind CSS.
          </div>

          <div className="flex items-center gap-4">
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => SoundFX.playHover()}
              className={`transition-colors ${
                isDark ? 'hover:text-white' : 'hover:text-zinc-950'
              }`}
            >
              GitHub
            </a>
            <span>•</span>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => SoundFX.playHover()}
              className={`transition-colors ${
                isDark ? 'hover:text-white' : 'hover:text-zinc-950'
              }`}
            >
              LinkedIn
            </a>
            <span>•</span>
            <a
              href={`mailto:${PROFILE.email}`}
              onClick={() => SoundFX.playHover()}
              className={`transition-colors ${
                isDark ? 'hover:text-white' : 'hover:text-zinc-950'
              }`}
            >
              Email
            </a>
            <span>•</span>
            <a
              href={`https://wa.me/${PROFILE.phoneClean}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => SoundFX.playHover()}
              className="hover:text-[#25D366] transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
