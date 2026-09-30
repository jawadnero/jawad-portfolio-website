import React, { useState, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  Sun,
  Moon,
  FileText,
  Menu,
  X,
  Code2,
  ChevronRight,
  Send
} from 'lucide-react';
import { SoundFX } from '../utils/soundFX';
import { PROFILE } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  onOpenResume: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenResume }) => {
  const { isDark, toggleTheme } = useTheme();
  const [sfxEnabled, setSfxEnabled] = useState(SoundFX.isEnabled());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'skills', label: 'SKILLS' },
    { id: 'education', label: 'EDUCATION' },
    { id: 'contact', label: 'CONTACT' }
  ];

  // Track active section and scroll state
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sectionElements = navLinks.map((link) => ({
        id: link.id,
        el: document.getElementById(link.id)
      }));

      const scrollPos = window.scrollY + 200;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const item = sectionElements[i];
        if (item.el) {
          const top = item.el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSound = () => {
    const next = SoundFX.toggle();
    setSfxEnabled(next);
  };

  const handleNavClick = (id: string) => {
    SoundFX.playSelect();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        id="main-header"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? isDark
              ? 'bg-[#070707]/90 backdrop-blur-md border-b border-zinc-800/80 shadow-lg shadow-black/40'
              : 'bg-white/95 backdrop-blur-md border-b border-zinc-200/90 shadow-sm'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo / Brand Name */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
            className="flex items-center gap-2 group cursor-pointer shrink-0"
          >
            <div
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg border flex items-center justify-center transition-colors shrink-0 ${
                isDark
                  ? 'bg-zinc-900 border-zinc-800 group-hover:border-[#de1b1c]'
                  : 'bg-zinc-100 border-zinc-300 group-hover:border-[#de1b1c]'
              }`}
            >
              <Code2 size={16} className="text-[#de1b1c]" />
            </div>
            <div className="flex flex-col">
              <span
                className={`font-condensed font-bold tracking-wider text-sm xs:text-base sm:text-lg group-hover:text-[#de1b1c] transition-colors uppercase leading-none truncate max-w-[145px] xs:max-w-[200px] sm:max-w-none ${
                  isDark ? 'text-white' : 'text-zinc-950'
                }`}
              >
                {PROFILE.name}
              </span>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span
                  className={`text-[9px] sm:text-[10px] font-mono-hud uppercase tracking-widest ${
                    isDark ? 'text-zinc-400' : 'text-zinc-500'
                  }`}
                >
                  SYS.OP [2026]
                </span>
                <span className="text-[8px] sm:text-[9px] font-mono-hud px-1 rounded bg-[#de1b1c]/15 text-[#ff4d4f] border border-[#de1b1c]/30">
                  .DEV
                </span>
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav
            className={`hidden lg:flex items-center gap-1 border rounded-full px-3 py-1.5 backdrop-blur-md transition-colors ${
              isDark
                ? 'bg-zinc-900/60 border-zinc-800/80'
                : 'bg-zinc-100/90 border-zinc-200 shadow-sm'
            }`}
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  onMouseEnter={() => SoundFX.playHover()}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono-hud tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? isDark
                        ? 'bg-white text-zinc-950 font-bold shadow-sm'
                        : 'bg-zinc-950 text-white font-bold shadow-sm'
                      : isDark
                      ? 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                      : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200/70'
                  }`}
                >
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Sound FX Toggle */}
            <button
              id="header-sound-btn"
              onClick={handleToggleSound}
              title={sfxEnabled ? 'Mute Sound FX' : 'Enable Sound FX'}
              aria-label="Toggle Sound Effects"
              className={`p-2 sm:px-2.5 sm:py-1.5 rounded-xl border text-xs font-mono-hud transition-all cursor-pointer flex items-center gap-1.5 ${
                isDark
                  ? 'bg-zinc-900/80 border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white'
                  : 'bg-zinc-100 border-zinc-300 hover:border-zinc-400 text-zinc-700 hover:text-zinc-950'
              }`}
            >
              {sfxEnabled ? (
                <>
                  <Volume2 size={15} className="text-[#de1b1c]" />
                  <span className="hidden xl:inline text-[11px]">SFX: ON</span>
                </>
              ) : (
                <>
                  <VolumeX size={15} className={isDark ? 'text-zinc-500' : 'text-zinc-400'} />
                  <span className={`hidden xl:inline text-[11px] ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>
                    SFX: OFF
                  </span>
                </>
              )}
            </button>

            {/* Theme Toggle Button */}
            <button
              id="header-theme-btn"
              onClick={() => {
                SoundFX.playClick();
                toggleTheme();
              }}
              title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              aria-label="Toggle Theme"
              className={`p-2 sm:px-2.5 sm:py-1.5 rounded-xl border text-xs font-mono-hud transition-all cursor-pointer flex items-center gap-1.5 ${
                isDark
                  ? 'bg-zinc-900/80 border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white'
                  : 'bg-zinc-100 border-zinc-300 hover:border-zinc-400 text-zinc-800 hover:text-zinc-950'
              }`}
            >
              {isDark ? (
                <>
                  <Sun size={15} className="text-amber-400" />
                  <span className="hidden xl:inline text-[11px] font-semibold">LIGHT</span>
                </>
              ) : (
                <>
                  <Moon size={15} className="text-indigo-600" />
                  <span className="hidden xl:inline text-[11px] font-semibold">DARK</span>
                </>
              )}
            </button>

            {/* Resume Button */}
            <button
              id="header-resume-btn"
              onClick={() => {
                SoundFX.playSelect();
                onOpenResume();
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#de1b1c] hover:bg-[#ff2a2b] text-white text-xs font-mono-hud font-semibold uppercase tracking-wider transition-all shadow-md shadow-[#de1b1c]/25 cursor-pointer"
            >
              <FileText size={14} />
              <span>RESUME</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              id="header-burger-btn"
              onClick={() => {
                SoundFX.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              className={`lg:hidden p-2 rounded-xl border transition-all cursor-pointer ${
                isDark
                  ? 'bg-zinc-900/80 border-zinc-800 text-zinc-300 hover:text-white'
                  : 'bg-zinc-100 border-zinc-300 text-zinc-700 hover:text-zinc-950'
              }`}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Out Menu Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-30 lg:hidden bg-black/80 backdrop-blur-md pt-20 px-4 pb-8 flex flex-col justify-between"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className={`border rounded-2xl p-5 space-y-4 shadow-2xl ${
              isDark ? 'bg-[#0f0f0f] border-zinc-800' : 'bg-white border-zinc-200'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`flex items-center justify-between pb-3 border-b text-xs font-mono-hud uppercase tracking-widest ${
                isDark ? 'border-zinc-800 text-zinc-500' : 'border-zinc-200 text-zinc-600'
              }`}
            >
              <span>SYSTEM NAVIGATION</span>
              <span className="text-[#de1b1c]">06 DESTINATIONS</span>
            </div>

            <nav className="flex flex-col gap-1.5">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`flex items-center justify-between p-3 rounded-xl text-left text-sm font-mono-hud uppercase tracking-wider transition-all cursor-pointer ${
                      isActive
                        ? isDark
                          ? 'bg-zinc-800/90 text-white border-l-4 border-[#de1b1c]'
                          : 'bg-zinc-100 text-zinc-950 font-bold border-l-4 border-[#de1b1c]'
                        : isDark
                        ? 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
                        : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight
                      size={15}
                      className={isActive ? 'text-[#de1b1c]' : isDark ? 'text-zinc-600' : 'text-zinc-400'}
                    />
                  </button>
                );
              })}
            </nav>

            <div
              className={`pt-2 border-t flex flex-col gap-2 ${
                isDark ? 'border-zinc-800/80' : 'border-zinc-200'
              }`}
            >
              <button
                onClick={() => {
                  SoundFX.playSelect();
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-[#de1b1c] text-white font-mono-hud text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#de1b1c]/25 cursor-pointer"
              >
                <FileText size={15} />
                <span>VIEW FULL RESUME &amp; CV</span>
              </button>

              <a
                href={`https://wa.me/${PROFILE.phoneClean}?text=${encodeURIComponent(
                  "Hi Jawad, I reviewed your MERN Stack portfolio and would like to connect."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => SoundFX.playClick()}
                className={`w-full flex items-center justify-center gap-2 p-3 rounded-xl border font-mono-hud text-xs uppercase tracking-wider cursor-pointer ${
                  isDark
                    ? 'bg-zinc-900 hover:bg-zinc-800 border-zinc-700 text-zinc-200'
                    : 'bg-zinc-100 hover:bg-zinc-200 border-zinc-300 text-zinc-800'
                }`}
              >
                <Send size={14} className="text-emerald-500" />
                <span>WHATSAPP CONNECT ({PROFILE.phone})</span>
              </a>
            </div>
          </div>

          <div
            className={`text-center text-xs font-mono-hud py-3 ${
              isDark ? 'text-zinc-500' : 'text-zinc-600'
            }`}
          >
            <span>JAWAD UR REHMAN · KUST BS COMPUTER SCIENCE</span>
          </div>
        </div>
      )}
    </>
  );
};
