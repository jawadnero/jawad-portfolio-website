import React, { useState, useEffect } from 'react';
import {
  X,
  Github,
  ExternalLink,
  Database,
  Send
} from 'lucide-react';
import { SoundFX } from '../utils/soundFX';
import { ProjectData } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState<'architecture' | 'endpoints' | 'schemas' | 'tester'>('architecture');
  const [selectedEndpointIndex, setSelectedEndpointIndex] = useState(0);
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && project) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  // Reset state when project changes
  useEffect(() => {
    if (project) {
      setActiveTab('architecture');
      setSelectedEndpointIndex(0);
      setApiResponse(null);
    }
  }, [project]);

  if (!project) return null;

  const currentEndpoint =
    project.architectureDetails.endpoints[selectedEndpointIndex] ||
    project.architectureDetails.endpoints[0];

  const handleSimulateRequest = () => {
    SoundFX.playClick();
    setIsSimulating(true);
    setApiResponse(null);

    setTimeout(() => {
      SoundFX.playSuccess();
      setIsSimulating(false);
      if (project.id === 'shopnest') {
        if (currentEndpoint.path === '/api/products') {
          setApiResponse(
            JSON.stringify(
              {
                success: true,
                count: 24,
                page: 1,
                data: [
                  { _id: '65f1a2b3c4', name: 'Wireless Ergonomic Keyboard', price: 89.99, stock: 15, category: 'Electronics' },
                  { _id: '65f1a2b3c5', name: 'Precision USB-C Mouse', price: 49.5, stock: 40, category: 'Accessories' }
                ]
              },
              null,
              2
            )
          );
        } else if (currentEndpoint.path === '/api/auth/login') {
          setApiResponse(
            JSON.stringify(
              {
                success: true,
                message: 'Authentication successful',
                user: { id: 'usr_98124', name: 'Verified Customer', email: 'customer@shopnest.app' },
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzcl85ODEyNCI...'
              },
              null,
              2
            )
          );
        } else {
          setApiResponse(
            JSON.stringify(
              {
                success: true,
                orderId: 'ORD-2026-9921',
                status: 'Order Placed',
                totalAmount: 139.49,
                timestamp: new Date().toISOString()
              },
              null,
              2
            )
          );
        }
      } else {
        // Banking system
        if (currentEndpoint.path.includes('balance')) {
          setApiResponse(
            JSON.stringify(
              {
                success: true,
                accountNumber: 'PK92-HBL-8829104',
                currency: 'PKR',
                availableBalance: 245000.0,
                ledgerBalance: 245000.0,
                status: 'Active'
              },
              null,
              2
            )
          );
        } else if (currentEndpoint.path.includes('transfer')) {
          setApiResponse(
            JSON.stringify(
              {
                success: true,
                transactionId: 'TXN-881928471',
                senderAccount: 'PK92-HBL-8829104',
                receiverAccount: 'PK92-UBL-5541920',
                amountTransferred: 15000.0,
                remainingBalance: 230000.0,
                status: 'Completed',
                timestamp: new Date().toISOString()
              },
              null,
              2
            )
          );
        } else {
          setApiResponse(
            JSON.stringify(
              {
                success: true,
                accountNumber: 'PK92-KUST-0091823',
                accountHolder: 'Verified User',
                initialDeposit: 5000.0,
                created: new Date().toISOString()
              },
              null,
              2
            )
          );
        }
      }
    }, 450);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-5 md:p-8 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className={`border w-full max-w-4xl max-h-[92vh] rounded-2xl overflow-y-auto p-4 sm:p-7 md:p-8 shadow-2xl relative space-y-5 sm:space-y-6 ${
          isDark
            ? 'bg-[#0e0e0e] border-zinc-800 text-zinc-100'
            : 'bg-white border-zinc-300 text-zinc-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          className={`flex items-start justify-between gap-3 sm:gap-4 pb-3 sm:pb-4 border-b ${
            isDark ? 'border-zinc-800' : 'border-zinc-200'
          }`}
        >
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-[#de1b1c]/15 text-[#ff4d4f] border border-[#de1b1c]/30 text-[10px] font-mono-hud font-bold uppercase">
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
            <h2
              className={`text-xl sm:text-2xl lg:text-3xl font-condensed font-bold tracking-wide uppercase mt-1 ${
                isDark ? 'text-white' : 'text-zinc-950'
              }`}
            >
              {project.title} — ARCHITECTURAL DEEP DIVE
            </h2>
            <p
              className={`text-xs sm:text-sm font-mono-hud ${
                isDark ? 'text-zinc-400' : 'text-zinc-600'
              }`}
            >
              {project.tagline}
            </p>
          </div>

          <button
            onClick={() => {
              SoundFX.playClick();
              onClose();
            }}
            aria-label="Close Project Modal"
            className={`p-1.5 sm:p-2 rounded-xl transition-colors cursor-pointer shrink-0 ${
              isDark
                ? 'bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white'
                : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 hover:text-zinc-950'
            }`}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Tabs */}
        <div
          className={`flex overflow-x-auto no-scrollbar gap-1.5 sm:gap-2 pb-1 border-b text-[11px] sm:text-xs font-mono-hud ${
            isDark ? 'border-zinc-800' : 'border-zinc-200'
          }`}
        >
          {[
            { id: 'architecture', label: 'SYSTEM ARCHITECTURE' },
            { id: 'endpoints', label: 'REST ENDPOINTS' },
            { id: 'schemas', label: 'DATABASE SCHEMAS' },
            { id: 'tester', label: 'API TEST RUNNER' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                SoundFX.playSelect();
                setActiveTab(tab.id as typeof activeTab);
              }}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl border uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeTab === tab.id
                  ? isDark
                    ? 'bg-zinc-900 border-[#de1b1c] text-white shadow'
                    : 'bg-zinc-900 border-[#de1b1c] text-white shadow font-bold'
                  : isDark
                  ? 'bg-black/50 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                  : 'bg-zinc-100 border-zinc-200 text-zinc-600 hover:text-zinc-950'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: System Architecture */}
        {activeTab === 'architecture' && (
          <div className="space-y-6">
            <div
              className={`p-4 rounded-xl border space-y-2 ${
                isDark ? 'bg-black border-zinc-800' : 'bg-zinc-50 border-zinc-200'
              }`}
            >
              <span className="text-xs font-mono-hud text-[#de1b1c] font-bold uppercase tracking-wider block">
                OVERVIEW
              </span>
              <p
                className={`text-xs sm:text-sm leading-relaxed font-light ${
                  isDark ? 'text-zinc-300' : 'text-zinc-700'
                }`}
              >
                {project.architectureDetails.overview}
              </p>
            </div>

            <div className="space-y-3">
              <span
                className={`text-xs font-mono-hud uppercase tracking-widest block ${
                  isDark ? 'text-zinc-400' : 'text-zinc-600'
                }`}
              >
                CORE MODULES &amp; PIPELINES
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {project.architectureDetails.keyModules.map((mod, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border space-y-2 ${
                      isDark
                        ? 'bg-zinc-900/60 border-zinc-800'
                        : 'bg-zinc-50 border-zinc-200 shadow-sm'
                    }`}
                  >
                    <span
                      className={`text-xs font-mono-hud font-bold uppercase block ${
                        isDark ? 'text-white' : 'text-zinc-950'
                      }`}
                    >
                      {mod.title}
                    </span>
                    <p
                      className={`text-xs font-light leading-relaxed ${
                        isDark ? 'text-zinc-400' : 'text-zinc-600'
                      }`}
                    >
                      {mod.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <span
                className={`text-xs font-mono-hud uppercase tracking-widest block ${
                  isDark ? 'text-zinc-400' : 'text-zinc-600'
                }`}
              >
                FULL HIGHLIGHTS FROM CV
              </span>
              <ul className="space-y-1.5 text-xs">
                {project.highlights.map((h, i) => (
                  <li
                    key={i}
                    className={`flex items-start gap-2 ${
                      isDark ? 'text-zinc-300' : 'text-zinc-700'
                    }`}
                  >
                    <span className="text-[#de1b1c] font-bold mt-0.5">›</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Tab 2: Endpoints */}
        {activeTab === 'endpoints' && (
          <div className="space-y-4">
            <span
              className={`text-xs font-mono-hud uppercase tracking-widest block ${
                isDark ? 'text-zinc-400' : 'text-zinc-600'
              }`}
            >
              RESTful ROUTE ARCHITECTURE
            </span>
            <div className="space-y-2.5">
              {project.architectureDetails.endpoints.map((ep, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono-hud ${
                    isDark
                      ? 'bg-black border-zinc-800/80'
                      : 'bg-zinc-50 border-zinc-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] ${
                        ep.method === 'GET'
                          ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                          : ep.method === 'POST'
                          ? 'bg-blue-500/15 border border-blue-500/30 text-blue-600 dark:text-blue-400'
                          : 'bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400'
                      }`}
                    >
                      {ep.method}
                    </span>
                    <span className={`font-semibold ${isDark ? 'text-zinc-200' : 'text-zinc-900'}`}>
                      {ep.path}
                    </span>
                  </div>
                  <span
                    className={`text-xs sm:text-right font-light ${
                      isDark ? 'text-zinc-400' : 'text-zinc-600'
                    }`}
                  >
                    {ep.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Schemas */}
        {activeTab === 'schemas' && (
          <div className="space-y-4">
            <span
              className={`text-xs font-mono-hud uppercase tracking-widest block ${
                isDark ? 'text-zinc-400' : 'text-zinc-600'
              }`}
            >
              MONGODB &amp; MONGOOSE SCHEMA DESIGNS
            </span>
            <div
              className={`p-4 rounded-xl border space-y-3 font-mono-hud text-xs ${
                isDark ? 'bg-black border-zinc-800' : 'bg-zinc-50 border-zinc-200'
              }`}
            >
              {project.architectureDetails.schemaHighlights.map((s, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-2 ${
                    isDark ? 'text-zinc-300' : 'text-zinc-700'
                  }`}
                >
                  <Database size={14} className="text-[#de1b1c] shrink-0 mt-0.5" />
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: API Test Runner */}
        {activeTab === 'tester' && (
          <div className="space-y-4 font-mono-hud text-xs">
            <div
              className={`p-4 rounded-xl border space-y-3 ${
                isDark ? 'bg-black border-zinc-800' : 'bg-zinc-50 border-zinc-200'
              }`}
            >
              <span className={`uppercase block ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                SELECT ENDPOINT TO TEST:
              </span>
              <div className="flex flex-wrap gap-2">
                {project.architectureDetails.endpoints.map((ep, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      SoundFX.playHover();
                      setSelectedEndpointIndex(idx);
                      setApiResponse(null);
                    }}
                    className={`px-3 py-1.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                      selectedEndpointIndex === idx
                        ? 'bg-zinc-800 border-[#de1b1c] text-white'
                        : isDark
                        ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                        : 'bg-white border-zinc-300 text-zinc-700 hover:text-zinc-950'
                    }`}
                  >
                    <span className="font-bold mr-1.5">{ep.method}</span>
                    <span>{ep.path}</span>
                  </button>
                ))}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <span className={`text-[11px] ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>
                  Ready to dispatch mock request to {currentEndpoint.path}
                </span>
                <button
                  onClick={handleSimulateRequest}
                  disabled={isSimulating}
                  className="px-4 py-2 rounded-xl bg-[#de1b1c] hover:bg-[#ff2a2b] text-white font-bold uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Send size={13} />
                  <span>{isSimulating ? 'DISPATCHING...' : 'DISPATCH REQUEST'}</span>
                </button>
              </div>
            </div>

            {apiResponse && (
              <div
                className={`p-4 rounded-xl border space-y-2 ${
                  isDark ? 'bg-[#090909] border-zinc-800' : 'bg-zinc-100 border-zinc-300'
                }`}
              >
                <div
                  className={`flex items-center justify-between text-[11px] pb-1 border-b ${
                    isDark ? 'border-zinc-800 text-zinc-500' : 'border-zinc-300 text-zinc-600'
                  }`}
                >
                  <span className="text-emerald-500 font-bold">HTTP 200 OK</span>
                  <span>MIME: application/json</span>
                </div>
                <pre
                  className={`overflow-x-auto p-3 rounded-lg text-xs leading-relaxed border ${
                    isDark
                      ? 'bg-black border-zinc-800 text-zinc-300'
                      : 'bg-white border-zinc-200 text-zinc-800'
                  }`}
                >
                  {apiResponse}
                </pre>
              </div>
            )}
          </div>
        )}

        {/* Modal Footer */}
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
            className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border text-xs font-mono-hud uppercase tracking-wider transition-all ${
              isDark
                ? 'bg-zinc-900 hover:bg-zinc-800 border-zinc-700 text-white'
                : 'bg-zinc-100 hover:bg-zinc-200 border-zinc-300 text-zinc-900'
            }`}
          >
            <Github size={15} className="text-[#de1b1c]" />
            <span>VIEW CODE ON GITHUB</span>
            <ExternalLink size={13} />
          </a>

          <button
            onClick={() => {
              SoundFX.playClick();
              onClose();
            }}
            className={`px-5 py-2.5 rounded-xl border text-xs font-mono-hud uppercase tracking-wider transition-all cursor-pointer ${
              isDark
                ? 'bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-zinc-200'
                : 'bg-zinc-200 hover:bg-zinc-300 border-zinc-300 text-zinc-800'
            }`}
          >
            CLOSE INSPECTOR
          </button>
        </div>
      </div>
    </div>
  );
};
