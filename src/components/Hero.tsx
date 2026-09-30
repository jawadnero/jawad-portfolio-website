import React, { useState, useEffect } from 'react';
import {
  ArrowUpRight,
  FileText,
  Terminal,
  Github,
  Linkedin,
  Mail,
  ChevronDown
} from 'lucide-react';
import heroPortrait from '../assets/images/regenerated_image_1790778080510.png';
import { SoundFX } from '../utils/soundFX';
import { PROFILE } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

interface HeroProps {
  onOpenResume: () => void;
  onExploreProjects: () => void;
  onViewSkills: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenResume,
  onExploreProjects,
  onViewSkills
}) => {
  const { isDark } = useTheme();
  const [subtitleIndex, setSubtitleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSubtitleIndex((prev) => (prev + 1) % PROFILE.subtitles.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="home"
      className={`relative min-h-[92vh] lg:min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden ${
        isDark ? 'bg-[#070707] bg-grid-dots' : 'bg-[#f8f9fa] bg-grid-dots'
      }`}
    >
      {/* Background ambient lighting */}
      <div
        className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 blur-[130px] rounded-full pointer-events-none -z-10 ${
          isDark ? 'bg-[#de1b1c]/10' : 'bg-[#de1b1c]/8'
        }`}
      />
      <div
        className={`absolute bottom-10 right-10 w-72 h-72 blur-[120px] rounded-full pointer-events-none -z-10 ${
          isDark ? 'bg-rose-950/15' : 'bg-rose-200/30'
        }`}
      />

      <div className="max-w-7xl w-full mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Text, Subtitle, Bio, CTAs, Stats */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7">
            {/* Telemetry Status Pill */}
            <div
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono-hud transition-colors ${
                isDark
                  ? 'bg-zinc-900/90 border-zinc-800 text-zinc-300'
                  : 'bg-white border-zinc-300 text-zinc-700 shadow-sm'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[#de1b1c] font-semibold">SYS.STATUS: OPERATIONAL [2026]</span>
              <span className={isDark ? 'text-zinc-600' : 'text-zinc-300'}>|</span>
              <span className={isDark ? 'text-zinc-400' : 'text-zinc-600'}>AVAILABLE FOR ROLES</span>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <div
                className={`flex items-center gap-2 text-[10px] sm:text-xs font-mono-hud uppercase tracking-widest ${
                  isDark ? 'text-zinc-500' : 'text-zinc-600'
                }`}
              >
                <span>••• WELCOME TO MY PORTFOLIO •••</span>
              </div>
              <h1
                className={`text-4xl min-[420px]:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-condensed font-bold tracking-tight uppercase leading-[0.92] ${
                  isDark ? 'text-white' : 'text-zinc-950'
                }`}
              >
                {PROFILE.name.split(' ')[0]}{' '}
                <span className="text-[#de1b1c] inline-block hover:scale-105 transition-transform duration-300">
                  {PROFILE.name.split(' ').slice(1).join(' ')}
                </span>
              </h1>

              {/* Dynamic Animated Subtitle */}
              <div className="h-8 sm:h-9 flex items-center">
                <span
                  className={`text-sm min-[380px]:text-base sm:text-xl md:text-2xl font-mono-hud font-semibold tracking-wide flex items-center gap-1.5 sm:gap-2 ${
                    isDark ? 'text-zinc-300' : 'text-zinc-800'
                  }`}
                >
                  <span className="text-[#de1b1c] font-bold">&gt;</span>
                  <span className="transition-all duration-500 truncate">
                    {PROFILE.subtitles[subtitleIndex]}
                  </span>
                  <span className="w-1.5 sm:w-2 h-4 sm:h-5 bg-[#de1b1c] animate-pulse inline-block shrink-0" />
                </span>
              </div>
            </div>

            {/* Professional Summary from CV */}
            <p
              className={`text-xs min-[400px]:text-sm sm:text-base leading-relaxed font-light max-w-2xl ${
                isDark ? 'text-zinc-300' : 'text-zinc-700'
              }`}
            >
              {PROFILE.summary}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col min-[480px]:flex-row flex-wrap items-stretch min-[480px]:items-center gap-2.5 sm:gap-3 pt-2">
              <button
                id="hero-explore-btn"
                onClick={() => {
                  SoundFX.playSelect();
                  onExploreProjects();
                }}
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-[#de1b1c] hover:bg-[#ff2a2b] text-white text-xs sm:text-sm font-mono-hud font-bold uppercase tracking-wider transition-all shadow-lg shadow-[#de1b1c]/30 hover:shadow-[#de1b1c]/50 hover:-translate-y-0.5 cursor-pointer"
              >
                <span>EXPLORE PROJECTS</span>
                <ArrowUpRight size={16} />
              </button>

              <button
                id="hero-resume-btn"
                onClick={() => {
                  SoundFX.playClick();
                  onOpenResume();
                }}
                className={`inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl border text-xs sm:text-sm font-mono-hud uppercase tracking-wider transition-all hover:-translate-y-0.5 cursor-pointer ${
                  isDark
                    ? 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 hover:border-zinc-700 text-zinc-200'
                    : 'bg-white hover:bg-zinc-50 border-zinc-300 hover:border-zinc-400 text-zinc-900 shadow-sm'
                }`}
              >
                <FileText size={16} className="text-[#de1b1c]" />
                <span>VIEW RESUME</span>
              </button>

              <button
                id="hero-skills-btn"
                onClick={() => {
                  SoundFX.playClick();
                  onViewSkills();
                }}
                className={`inline-flex items-center justify-center gap-2 px-4 py-3 sm:py-3.5 rounded-xl border text-xs sm:text-sm font-mono-hud uppercase tracking-wider transition-all cursor-pointer ${
                  isDark
                    ? 'bg-black/60 hover:bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                    : 'bg-zinc-100 hover:bg-zinc-200 border-zinc-300 text-zinc-700 hover:text-zinc-950'
                }`}
              >
                <Terminal size={15} />
                <span>SKILLS</span>
              </button>
            </div>

            {/* Quick Contact & Social Strip */}
            <div
              className={`flex flex-wrap items-center gap-3 sm:gap-4 text-[11px] sm:text-xs font-mono-hud pt-2 border-t ${
                isDark ? 'border-zinc-900 text-zinc-400' : 'border-zinc-200 text-zinc-600'
              }`}
            >
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => SoundFX.playHover()}
                className={`flex items-center gap-1.5 transition-colors ${
                  isDark ? 'hover:text-white' : 'hover:text-zinc-950'
                }`}
              >
                <Github size={14} className="text-[#de1b1c]" />
                <span>jawadnero</span>
              </a>
              <span className={isDark ? 'text-zinc-700' : 'text-zinc-300'}>•</span>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => SoundFX.playHover()}
                className={`flex items-center gap-1.5 transition-colors ${
                  isDark ? 'hover:text-white' : 'hover:text-zinc-950'
                }`}
              >
                <Linkedin size={14} className="text-[#de1b1c]" />
                <span>LinkedIn</span>
              </a>
              <span className={isDark ? 'text-zinc-700' : 'text-zinc-300'}>•</span>
              <a
                href={`mailto:${PROFILE.email}`}
                onClick={() => SoundFX.playHover()}
                className={`flex items-center gap-1.5 transition-colors truncate max-w-[210px] sm:max-w-none ${
                  isDark ? 'hover:text-white' : 'hover:text-zinc-950'
                }`}
              >
                <Mail size={14} className="text-[#de1b1c] shrink-0" />
                <span className="truncate">{PROFILE.email}</span>
              </a>
            </div>

            {/* 4-Item Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 pt-3">
              {PROFILE.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className={`p-3 sm:p-3.5 rounded-xl border transition-colors ${
                    isDark
                      ? 'bg-[#0f0f0f] border-zinc-800/80 hover:border-zinc-700'
                      : 'bg-white border-zinc-200 hover:border-zinc-300 shadow-sm'
                  }`}
                >
                  <span
                    className={`text-xl sm:text-2xl lg:text-3xl font-condensed font-bold block ${
                      isDark ? 'text-white' : 'text-zinc-950'
                    }`}
                  >
                    {stat.value}
                  </span>
                  <span
                    className={`text-[10px] sm:text-[11px] font-mono-hud uppercase tracking-wider block mt-0.5 truncate ${
                      isDark ? 'text-zinc-400' : 'text-zinc-600'
                    }`}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Hero Portrait Visual with Cyberpunk Reticles */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div
              className={`relative w-full max-w-[260px] min-[380px]:max-w-[300px] sm:max-w-sm lg:max-w-md aspect-[3/4] rounded-2xl p-1 shadow-2xl ${
                isDark
                  ? 'bg-gradient-to-b from-zinc-700/50 via-zinc-800/20 to-transparent'
                  : 'bg-gradient-to-b from-zinc-300 via-zinc-200/50 to-transparent'
              }`}
            >
              <div
                className={`relative w-full h-full rounded-[14px] overflow-hidden group flex items-center justify-center border ${
                  isDark ? 'bg-black border-zinc-800' : 'bg-zinc-100 border-zinc-300 shadow-inner'
                }`}
              >
                <img
                  id="hero-portrait-img"
                  src={heroPortrait}
                  alt={`${PROFILE.name} — ${PROFILE.title}`}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes('regenerated_image_1790778080510.png')) {
                      target.src = '/regenerated_image_1790778080510.png';
                    }
                  }}
                />

                {/* Cyberpunk HUD Corner Crosshairs */}
                <div className="absolute top-3 left-3 w-3.5 h-3.5 border-t-2 border-l-2 border-[#de1b1c] pointer-events-none"></div>
                <div className="absolute top-3 right-3 w-3.5 h-3.5 border-t-2 border-r-2 border-[#de1b1c] pointer-events-none"></div>
                <div className="absolute bottom-3 left-3 w-3.5 h-3.5 border-b-2 border-l-2 border-[#de1b1c] pointer-events-none"></div>
                <div className="absolute bottom-3 right-3 w-3.5 h-3.5 border-b-2 border-r-2 border-[#de1b1c] pointer-events-none"></div>

                {/* Top Badge Overlay */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <div
                    className={`px-2.5 py-1 rounded backdrop-blur-md border text-[10px] font-mono-hud flex items-center gap-1.5 ${
                      isDark
                        ? 'bg-black/80 border-zinc-800 text-zinc-300'
                        : 'bg-white/90 border-zinc-300 text-zinc-800 shadow-sm'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>ONLINE / READY</span>
                  </div>
                  <div className="px-2 py-1 rounded bg-[#de1b1c] text-white font-mono-hud text-[10px] font-bold tracking-wider shadow">
                    MERN ARCHITECT
                  </div>
                </div>

                {/* Bottom Overlay Card */}
                <div
                  className={`absolute bottom-4 left-4 right-4 p-3.5 rounded-xl backdrop-blur-md border text-left space-y-1.5 ${
                    isDark
                      ? 'bg-black/85 border-zinc-800/90'
                      : 'bg-white/95 border-zinc-300 shadow-lg'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono-hud text-[#de1b1c] font-semibold uppercase tracking-wider">
                      PRIMARY STACK
                    </span>
                    <span className={`text-[10px] font-mono-hud ${isDark ? 'text-zinc-500' : 'text-zinc-600'}`}>
                      v2026
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {['MongoDB', 'Express', 'React.js', 'Node.js'].map((tech) => (
                      <span
                        key={tech}
                        className={`px-2 py-0.5 rounded border text-[11px] font-mono-hud ${
                          isDark
                            ? 'bg-zinc-900 border-zinc-700/80 text-zinc-200'
                            : 'bg-zinc-100 border-zinc-300 text-zinc-800'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom scroll down indicator */}
        <div className="pt-12 flex justify-center">
          <button
            onClick={() => {
              SoundFX.playSelect();
              onExploreProjects();
            }}
            className={`flex flex-col items-center gap-1 transition-colors cursor-pointer group ${
              isDark ? 'text-zinc-500 hover:text-white' : 'text-zinc-500 hover:text-zinc-950'
            }`}
          >
            <span className="text-[10px] font-mono-hud uppercase tracking-widest">
              DISCOVER WORK
            </span>
            <ChevronDown size={16} className="text-[#de1b1c] group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
