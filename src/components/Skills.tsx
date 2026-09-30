import React, { useState } from 'react';
import {
  Code,
  Layout,
  Server,
  Database,
  Wrench,
  Users,
  Search,
  Terminal
} from 'lucide-react';
import { SoundFX } from '../utils/soundFX';
import { SKILL_CATEGORIES, SkillCategory } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

export const Skills: React.FC = () => {
  const { isDark } = useTheme();
  const [activeCategoryId, setActiveCategoryId] = useState<string>(SKILL_CATEGORIES[0].id);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const activeCategory =
    SKILL_CATEGORIES.find((c) => c.id === activeCategoryId) || SKILL_CATEGORIES[0];

  const getCategoryIcon = (iconName: SkillCategory['iconName']) => {
    switch (iconName) {
      case 'Code':
        return <Code size={16} />;
      case 'Layout':
        return <Layout size={16} />;
      case 'Server':
        return <Server size={16} />;
      case 'Database':
        return <Database size={16} />;
      case 'Wrench':
        return <Wrench size={16} />;
      case 'Users':
        return <Users size={16} />;
      default:
        return <Terminal size={16} />;
    }
  };

  const handleCategoryChange = (id: string) => {
    SoundFX.playSelect();
    setActiveCategoryId(id);
  };

  const displayedSkills = searchQuery.trim()
    ? activeCategory.skills.filter(
        (s) =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : activeCategory.skills;

  return (
    <section
      id="skills"
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
            <span className="text-[#de1b1c]">02</span>
            <span className={isDark ? 'text-zinc-600' : 'text-zinc-400'}>/</span>
            <span>TECHNICAL CAPABILITIES</span>
          </div>
          <span className="hidden sm:inline text-zinc-500">
            RIGOROUS MERN &amp; FULL-STACK ARSENAL
          </span>
        </div>

        {/* Section Title */}
        <div className="my-8 sm:my-12 space-y-3">
          <h2
            className={`text-3xl sm:text-5xl md:text-6xl font-condensed font-bold tracking-tight uppercase ${
              isDark ? 'text-white' : 'text-zinc-950'
            }`}
          >
            THE SKILLS BEHIND THE <span className="text-[#de1b1c]">WORK</span>
          </h2>
          <p
            className={`font-mono-hud text-xs sm:text-sm max-w-2xl ${
              isDark ? 'text-zinc-400' : 'text-zinc-600'
            }`}
          >
            A comprehensive, tested technical toolkit centered on the modern MERN stack, REST API architecture, database integrity, and collaborative prompt engineering.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex overflow-x-auto no-scrollbar pb-2 sm:flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
          {SKILL_CATEGORIES.map((cat) => {
            const isActive = activeCategoryId === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl border text-xs sm:text-sm font-mono-hud uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  isActive
                    ? isDark
                      ? 'bg-zinc-900 border-[#de1b1c] text-white shadow-lg shadow-[#de1b1c]/15'
                      : 'bg-white border-[#de1b1c] text-zinc-950 font-bold shadow-md'
                    : isDark
                    ? 'bg-[#0f0f0f] border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                    : 'bg-white border-zinc-300 text-zinc-600 hover:border-zinc-400 hover:text-zinc-950'
                }`}
              >
                <span className={isActive ? 'text-[#de1b1c]' : isDark ? 'text-zinc-500' : 'text-zinc-400'}>
                  {getCategoryIcon(cat.iconName)}
                </span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Category Container */}
        <div
          className={`border rounded-2xl p-5 sm:p-7 md:p-10 space-y-6 sm:space-y-8 shadow-xl ${
            isDark ? 'bg-[#0f0f0f] border-zinc-800' : 'bg-white border-zinc-200'
          }`}
        >
          {/* Header of Active Category */}
          <div
            className={`flex flex-wrap items-center justify-between gap-4 pb-6 border-b ${
              isDark ? 'border-zinc-800/80' : 'border-zinc-200'
            }`}
          >
            <div>
              <span className="text-xs font-mono-hud text-[#de1b1c] uppercase tracking-wider font-semibold">
                CATEGORY FOCUS
              </span>
              <h3
                className={`text-2xl sm:text-3xl font-condensed font-bold mt-1 uppercase ${
                  isDark ? 'text-white' : 'text-zinc-950'
                }`}
              >
                {activeCategory.name}
              </h3>
              <p
                className={`text-xs sm:text-sm font-mono-hud mt-1 ${
                  isDark ? 'text-zinc-400' : 'text-zinc-600'
                }`}
              >
                {activeCategory.tagline}
              </p>
            </div>

            <div
              className={`flex items-center gap-2 text-xs font-mono-hud px-3 py-1.5 rounded-lg border ${
                isDark
                  ? 'bg-zinc-900 border-zinc-800 text-zinc-400'
                  : 'bg-zinc-100 border-zinc-300 text-zinc-700'
              }`}
            >
              <Terminal size={14} className="text-[#de1b1c]" />
              <span>TESTED IN SHOPNEST &amp; BANKING REPOS</span>
            </div>
          </div>

          {/* Search Filter Inside Category */}
          <div className="relative max-w-sm">
            <Search
              size={14}
              className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${
                isDark ? 'text-zinc-500' : 'text-zinc-400'
              }`}
            />
            <input
              type="text"
              placeholder={`Filter skills in ${activeCategory.name}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-9 pr-4 py-2 border rounded-xl text-xs font-mono-hud focus:outline-none focus:border-[#de1b1c] transition-colors ${
                isDark
                  ? 'bg-black border-zinc-800 text-zinc-200 placeholder:text-zinc-600'
                  : 'bg-zinc-50 border-zinc-300 text-zinc-900 placeholder:text-zinc-400'
              }`}
            />
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayedSkills.map((skill, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-xl border transition-all space-y-3 ${
                  isDark
                    ? 'bg-black border-zinc-800/80 hover:border-zinc-700'
                    : 'bg-zinc-50 border-zinc-200 hover:border-zinc-300 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#de1b1c]" />
                    <span
                      className={`font-condensed font-semibold text-lg ${
                        isDark ? 'text-white' : 'text-zinc-950'
                      }`}
                    >
                      {skill.name}
                    </span>
                    {skill.isPrimary && (
                      <span className="text-[9px] font-mono-hud px-1.5 py-0.5 rounded bg-[#de1b1c]/15 text-[#ff4d4f] border border-[#de1b1c]/30 uppercase font-semibold">
                        Core
                      </span>
                    )}
                  </div>
                  <span
                    className={`text-xs font-mono-hud font-bold ${
                      isDark ? 'text-zinc-400' : 'text-zinc-600'
                    }`}
                  >
                    {skill.level}%
                  </span>
                </div>

                {/* Progress bar */}
                <div
                  className={`h-1.5 w-full rounded-full overflow-hidden border ${
                    isDark ? 'bg-zinc-900 border-zinc-800/80' : 'bg-zinc-200 border-zinc-300'
                  }`}
                >
                  <div
                    className="h-full bg-gradient-to-r from-zinc-700 via-[#de1b1c] to-[#ff2a2b] rounded-full transition-all duration-500"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>

                <p
                  className={`text-xs font-light leading-relaxed ${
                    isDark ? 'text-zinc-400' : 'text-zinc-600'
                  }`}
                >
                  {skill.description}
                </p>
              </div>
            ))}
          </div>

          {displayedSkills.length === 0 && (
            <div
              className={`text-center py-8 text-xs font-mono-hud ${
                isDark ? 'text-zinc-500' : 'text-zinc-500'
              }`}
            >
              No skills found matching "{searchQuery}". Clear search to view all.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
