/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BootScreen } from './components/BootScreen';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { ProjectModal } from './components/ProjectModal';
import { ProjectData } from './data/portfolioData';
import { ThemeProvider, useTheme } from './context/ThemeContext';

function PortfolioApp() {
  const { isDark } = useTheme();
  const [booted, setBooted] = useState<boolean>(false);
  const [resumeModalOpen, setResumeModalOpen] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      id="portfolio-root"
      className={`min-h-screen transition-colors duration-200 ${
        isDark ? 'bg-[#070707] text-[#ededed]' : 'bg-[#f8f9fa] text-[#111827]'
      }`}
    >
      {/* Boot Telemetry Screen */}
      {!booted && (
        <BootScreen onComplete={() => setBooted(true)} />
      )}

      {/* Main Portfolio Header */}
      <Header
        onOpenResume={() => setResumeModalOpen(true)}
      />

      <main className="overflow-hidden">
        <Hero
          onOpenResume={() => setResumeModalOpen(true)}
          onExploreProjects={() => scrollToSection('projects')}
          onViewSkills={() => scrollToSection('skills')}
        />

        <About
          onOpenResume={() => setResumeModalOpen(true)}
          onExploreProjects={() => scrollToSection('projects')}
        />

        <Projects
          onSelectProject={(project) => setSelectedProject(project)}
        />

        <Skills />

        <Education
          onOpenResume={() => setResumeModalOpen(true)}
        />

        <Contact />
      </main>

      <Footer />

      {/* Full Resume Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />

      {/* Project Deep-Dive Architecture Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioApp />
    </ThemeProvider>
  );
}
