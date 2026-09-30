import React from 'react';
import {
  GraduationCap,
  Calendar,
  MapPin,
  Award,
  ArrowUpRight
} from 'lucide-react';
import { SoundFX } from '../utils/soundFX';
import { PROFILE } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

interface EducationProps {
  onOpenResume: () => void;
}

export const Education: React.FC<EducationProps> = ({ onOpenResume }) => {
  const { isDark } = useTheme();
  const { education } = PROFILE;

  return (
    <section
      id="education"
      className={`py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 relative border-t transition-colors ${
        isDark ? 'bg-black border-zinc-900' : 'bg-[#eef0f3] border-zinc-200'
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
            <span className="text-[#de1b1c]">03</span>
            <span className={isDark ? 'text-zinc-600' : 'text-zinc-400'}>/</span>
            <span>ACADEMIC FOUNDATION &amp; SCIENTIFIC RIGOR</span>
          </div>
          <span className="hidden sm:inline text-zinc-500">COMPUTER SCIENCE CORE</span>
        </div>

        {/* Section Title */}
        <div className="my-8 sm:my-12 space-y-2">
          <h2
            className={`text-3xl sm:text-5xl md:text-6xl font-condensed font-bold tracking-tight uppercase ${
              isDark ? 'text-white' : 'text-zinc-950'
            }`}
          >
            ACADEMIC <span className="text-[#de1b1c]">FOUNDATION</span>
          </h2>
          <p
            className={`font-mono-hud text-xs sm:text-sm ${
              isDark ? 'text-zinc-400' : 'text-zinc-600'
            }`}
          >
            THEORETICAL RIGOR GROUNDING PRACTICAL SOFTWARE ARCHITECTURES
          </p>
        </div>

        {/* Main Card */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 border rounded-2xl p-5 sm:p-7 md:p-10 shadow-xl ${
            isDark ? 'bg-[#0f0f0f] border-zinc-800' : 'bg-white border-zinc-200'
          }`}
        >
          {/* Left Column: Degree details and highlights */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#de1b1c]/15 text-[#ff4d4f] border border-[#de1b1c]/30 text-xs font-mono-hud font-semibold uppercase tracking-wider">
                <GraduationCap size={14} />
                <span>UNDERGRADUATE DEGREE</span>
              </div>
              <h3
                className={`text-2xl sm:text-3xl lg:text-4xl font-condensed font-bold uppercase ${
                  isDark ? 'text-white' : 'text-zinc-950'
                }`}
              >
                {education.degree} in Computer Science
              </h3>
              <p
                className={`text-lg font-medium ${
                  isDark ? 'text-zinc-300' : 'text-zinc-800'
                }`}
              >
                {education.institution}
              </p>
              <div
                className={`flex flex-wrap items-center gap-3 text-xs font-mono-hud pt-1 ${
                  isDark ? 'text-zinc-400' : 'text-zinc-600'
                }`}
              >
                <span className="flex items-center gap-1">
                  <Calendar size={13} className="text-[#de1b1c]" />
                  <span>{education.timeframe}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin size={13} className="text-[#de1b1c]" />
                  <span>{education.location}</span>
                </span>
                <span>•</span>
                <span className="text-emerald-500 font-semibold">{education.status}</span>
              </div>
            </div>

            <p
              className={`text-sm leading-relaxed font-light ${
                isDark ? 'text-zinc-300' : 'text-zinc-700'
              }`}
            >
              Acquired strong computer science foundations and bridged academic principles directly with modern full-stack web engineering. Focused on independently designing, architecting, and delivering production-style MERN applications with clean REST APIs and database modeling.
            </p>

            {/* Core Academic Pillars from CV */}
            <div className="space-y-3 pt-2">
              <h4
                className={`text-xs font-mono-hud uppercase tracking-widest flex items-center gap-2 ${
                  isDark ? 'text-zinc-400' : 'text-zinc-700'
                }`}
              >
                <Award size={14} className="text-[#de1b1c]" />
                <span>CORE ACADEMIC PILLARS</span>
              </h4>
              <ul className="space-y-2.5">
                {education.highlights.map((item, idx) => (
                  <li
                    key={idx}
                    className={`text-xs sm:text-sm flex items-start gap-2.5 font-light ${
                      isDark ? 'text-zinc-300' : 'text-zinc-700'
                    }`}
                  >
                    <span className="text-[#de1b1c] mt-0.5 font-bold">›</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Key Coursework & Capstone Telemetry */}
          <div
            className={`lg:col-span-5 flex flex-col justify-between space-y-6 p-6 sm:p-8 rounded-xl border ${
              isDark
                ? 'bg-black border-zinc-800/80'
                : 'bg-zinc-50 border-zinc-200 shadow-sm'
            }`}
          >
            <div className="space-y-4">
              <div
                className={`flex items-center justify-between pb-3 border-b text-xs font-mono-hud ${
                  isDark ? 'border-zinc-800 text-zinc-400' : 'border-zinc-200 text-zinc-600'
                }`}
              >
                <span className="uppercase tracking-widest text-[#de1b1c] font-bold">
                  CURRICULUM TELEMETRY
                </span>
                <span>2021 – 2025</span>
              </div>

              <div className="space-y-3 text-xs font-mono-hud">
                <div
                  className={`p-3 rounded-lg border space-y-1 ${
                    isDark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white border-zinc-200'
                  }`}
                >
                  <span className="text-zinc-500 block text-[10px] uppercase">
                    CAPSTONE PROJECT
                  </span>
                  <span
                    className={`font-semibold block ${
                      isDark ? 'text-white' : 'text-zinc-950'
                    }`}
                  >
                    ShopNest — Full-Stack MERN Platform
                  </span>
                  <span
                    className={`text-[11px] block font-light ${
                      isDark ? 'text-zinc-400' : 'text-zinc-600'
                    }`}
                  >
                    Independently designed, developed, and demonstrated as the official Final Year Project.
                  </span>
                </div>

                <div
                  className={`p-3 rounded-lg border space-y-1 ${
                    isDark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white border-zinc-200'
                  }`}
                >
                  <span className="text-zinc-500 block text-[10px] uppercase">
                    KEY RIGOROUS SUBJECTS
                  </span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {[
                      'Data Structures & Algorithms',
                      'Database Systems',
                      'Web Technologies',
                      'Software Engineering',
                      'Operating Systems',
                      'Computer Networks'
                    ].map((subject, sIdx) => (
                      <span
                        key={sIdx}
                        className={`px-2 py-0.5 rounded border text-[10px] ${
                          isDark
                            ? 'bg-black border-zinc-800 text-zinc-300'
                            : 'bg-zinc-100 border-zinc-200 text-zinc-800'
                        }`}
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>

                <div
                  className={`p-3 rounded-lg border space-y-1 ${
                    isDark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white border-zinc-200'
                  }`}
                >
                  <span className="text-zinc-500 block text-[10px] uppercase">
                    GRADUATION STATUS
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-emerald-500 font-semibold">
                      Complete 4-Year Bachelor's Degree
                    </span>
                  </div>
                  <span
                    className={`text-[11px] block font-light ${
                      isDark ? 'text-zinc-400' : 'text-zinc-600'
                    }`}
                  >
                    Graduated from KUST. Immediately available for on-site or remote full-stack engineering opportunities.
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                SoundFX.playSelect();
                onOpenResume();
              }}
              className={`w-full flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-mono-hud uppercase tracking-wider transition-all cursor-pointer ${
                isDark
                  ? 'bg-zinc-900 hover:bg-zinc-800 border-zinc-700 text-zinc-200'
                  : 'bg-white hover:bg-zinc-100 border-zinc-300 text-zinc-900 shadow-sm'
              }`}
            >
              <span>VIEW COMPLETE CV &amp; TRANSCRIPT DETAILS</span>
              <ArrowUpRight size={14} className="text-[#de1b1c]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
