import React, { useState } from 'react';
import {
  Github,
  ExternalLink,
  ArrowUpRight,
  Activity
} from 'lucide-react';
import { SoundFX } from '../utils/soundFX';
import { PROJECTS, ProjectData } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

interface ProjectsProps {
  onSelectProject: (project: ProjectData) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onSelectProject }) => {
  const { isDark } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Full-Stack MERN', 'Backend & APIs'];

  const filteredProjects =
    selectedCategory === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCategory);

  const handleCategorySelect = (cat: string) => {
    SoundFX.playSelect();
    setSelectedCategory(cat);
  };

  return (
    <section
      id="projects"
      className={`py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 relative border-t transition-colors ${
        isDark ? 'bg-black border-zinc-900' : 'bg-[#eef0f3] border-zinc-200'
      }`}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Telemetry Header */}
        <div
          className={`flex items-center justify-between text-xs font-mono-hud uppercase tracking-widest pb-4 border-b ${
            isDark ? 'text-zinc-500 border-zinc-800' : 'text-zinc-600 border-zinc-300'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-[#de1b1c]">01</span>
            <span className={isDark ? 'text-zinc-600' : 'text-zinc-400'}>/</span>
            <span>FEATURED PROJECTS &amp; CODEBASES</span>
          </div>
          <span className="hidden sm:inline text-zinc-500">PRODUCTION &amp; CAPSTONE SYSTEMS</span>
        </div>

        {/* Section Heading */}
        <div className="my-8 sm:my-12 space-y-3">
          <h2
            className={`text-3xl sm:text-5xl md:text-6xl font-condensed font-bold tracking-tight uppercase ${
              isDark ? 'text-white' : 'text-zinc-950'
            }`}
          >
            PROVEN WORK &amp; <span className="text-[#de1b1c]">ENGINEERING RIGOR</span>
          </h2>
          <p
            className={`font-mono-hud text-xs sm:text-sm max-w-2xl ${
              isDark ? 'text-zinc-400' : 'text-zinc-600'
            }`}
          >
            Real full-stack web platforms and backend architectures built with the MERN stack, RESTful APIs, and database consistency.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex overflow-x-auto no-scrollbar pb-2 sm:flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-10">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
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
                <span className={isActive ? 'text-[#de1b1c]' : isDark ? 'text-zinc-600' : 'text-zinc-400'}>
                  #
                </span>
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Project Cards Grid */}
        <div className="space-y-8 sm:space-y-12">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={`border rounded-2xl p-5 sm:p-7 md:p-10 space-y-6 sm:space-y-8 transition-all shadow-xl ${
                isDark
                  ? 'bg-[#0f0f0f] border-zinc-800 hover:border-zinc-700'
                  : 'bg-white border-zinc-200 hover:border-zinc-300'
              }`}
            >
              {/* Project Card Header */}
              <div
                className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b ${
                  isDark ? 'border-zinc-800/80' : 'border-zinc-200'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2.5 py-0.5 rounded bg-[#de1b1c]/15 text-[#ff4d4f] border border-[#de1b1c]/30 text-[10px] font-mono-hud font-bold uppercase tracking-wider">
                      {project.badge}
                    </span>
                    <span
                      className={`text-xs font-mono-hud uppercase ${
                        isDark ? 'text-zinc-500' : 'text-zinc-500'
                      }`}
                    >
                      {project.category}
                    </span>
                  </div>
                  <h3
                    className={`text-3xl sm:text-4xl font-condensed font-bold tracking-wide uppercase pt-1 ${
                      isDark ? 'text-white' : 'text-zinc-950'
                    }`}
                  >
                    {project.title}
                  </h3>
                  <p
                    className={`text-xs sm:text-sm font-mono-hud ${
                      isDark ? 'text-zinc-400' : 'text-zinc-600'
                    }`}
                  >
                    {project.tagline}
                  </p>
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 sm:justify-end max-w-md">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-2.5 py-1 rounded-lg border text-xs font-mono-hud ${
                        isDark
                          ? 'bg-black border-zinc-800 text-zinc-300'
                          : 'bg-zinc-100 border-zinc-200 text-zinc-800'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {project.metrics.map((metric, mIdx) => (
                  <div
                    key={mIdx}
                    className={`p-3.5 rounded-xl border space-y-1 ${
                      isDark
                        ? 'bg-black border-zinc-800/80'
                        : 'bg-zinc-50 border-zinc-200 shadow-sm'
                    }`}
                  >
                    <span
                      className={`text-[10px] font-mono-hud uppercase tracking-widest block ${
                        isDark ? 'text-zinc-500' : 'text-zinc-500'
                      }`}
                    >
                      {metric.label}
                    </span>
                    <strong
                      className={`text-xs sm:text-sm font-mono-hud font-bold block truncate ${
                        isDark ? 'text-white' : 'text-zinc-950'
                      }`}
                    >
                      {metric.value}
                    </strong>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4
                  className={`text-[10px] sm:text-xs font-mono-hud uppercase tracking-widest ${
                    isDark ? 'text-zinc-400' : 'text-zinc-600'
                  }`}
                >
                  PROJECT OVERVIEW
                </h4>
                <p
                  className={`text-xs sm:text-sm leading-relaxed font-light ${
                    isDark ? 'text-zinc-300' : 'text-zinc-700'
                  }`}
                >
                  {project.description}
                </p>
              </div>

              {/* Architectural Accomplishments (All CV bullet points) */}
              <div className="space-y-2.5">
                <h4
                  className={`text-[10px] sm:text-xs font-mono-hud uppercase tracking-widest flex items-center gap-1.5 ${
                    isDark ? 'text-zinc-400' : 'text-zinc-700'
                  }`}
                >
                  <Activity size={13} className="text-[#de1b1c]" />
                  <span>KEY ARCHITECTURAL ACCOMPLISHMENTS (CV VERIFIED)</span>
                </h4>
                <ul className="space-y-2">
                  {project.highlights.map((highlight, hIdx) => (
                    <li
                      key={hIdx}
                      className={`text-xs sm:text-sm flex items-start gap-2.5 leading-relaxed font-light ${
                        isDark ? 'text-zinc-300' : 'text-zinc-700'
                      }`}
                    >
                      <span className="text-[#de1b1c] font-bold mt-0.5 select-none">›</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack Layering */}
              <div className="space-y-2 pt-1">
                <h4
                  className={`text-[10px] sm:text-xs font-mono-hud uppercase tracking-widest ${
                    isDark ? 'text-zinc-400' : 'text-zinc-600'
                  }`}
                >
                  TECH STACK LAYERING
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs font-mono-hud">
                  {project.techStack.frontend && (
                    <div
                      className={`p-3 rounded-lg border space-y-1 ${
                        isDark ? 'bg-black border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                      }`}
                    >
                      <span className="text-zinc-500 block text-[10px] uppercase tracking-wider">
                        FRONTEND &amp; CLIENT
                      </span>
                      <span className={isDark ? 'text-zinc-200' : 'text-zinc-900'}>
                        {project.techStack.frontend.join(' · ')}
                      </span>
                    </div>
                  )}

                  {project.techStack.backend && (
                    <div
                      className={`p-3 rounded-lg border space-y-1 ${
                        isDark ? 'bg-black border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                      }`}
                    >
                      <span className="text-zinc-500 block text-[10px] uppercase tracking-wider">
                        BACKEND &amp; API LAYER
                      </span>
                      <span className={isDark ? 'text-zinc-200' : 'text-zinc-900'}>
                        {project.techStack.backend.join(' · ')}
                      </span>
                    </div>
                  )}

                  {project.techStack.database && (
                    <div
                      className={`p-3 rounded-lg border space-y-1 ${
                        isDark ? 'bg-black border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                      }`}
                    >
                      <span className="text-zinc-500 block text-[10px] uppercase tracking-wider">
                        DATABASE &amp; SCHEMAS
                      </span>
                      <span className={isDark ? 'text-zinc-200' : 'text-zinc-900'}>
                        {project.techStack.database.join(' · ')}
                      </span>
                    </div>
                  )}

                  {project.techStack.tools && (
                    <div
                      className={`p-3 rounded-lg border space-y-1 ${
                        isDark ? 'bg-black border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                      }`}
                    >
                      <span className="text-zinc-500 block text-[10px] uppercase tracking-wider">
                        TOOLS &amp; WORKFLOW
                      </span>
                      <span className={isDark ? 'text-zinc-200' : 'text-zinc-900'}>
                        {project.techStack.tools.join(' · ')}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div
                className={`pt-4 border-t flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 ${
                  isDark ? 'border-zinc-800' : 'border-zinc-200'
                }`}
              >
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => SoundFX.playHover()}
                  className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border text-xs font-mono-hud uppercase tracking-wider transition-all cursor-pointer ${
                    isDark
                      ? 'bg-black hover:bg-zinc-900 border-zinc-800 hover:border-zinc-700 text-zinc-200'
                      : 'bg-zinc-100 hover:bg-zinc-200 border-zinc-300 hover:border-zinc-400 text-zinc-800'
                  }`}
                >
                  <Github size={15} className="text-[#de1b1c]" />
                  <span>VIEW REPOSITORY ON GITHUB</span>
                  <ExternalLink size={13} className={isDark ? 'text-zinc-500' : 'text-zinc-400'} />
                </a>

                <button
                  onClick={() => {
                    SoundFX.playSelect();
                    onSelectProject(project);
                  }}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#de1b1c] hover:bg-[#ff2a2b] text-white text-xs font-mono-hud font-bold uppercase tracking-wider transition-all shadow-md shadow-[#de1b1c]/20 cursor-pointer"
                >
                  <span>INSPECT ARCHITECTURE &amp; ENDPOINTS</span>
                  <ArrowUpRight size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
