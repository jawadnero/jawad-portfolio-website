import React from 'react';
import {
  Layers,
  ShieldCheck,
  Brain,
  ArrowUpRight
} from 'lucide-react';
import { SoundFX } from '../utils/soundFX';
import { PROFILE } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

interface AboutProps {
  onOpenResume: () => void;
  onExploreProjects: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenResume, onExploreProjects }) => {
  const { isDark } = useTheme();

  const pillars = [
    {
      icon: Layers,
      title: 'Full-Cycle MERN Stack Delivery',
      desc: 'Hands-on practice designing complete decoupled web applications — from modular React UI components to Express.js REST APIs and MongoDB data models.'
    },
    {
      icon: ShieldCheck,
      title: 'Transactional Integrity & Security',
      desc: 'Proven focus on secure authentication flows, route authorization guards, and robust ACID-like financial ledger logic built into the Banking System.'
    },
    {
      icon: Brain,
      title: 'Prompt Engineering & Agility',
      desc: 'Active adopter of modern AI-assisted engineering tools and prompt workflows to write cleaner code, diagnose edge cases, and accelerate delivery.'
    }
  ];

  return (
    <section
      id="about"
      className={`py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 relative border-t transition-colors ${
        isDark ? 'bg-black border-zinc-900' : 'bg-[#f4f5f7] border-zinc-200'
      }`}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header Telemetry */}
        <div
          className={`flex items-center justify-between text-xs font-mono-hud uppercase tracking-widest pb-4 border-b ${
            isDark ? 'text-zinc-500 border-zinc-800' : 'text-zinc-600 border-zinc-300'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-[#de1b1c]">00</span>
            <span className={isDark ? 'text-zinc-600' : 'text-zinc-400'}>/</span>
            <span>PROFILE &amp; METHODOLOGY</span>
          </div>
          <span className="hidden sm:inline text-zinc-500">MERN SPECIALIST</span>
        </div>

        {/* Section Title */}
        <div className="my-8 sm:my-12 space-y-3">
          <h2
            className={`text-3xl sm:text-5xl md:text-6xl font-condensed font-bold tracking-tight uppercase ${
              isDark ? 'text-white' : 'text-zinc-950'
            }`}
          >
            ENGINEERING WITH <span className="text-[#de1b1c]">DISCIPLINE &amp; PURPOSE</span>
          </h2>
          <p
            className={`font-mono-hud text-xs sm:text-sm max-w-2xl ${
              isDark ? 'text-zinc-400' : 'text-zinc-600'
            }`}
          >
            Fresher MERN developer bridging theoretical computer science foundations with hands-on, production-grade web applications.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left: Bio card */}
          <div
            className={`lg:col-span-7 border rounded-2xl p-5 sm:p-7 md:p-10 space-y-6 shadow-xl ${
              isDark ? 'bg-[#0f0f0f] border-zinc-800' : 'bg-white border-zinc-200'
            }`}
          >
            <div className="space-y-2">
              <span className="text-xs font-mono-hud text-[#de1b1c] uppercase tracking-wider font-semibold">
                PROFESSIONAL SUMMARY
              </span>
              <h3
                className={`text-2xl sm:text-3xl font-condensed font-bold ${
                  isDark ? 'text-white' : 'text-zinc-950'
                }`}
              >
                Fresher MERN Stack Developer Ready for Impact
              </h3>
            </div>

            <p
              className={`text-sm sm:text-base leading-relaxed font-light ${
                isDark ? 'text-zinc-300' : 'text-zinc-700'
              }`}
            >
              {PROFILE.summary}
            </p>

            <p
              className={`text-sm sm:text-base leading-relaxed font-light ${
                isDark ? 'text-zinc-300' : 'text-zinc-700'
              }`}
            >
              {PROFILE.aboutDetailed}
            </p>

            {/* Core Competencies Badges */}
            <div
              className={`pt-4 border-t space-y-3 ${
                isDark ? 'border-zinc-800/80' : 'border-zinc-200'
              }`}
            >
              <span
                className={`text-xs font-mono-hud uppercase tracking-widest block ${
                  isDark ? 'text-zinc-400' : 'text-zinc-500'
                }`}
              >
                CORE TECHNICAL COMPETENCIES
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  'Full-Stack MERN',
                  'RESTful API Design',
                  'React.js Hooks & State',
                  'Express.js Middleware',
                  'MongoDB Document Modeling',
                  'Tailwind Responsive UI',
                  'Git & GitHub Workflows',
                  'Prompt Engineering',
                  'Team Collaboration'
                ].map((item, idx) => (
                  <span
                    key={idx}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-mono-hud transition-colors ${
                      isDark
                        ? 'bg-black border-zinc-800 text-zinc-300 hover:border-[#de1b1c]'
                        : 'bg-zinc-100 border-zinc-200 text-zinc-800 hover:border-[#de1b1c]'
                    }`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => {
                  SoundFX.playSelect();
                  onOpenResume();
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#de1b1c] hover:bg-[#ff2a2b] text-white text-xs font-mono-hud font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-[#de1b1c]/20"
              >
                <span>CHECK FULL RESUME</span>
                <ArrowUpRight size={14} />
              </button>

              <button
                onClick={() => {
                  SoundFX.playClick();
                  onExploreProjects();
                }}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-mono-hud uppercase tracking-wider transition-all cursor-pointer ${
                  isDark
                    ? 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-zinc-300'
                    : 'bg-zinc-100 hover:bg-zinc-200 border-zinc-300 text-zinc-800'
                }`}
              >
                <span>VIEW PROJECTS</span>
              </button>
            </div>
          </div>

          {/* Right: Pillars & Strengths */}
          <div className="lg:col-span-5 space-y-4">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className={`p-6 rounded-2xl border transition-all space-y-3 group ${
                    isDark
                      ? 'bg-[#0f0f0f] border-zinc-800 hover:border-zinc-700'
                      : 'bg-white border-zinc-200 hover:border-zinc-300 shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2.5 rounded-xl border text-[#de1b1c] group-hover:scale-110 transition-transform ${
                        isDark ? 'bg-black border-zinc-800' : 'bg-zinc-100 border-zinc-200'
                      }`}
                    >
                      <Icon size={20} />
                    </div>
                    <h4
                      className={`text-lg font-condensed font-bold uppercase tracking-wide ${
                        isDark ? 'text-white' : 'text-zinc-950'
                      }`}
                    >
                      {pillar.title}
                    </h4>
                  </div>
                  <p
                    className={`text-xs sm:text-sm font-light leading-relaxed ${
                      isDark ? 'text-zinc-400' : 'text-zinc-600'
                    }`}
                  >
                    {pillar.desc}
                  </p>
                </div>
              );
            })}

            {/* Academic Credential Highlight */}
            <div
              className={`p-6 rounded-2xl border space-y-2 ${
                isDark
                  ? 'bg-gradient-to-br from-zinc-900 to-black border-zinc-800/90'
                  : 'bg-gradient-to-br from-zinc-100 to-white border-zinc-200 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono-hud">
                <span className="text-[#de1b1c] uppercase font-bold">KUST ALUMNUS</span>
                <span className={isDark ? 'text-zinc-500' : 'text-zinc-500'}>2021 – 2025</span>
              </div>
              <h5
                className={`text-base font-condensed font-bold uppercase ${
                  isDark ? 'text-white' : 'text-zinc-950'
                }`}
              >
                Kohat University of Science and Technology
              </h5>
              <p
                className={`text-xs font-mono-hud ${
                  isDark ? 'text-zinc-400' : 'text-zinc-600'
                }`}
              >
                Bachelor's Degree in Computer Science with focus on software engineering, algorithms, and full-stack web platforms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
