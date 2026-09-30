import React, { useState, useEffect } from 'react';
import {
  X,
  Copy,
  Check,
  Printer,
  Download,
  ExternalLink,
  Mail,
  Phone,
  Github,
  Linkedin,
  GraduationCap,
  Briefcase,
  Code2
} from 'lucide-react';
import { SoundFX } from '../utils/soundFX';
import { PROFILE, PROJECTS, SKILL_CATEGORIES } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const plainTextResume = `
JAWAD UR REHMAN
MERN Stack Developer
Phone: ${PROFILE.phone} | Email: ${PROFILE.email} | GitHub: ${PROFILE.githubDisplay}
LinkedIn: ${PROFILE.linkedinDisplay}

PROFESSIONAL SUMMARY
${PROFILE.summary}

TECHNICAL SKILLS
Languages & Markup: HTML5, CSS3, JavaScript (ES6+)
Frontend: React.js, Tailwind CSS
Backend: Node.js, Express.js, REST API Development
Database: MongoDB
Tools: Git, GitHub, Prompt Engineering
Professional Skills: Communication, Teamwork, Problem Solving

PROJECTS
ShopNest | Full-Stack E-Commerce Web Application (Final Year Project)
• Built a full-stack e-commerce platform using the MERN stack (MongoDB, Express.js, React.js, Node.js) covering product listing, cart, and order management.
• Designed and implemented RESTful APIs for core features including user authentication, product management, and order processing.
• Developed a responsive, mobile-friendly user interface with React.js and Tailwind CSS for a smooth shopping experience.
• Structured backend logic with Express.js and Node.js and modeled application data using MongoDB for scalable data handling.
• Managed source code and version history using Git and GitHub throughout the development lifecycle.

Banking Transaction System | Backend Project (Personal Project)
• Developed a banking transaction management system using Node.js, Express.js, and MongoDB to handle account operations and transaction records.
• Implemented secure user authentication and authorization flows to protect account and transaction data.
• Built RESTful APIs with Node.js and Express.js to process transactions such as deposits, withdrawals, and transfers.
• Designed database schemas and backend logic to let users view balances and track transaction history in real time.
• Used MongoDB for persistent storage of user, account, and transaction data with a focus on data consistency.

EDUCATION
Bachelor's Degree (2021 – 2025)
Kohat University of Science and Technology (KUST)
`.trim();

  const handleCopy = () => {
    SoundFX.playClick();
    navigator.clipboard.writeText(plainTextResume);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    SoundFX.playClick();
    window.print();
  };

  const handleDownloadTxt = () => {
    SoundFX.playClick();
    const element = document.createElement('a');
    const file = new Blob([plainTextResume], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'Jawad_Ur_Rehman_MERN_Resume.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div
      id="resume-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-5 md:p-8 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white text-zinc-900 w-full max-w-4xl max-h-[92vh] rounded-2xl overflow-y-auto p-4 sm:p-7 md:p-10 shadow-2xl relative border border-zinc-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Action Header (Sticky) */}
        <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3 pb-3 sm:pb-4 border-b border-zinc-200 mb-5 sm:mb-6 sticky -top-4 sm:-top-7 md:-top-10 bg-white/95 backdrop-blur-sm z-20 py-1.5 sm:py-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#de1b1c]"></span>
            <span className="font-mono-hud text-xs text-zinc-600 uppercase font-semibold">
              RESUME · <span className="hidden min-[480px]:inline">JAWAD UR REHMAN</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-mono-hud font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              {copied ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
              <span>{copied ? 'COPIED' : 'COPY'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-mono-hud font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <Printer size={13} />
              <span className="hidden xs:inline">PRINT / PDF</span>
              <span className="xs:hidden">PRINT</span>
            </button>

            <button
              onClick={handleDownloadTxt}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-mono-hud font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <Download size={13} />
              <span>TXT</span>
            </button>

            <button
              onClick={() => {
                SoundFX.playClick();
                onClose();
              }}
              aria-label="Close Resume"
              className="p-1.5 rounded-lg hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer ml-0.5 sm:ml-1"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Formatted Resume Body matching the Uploaded CV */}
        <div className="space-y-7 text-left font-sans">
          {/* Header block */}
          <div className="text-center space-y-1.5 border-b border-zinc-200 pb-5">
            <h1 className="text-3xl sm:text-4xl font-condensed font-bold tracking-tight text-zinc-950 uppercase">
              JAWAD UR REHMAN
            </h1>
            <p className="text-sm font-semibold tracking-wide text-[#de1b1c] uppercase">
              MERN Stack Developer
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-zinc-600 pt-1">
              <span>Phone: <a href={`tel:${PROFILE.phone}`} className="hover:underline">{PROFILE.phone}</a></span>
              <span className="text-zinc-300">|</span>
              <span>Email: <a href={`mailto:${PROFILE.email}`} className="hover:underline">{PROFILE.email}</a></span>
              <span className="text-zinc-300">|</span>
              <span>
                GitHub:{' '}
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:underline"
                >
                  {PROFILE.githubDisplay}
                </a>
              </span>
              <span className="text-zinc-300 hidden sm:inline">|</span>
              <span className="block sm:inline">
                LinkedIn:{' '}
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:underline"
                >
                  {PROFILE.linkedinDisplay}
                </a>
              </span>
            </div>
          </div>

          {/* Professional Summary */}
          <section className="space-y-2">
            <h2 className="text-xs font-mono-hud font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-1">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
              {PROFILE.summary}
            </p>
          </section>

          {/* Technical Skills */}
          <section className="space-y-2.5">
            <h2 className="text-xs font-mono-hud font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-1">
              TECHNICAL SKILLS
            </h2>
            <div className="space-y-1 text-xs sm:text-sm text-zinc-800">
              <p>
                <strong className="font-semibold text-zinc-950">Languages &amp; Markup:</strong> HTML5, CSS3, JavaScript (ES6+)
              </p>
              <p>
                <strong className="font-semibold text-zinc-950">Frontend:</strong> React.js, Tailwind CSS
              </p>
              <p>
                <strong className="font-semibold text-zinc-950">Backend:</strong> Node.js, Express.js, REST API Development
              </p>
              <p>
                <strong className="font-semibold text-zinc-950">Database:</strong> MongoDB
              </p>
              <p>
                <strong className="font-semibold text-zinc-950">Tools:</strong> Git, GitHub, Prompt Engineering
              </p>
              <p>
                <strong className="font-semibold text-zinc-950">Professional Skills:</strong> Communication, Teamwork, Problem Solving
              </p>
            </div>
          </section>

          {/* Projects */}
          <section className="space-y-4">
            <h2 className="text-xs font-mono-hud font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-1">
              PROJECTS
            </h2>

            {/* ShopNest */}
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs sm:text-sm">
                <div>
                  <span className="font-bold text-zinc-950 text-sm sm:text-base">ShopNest</span>
                  <span className="text-zinc-600 italic"> | Full-Stack E-Commerce Web Application</span>
                </div>
                <span className="text-xs font-mono-hud text-zinc-500 font-medium">Final Year Project</span>
              </div>
              <ul className="list-disc list-outside pl-4 space-y-1 text-xs sm:text-sm text-zinc-700 leading-relaxed">
                {PROJECTS[0].highlights.map((point, pIdx) => (
                  <li key={pIdx}>{point}</li>
                ))}
              </ul>
            </div>

            {/* Banking Transaction System */}
            <div className="space-y-2 pt-2">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs sm:text-sm">
                <div>
                  <span className="font-bold text-zinc-950 text-sm sm:text-base">Banking Transaction System</span>
                  <span className="text-zinc-600 italic"> | Backend Project</span>
                </div>
                <span className="text-xs font-mono-hud text-zinc-500 font-medium">Personal Project</span>
              </div>
              <ul className="list-disc list-outside pl-4 space-y-1 text-xs sm:text-sm text-zinc-700 leading-relaxed">
                {PROJECTS[1].highlights.map((point, pIdx) => (
                  <li key={pIdx}>{point}</li>
                ))}
              </ul>
            </div>
          </section>

          {/* Education */}
          <section className="space-y-2">
            <h2 className="text-xs font-mono-hud font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-1">
              EDUCATION
            </h2>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs sm:text-sm">
              <div>
                <span className="font-bold text-zinc-950">Bachelor's Degree in Computer Science</span>
                <p className="text-zinc-600 italic">Kohat University of Science and Technology (KUST)</p>
              </div>
              <span className="text-xs font-mono-hud text-zinc-500 font-medium">2021 – 2025</span>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
