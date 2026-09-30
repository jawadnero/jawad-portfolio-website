import React, { useState, useEffect } from 'react';
import {
  Mail,
  Phone,
  Send,
  Copy,
  Check,
  ExternalLink,
  Github,
  Linkedin,
  MapPin,
  MessageSquare,
  CheckCircle2,
  Clock,
  Sparkles,
  Download,
  Trash2,
  History,
  AlertCircle,
  Calendar,
  RotateCcw
} from 'lucide-react';
import { SoundFX } from '../utils/soundFX';
import { PROFILE } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

interface DispatchedMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

const INQUIRY_TOPICS = [
  { id: 'fulltime', label: 'Full-Time MERN Role', subject: 'Full-Time MERN Stack Developer Position' },
  { id: 'interview', label: 'Technical Interview', subject: 'Technical Interview Invitation' },
  { id: 'frontend', label: 'React / Frontend', subject: 'React.js Frontend Engineering Opportunity' },
  { id: 'backend', label: 'Node.js / REST APIs', subject: 'Backend / REST API Architecture Discussion' },
  { id: 'contract', label: 'Contract / Project', subject: 'Web Application Development Inquiry' }
];

const QUICK_TEMPLATES = [
  {
    id: 'interview',
    title: 'Schedule Interview',
    icon: Calendar,
    subject: 'Technical Interview Invitation — Jawad Ur Rehman',
    body: `Hi Jawad,\n\nWe reviewed your MERN Stack portfolio and capstone projects (ShopNest & Banking System). We would like to arrange a technical interview to discuss an opportunity on our engineering team.\n\nPlease let us know your availability for a call this week.\n\nBest regards,\n`
  },
  {
    id: 'fulltime',
    title: 'MERN Job Offer',
    icon: Sparkles,
    subject: 'MERN Stack Developer Role Opportunity',
    body: `Hi Jawad,\n\nWe have an open MERN developer position. Your hands-on experience building full-stack applications with React, Node.js, and MongoDB aligns well with our requirements.\n\nWe would love to share more details about the role and team.\n\nBest regards,\n`
  },
  {
    id: 'project',
    title: 'Freelance / MVP',
    icon: MessageSquare,
    subject: 'Web Application Development Inquiry',
    body: `Hi Jawad,\n\nWe have a project that requires building a modern, responsive web application with RESTful APIs and clean database modeling. We would like to get your estimate and timeline.\n\nBest regards,\n`
  }
];

export const Contact: React.FC = () => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: INQUIRY_TOPICS[0].subject,
    message: ''
  });
  const [selectedTopic, setSelectedTopic] = useState<string>('fulltime');
  const [preferredMethod, setPreferredMethod] = useState<'gmail' | 'mailapp'>('gmail');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [historyOpen, setHistoryOpen] = useState(false);
  const [dispatches, setDispatches] = useState<DispatchedMessage[]>([]);
  const [copiedDraft, setCopiedDraft] = useState(false);
  const [pktTime, setPktTime] = useState<string>('');

  // Live PKT Time update
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatted = now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Karachi',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        });
        setPktTime(formatted);
      } catch {
        setPktTime('10:00 AM PKT');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Load dispatches from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('jawad_portfolio_dispatches');
      if (saved) {
        setDispatches(JSON.parse(saved));
      }
    } catch {
      // LocalStorage access fallback
    }
  }, []);

  const saveDispatchToHistory = (item: DispatchedMessage) => {
    const updated = [item, ...dispatches].slice(0, 10);
    setDispatches(updated);
    try {
      localStorage.setItem('jawad_portfolio_dispatches', JSON.stringify(updated));
    } catch {}
  };

  const clearHistory = () => {
    SoundFX.playClick();
    setDispatches([]);
    try {
      localStorage.removeItem('jawad_portfolio_dispatches');
    } catch {}
  };

  const copyToClipboard = (text: string, fieldName: string) => {
    SoundFX.playClick();
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const validateForm = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.name.trim()) {
      errs.name = 'Please provide your name or company.';
    } else if (formData.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters.';
    }

    if (!formData.email.trim()) {
      errs.email = 'Please provide a contact email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address (e.g. name@domain.com).';
    }

    if (!formData.message.trim()) {
      errs.message = 'Please write a brief message or choose a quick template.';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters long.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const constructFullBody = () => {
    return `Hi Jawad,\n\n${formData.message.trim()}\n\n---\nSender: ${formData.name.trim()}\nEmail: ${formData.email.trim()}\nPortfolio Inquiry: ${formData.subject.trim()}\nTimestamp: ${new Date().toISOString()}`;
  };

  const getGmailWebLink = () => {
    const subject = encodeURIComponent(formData.subject || `Inquiry from Portfolio — ${formData.name}`);
    const body = encodeURIComponent(constructFullBody());
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${PROFILE.email}&su=${subject}&body=${body}`;
  };

  const getMailtoLink = () => {
    const subject = encodeURIComponent(formData.subject || `Inquiry from Portfolio — ${formData.name}`);
    const body = encodeURIComponent(constructFullBody());
    return `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
  };

  const getWhatsAppLink = (customText?: string) => {
    const text =
      customText ||
      `*Inquiry from Portfolio*\n*Subject:* ${formData.subject}\n*From:* ${formData.name || 'Visitor'} (${formData.email || 'Email not specified'})\n\n${formData.message || 'Hi Jawad, I would like to connect regarding an opportunity.'}`;
    return `https://wa.me/${PROFILE.phoneClean}?text=${encodeURIComponent(text)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      SoundFX.playClick();
      return;
    }

    SoundFX.playSelect();
    setStatus('sending');

    // Attempt background HTTP relay (with graceful fallback)
    try {
      fetch('https://formspree.io/f/mqkvrkzz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          recipient: PROFILE.email,
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim()
        })
      }).catch(() => {});
    } catch {}

    setTimeout(() => {
      SoundFX.playSuccess();
      const newDispatch: DispatchedMessage = {
        id: 'DSP-' + Date.now().toString().slice(-6),
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
        timestamp: new Date().toLocaleTimeString('en-US', {
          timeZone: 'Asia/Karachi',
          hour: '2-digit',
          minute: '2-digit',
          month: 'short',
          day: 'numeric'
        })
      };

      saveDispatchToHistory(newDispatch);
      setStatus('success');
      setStatusMessage(
        `Inquiry configured for direct delivery to Jawad's Gmail (${PROFILE.email})! Click the primary button below to launch Gmail and finalize sending.`
      );

      // Automatically trigger selected dispatch method for instant convenience
      if (preferredMethod === 'gmail') {
        window.open(getGmailWebLink(), '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = getMailtoLink();
      }
    }, 550);
  };

  const handleTopicSelect = (topic: typeof INQUIRY_TOPICS[0]) => {
    SoundFX.playSelect();
    setSelectedTopic(topic.id);
    setFormData((prev) => ({
      ...prev,
      subject: topic.subject
    }));
  };

  const applyTemplate = (template: typeof QUICK_TEMPLATES[0]) => {
    SoundFX.playSelect();
    setFormData((prev) => ({
      ...prev,
      subject: template.subject,
      message: template.body + (prev.name ? `${prev.name}` : '')
    }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next.message;
      return next;
    });
  };

  const resetForm = () => {
    SoundFX.playClick();
    setStatus('idle');
    setFormData({
      name: '',
      email: '',
      subject: INQUIRY_TOPICS[0].subject,
      message: ''
    });
    setErrors({});
    setSelectedTopic('fulltime');
  };

  const copyFullDraft = () => {
    SoundFX.playClick();
    const draftText = `To: ${PROFILE.email}\nSubject: ${formData.subject}\nFrom: ${formData.name} <${formData.email}>\n\nHi Jawad,\n\n${formData.message}\n\n---\nSender: ${formData.name} (${formData.email})`;
    navigator.clipboard.writeText(draftText);
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2500);
  };

  const downloadVCard = () => {
    SoundFX.playClick();
    const vCardData = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'N:Ur Rehman;Jawad;;;',
      'FN:Jawad Ur Rehman',
      'ORG:MERN Stack Developer',
      'TITLE:MERN Stack Developer & Full-Stack Engineer',
      `TEL;TYPE=CELL,VOICE:${PROFILE.phone}`,
      `EMAIL;TYPE=INTERNET,PREF:${PROFILE.email}`,
      `URL:${PROFILE.github}`,
      `URL:${PROFILE.linkedin}`,
      'NOTE:BS Computer Science - Kohat University of Science and Technology (KUST). Specializing in MERN stack, RESTful APIs, and scalable web architectures.',
      'END:VCARD'
    ].join('\r\n');

    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Jawad_Ur_Rehman_MERN.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section
      id="contact"
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
            <span className="text-[#de1b1c]">04</span>
            <span className={isDark ? 'text-zinc-600' : 'text-zinc-400'}>/</span>
            <span>COMMUNICATION CHANNELS</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="hidden sm:inline text-zinc-500">PKT TIME: {pktTime}</span>
          </div>
        </div>

        {/* Section Title */}
        <div className="my-8 sm:my-12 space-y-3">
          <h2
            className={`text-3xl sm:text-5xl md:text-6xl font-condensed font-bold tracking-tight uppercase ${
              isDark ? 'text-white' : 'text-zinc-950'
            }`}
          >
            LET'S BUILD SOMETHING <span className="text-[#de1b1c]">EXTRAORDINARY</span>
          </h2>
          <p
            className={`font-mono-hud text-xs sm:text-sm max-w-2xl ${
              isDark ? 'text-zinc-400' : 'text-zinc-600'
            }`}
          >
            Available for immediate MERN Stack Developer roles, technical interviews, and engineering collaborations. All inquiries are delivered directly to <strong className="text-[#de1b1c]">{PROFILE.email}</strong>.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Portrait & Direct Contact Badges */}
          <div className="lg:col-span-5 space-y-6">
            <div
              className={`border rounded-2xl p-5 sm:p-7 md:p-8 space-y-6 shadow-xl ${
                isDark ? 'bg-[#0f0f0f] border-zinc-800' : 'bg-white border-zinc-200'
              }`}
            >
              {/* Mini Portrait & Status */}
              <div
                className={`flex items-center gap-4 pb-6 border-b ${
                  isDark ? 'border-zinc-800' : 'border-zinc-200'
                }`}
              >
                <div
                  className={`relative w-16 h-16 rounded-xl overflow-hidden border shrink-0 ${
                    isDark ? 'bg-black border-zinc-800' : 'bg-zinc-100 border-zinc-300'
                  }`}
                >
                  <img
                    id="contact-portrait-img"
                    src="/src/assets/images/regenerated_image_1790778080510.png"
                    alt={PROFILE.name}
                    className="w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.includes('regenerated_image_1790778080510.png')) {
                        target.src = '/regenerated_image_1790778080510.png';
                      }
                    }}
                  />
                  <div className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-black"></div>
                </div>

                <div>
                  <h3
                    className={`text-xl font-condensed font-bold uppercase ${
                      isDark ? 'text-white' : 'text-zinc-950'
                    }`}
                  >
                    {PROFILE.name}
                  </h3>
                  <p className="text-xs font-mono-hud text-[#de1b1c] font-semibold">
                    {PROFILE.title}
                  </p>
                  <p
                    className={`text-[11px] font-mono-hud mt-0.5 ${
                      isDark ? 'text-zinc-500' : 'text-zinc-500'
                    }`}
                  >
                    KUST BS CS (2021 – 2025)
                  </p>
                </div>
              </div>

              {/* Direct Channel Cards with Copy Buttons */}
              <div className="space-y-3 text-xs font-mono-hud">
                {/* Email Highlight Card with Gmail Destination */}
                <div
                  className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 group transition-colors ${
                    isDark
                      ? 'bg-black border-zinc-800/80 hover:border-zinc-700'
                      : 'bg-zinc-50 border-zinc-200 hover:border-zinc-300 shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div
                      className={`p-2 rounded-lg text-[#de1b1c] ${
                        isDark ? 'bg-zinc-900' : 'bg-zinc-200'
                      }`}
                    >
                      <Mail size={16} />
                    </div>
                    <div className="truncate">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-[10px] block uppercase ${
                            isDark ? 'text-zinc-500' : 'text-zinc-500'
                          }`}
                        >
                          RECEIVING GMAIL INBOX
                        </span>
                        <span className="text-[9px] px-1 py-0.2 rounded bg-emerald-500/15 text-emerald-400 font-bold">
                          VERIFIED
                        </span>
                      </div>
                      <a
                        href={`mailto:${PROFILE.email}`}
                        className={`font-semibold transition-colors truncate block ${
                          isDark ? 'text-zinc-200 hover:text-white' : 'text-zinc-800 hover:text-zinc-950'
                        }`}
                      >
                        {PROFILE.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => copyToClipboard(PROFILE.email, 'email')}
                      title="Copy Email Address"
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer shrink-0 ${
                        isDark
                          ? 'bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white'
                          : 'bg-zinc-200 hover:bg-zinc-300 text-zinc-700 hover:text-zinc-950'
                      }`}
                    >
                      {copiedField === 'email' ? (
                        <Check size={14} className="text-emerald-500" />
                      ) : (
                        <Copy size={14} />
                      )}
                    </button>
                    <a
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${PROFILE.email}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Open Gmail Composer"
                      className="p-1.5 rounded-lg bg-[#de1b1c]/15 text-[#ff4d4f] hover:bg-[#de1b1c]/25 transition-colors"
                    >
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>

                {/* Phone & WhatsApp */}
                <div
                  className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 group transition-colors ${
                    isDark
                      ? 'bg-black border-zinc-800/80 hover:border-zinc-700'
                      : 'bg-zinc-50 border-zinc-200 hover:border-zinc-300 shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div
                      className={`p-2 rounded-lg text-[#de1b1c] ${
                        isDark ? 'bg-zinc-900' : 'bg-zinc-200'
                      }`}
                    >
                      <Phone size={16} />
                    </div>
                    <div className="truncate">
                      <span
                        className={`text-[10px] block uppercase ${
                          isDark ? 'text-zinc-500' : 'text-zinc-500'
                        }`}
                      >
                        PHONE / WHATSAPP
                      </span>
                      <a
                        href={`tel:${PROFILE.phone}`}
                        className={`font-semibold transition-colors ${
                          isDark ? 'text-zinc-200 hover:text-white' : 'text-zinc-800 hover:text-zinc-950'
                        }`}
                      >
                        {PROFILE.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => copyToClipboard(PROFILE.phone, 'phone')}
                      title="Copy Phone Number"
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        isDark
                          ? 'bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white'
                          : 'bg-zinc-200 hover:bg-zinc-300 text-zinc-700 hover:text-zinc-950'
                      }`}
                    >
                      {copiedField === 'phone' ? (
                        <Check size={14} className="text-emerald-500" />
                      ) : (
                        <Copy size={14} />
                      )}
                    </button>
                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Direct WhatsApp Chat"
                      className="p-1.5 rounded-lg bg-emerald-600/15 border border-emerald-600/30 hover:bg-emerald-600/30 text-emerald-600 dark:text-emerald-400 transition-colors"
                    >
                      <Send size={14} />
                    </a>
                  </div>
                </div>

                {/* GitHub */}
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => SoundFX.playHover()}
                  className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 group hover:border-[#de1b1c] transition-colors block ${
                    isDark
                      ? 'bg-black border-zinc-800/80'
                      : 'bg-zinc-50 border-zinc-200 shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg text-[#de1b1c] ${
                        isDark ? 'bg-zinc-900' : 'bg-zinc-200'
                      }`}
                    >
                      <Github size={16} />
                    </div>
                    <div>
                      <span
                        className={`text-[10px] block uppercase ${
                          isDark ? 'text-zinc-500' : 'text-zinc-500'
                        }`}
                      >
                        GITHUB CODEBASES
                      </span>
                      <span
                        className={`font-semibold transition-colors ${
                          isDark
                            ? 'text-zinc-200 group-hover:text-white'
                            : 'text-zinc-800 group-hover:text-zinc-950'
                        }`}
                      >
                        {PROFILE.githubDisplay}
                      </span>
                    </div>
                  </div>
                  <ExternalLink
                    size={14}
                    className={`group-hover:text-[#de1b1c] ${
                      isDark ? 'text-zinc-500' : 'text-zinc-400'
                    }`}
                  />
                </a>

                {/* LinkedIn */}
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => SoundFX.playHover()}
                  className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 group hover:border-[#de1b1c] transition-colors block ${
                    isDark
                      ? 'bg-black border-zinc-800/80'
                      : 'bg-zinc-50 border-zinc-200 shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg text-[#de1b1c] ${
                        isDark ? 'bg-zinc-900' : 'bg-zinc-200'
                      }`}
                    >
                      <Linkedin size={16} />
                    </div>
                    <div className="truncate max-w-[210px] sm:max-w-none">
                      <span
                        className={`text-[10px] block uppercase ${
                          isDark ? 'text-zinc-500' : 'text-zinc-500'
                        }`}
                      >
                        LINKEDIN PROFILE
                      </span>
                      <span
                        className={`font-semibold transition-colors truncate block ${
                          isDark
                            ? 'text-zinc-200 group-hover:text-white'
                            : 'text-zinc-800 group-hover:text-zinc-950'
                        }`}
                      >
                        {PROFILE.linkedinDisplay}
                      </span>
                    </div>
                  </div>
                  <ExternalLink
                    size={14}
                    className={`group-hover:text-[#de1b1c] shrink-0 ${
                      isDark ? 'text-zinc-500' : 'text-zinc-400'
                    }`}
                  />
                </a>
              </div>

              {/* Download vCard CTA */}
              <button
                onClick={downloadVCard}
                className={`w-full py-3 px-4 rounded-xl border text-xs font-mono-hud font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isDark
                    ? 'bg-zinc-900/80 hover:bg-zinc-800 border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white'
                    : 'bg-white hover:bg-zinc-50 border-zinc-300 hover:border-zinc-400 text-zinc-800 shadow-sm'
                }`}
              >
                <Download size={14} className="text-[#de1b1c]" />
                <span>SAVE CONTACT AS VCARD (.VCF)</span>
              </button>

              {/* Working Hours & Availability */}
              <div
                className={`p-3.5 rounded-xl border text-xs font-mono-hud space-y-1.5 ${
                  isDark
                    ? 'bg-black border-zinc-800/60 text-zinc-400'
                    : 'bg-zinc-50 border-zinc-200 text-zinc-600'
                }`}
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="flex items-center gap-1.5 font-semibold text-emerald-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    ACTIVE FOR INTERVIEWS
                  </span>
                  <span className="text-[10px] text-zinc-500">UTC+5 (PKT)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={13} className="text-[#de1b1c] shrink-0" />
                  <span>Direct Inbox: {PROFILE.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={13} className="text-[#de1b1c] shrink-0" />
                  <span>Base: Pakistan · Open for Global Remote &amp; On-Site</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Dispatch Form */}
          <div
            className={`lg:col-span-7 border rounded-2xl p-5 sm:p-7 md:p-10 space-y-6 shadow-xl ${
              isDark ? 'bg-[#0f0f0f] border-zinc-800' : 'bg-white border-zinc-200'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-4 border-zinc-800/50">
              <div>
                <span className="text-xs font-mono-hud text-[#de1b1c] uppercase tracking-wider font-semibold">
                  DIRECT TRANSMISSION TO {PROFILE.email}
                </span>
                <h3
                  className={`text-2xl sm:text-3xl font-condensed font-bold uppercase ${
                    isDark ? 'text-white' : 'text-zinc-950'
                  }`}
                >
                  SEND A DIRECT MESSAGE
                </h3>
              </div>

              {dispatches.length > 0 && (
                <button
                  onClick={() => setHistoryOpen(!historyOpen)}
                  className={`px-3 py-1.5 rounded-lg border text-[11px] font-mono-hud flex items-center gap-1.5 transition-colors cursor-pointer ${
                    isDark
                      ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                      : 'bg-zinc-100 border-zinc-300 text-zinc-700 hover:text-zinc-950'
                  }`}
                >
                  <History size={13} className="text-[#de1b1c]" />
                  <span>LOG ({dispatches.length})</span>
                </button>
              )}
            </div>

            {/* Inquiry Topic Selector */}
            <div className="space-y-2">
              <span
                className={`text-[11px] font-mono-hud uppercase tracking-wider block ${
                  isDark ? 'text-zinc-400' : 'text-zinc-600'
                }`}
              >
                SELECT INQUIRY TYPE:
              </span>
              <div className="flex overflow-x-auto no-scrollbar gap-2 pb-1">
                {INQUIRY_TOPICS.map((topic) => {
                  const isSelected = selectedTopic === topic.id;
                  return (
                    <button
                      key={topic.id}
                      type="button"
                      onClick={() => handleTopicSelect(topic)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-mono-hud uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                        isSelected
                          ? isDark
                            ? 'bg-zinc-900 border-[#de1b1c] text-white shadow'
                            : 'bg-zinc-900 border-[#de1b1c] text-white font-bold'
                          : isDark
                          ? 'bg-black/60 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                          : 'bg-zinc-100 border-zinc-200 text-zinc-600 hover:text-zinc-950'
                      }`}
                    >
                      {topic.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Template Fillers for Recruiters */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono-hud">
                <span className={isDark ? 'text-zinc-400' : 'text-zinc-600'}>
                  ONE-CLICK RECRUITER TEMPLATES:
                </span>
                <span className="text-zinc-500 text-[10px]">Autofills message</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {QUICK_TEMPLATES.map((tpl) => {
                  const Icon = tpl.icon;
                  return (
                    <button
                      key={tpl.id}
                      type="button"
                      onClick={() => applyTemplate(tpl)}
                      className={`p-2.5 rounded-xl border text-left text-xs font-mono-hud transition-all cursor-pointer flex items-center gap-2 group ${
                        isDark
                          ? 'bg-black/40 hover:bg-zinc-900 border-zinc-800/80 hover:border-[#de1b1c] text-zinc-300'
                          : 'bg-zinc-50 hover:bg-white border-zinc-200 hover:border-[#de1b1c] text-zinc-800'
                      }`}
                    >
                      <Icon size={14} className="text-[#de1b1c] shrink-0" />
                      <span className="truncate font-semibold">{tpl.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Delivery Method Preference Toggle */}
            <div className="p-3 rounded-xl border border-zinc-800/80 bg-black/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono-hud">
              <span className="text-zinc-400 flex items-center gap-1.5">
                <Mail size={13} className="text-[#de1b1c]" />
                <span>Primary Delivery Channel:</span>
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setPreferredMethod('gmail')}
                  className={`px-2.5 py-1 rounded-lg border text-[11px] font-mono-hud transition-colors cursor-pointer ${
                    preferredMethod === 'gmail'
                      ? 'bg-[#de1b1c] text-white border-[#de1b1c] font-bold'
                      : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
                  }`}
                >
                  Gmail Web (Browser)
                </button>
                <button
                  type="button"
                  onClick={() => setPreferredMethod('mailapp')}
                  className={`px-2.5 py-1 rounded-lg border text-[11px] font-mono-hud transition-colors cursor-pointer ${
                    preferredMethod === 'mailapp'
                      ? 'bg-[#de1b1c] text-white border-[#de1b1c] font-bold'
                      : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
                  }`}
                >
                  Mail App (Outlook/Apple)
                </button>
              </div>
            </div>

            {/* Dispatches History Drawer */}
            {historyOpen && dispatches.length > 0 && (
              <div
                className={`p-4 rounded-xl border text-xs font-mono-hud space-y-3 ${
                  isDark ? 'bg-black border-zinc-800' : 'bg-zinc-100 border-zinc-300'
                }`}
              >
                <div className="flex items-center justify-between border-b pb-2 border-zinc-800/60">
                  <span className="font-semibold text-[#de1b1c] uppercase flex items-center gap-1.5">
                    <History size={14} />
                    <span>SESSION TRANSMISSION LOG</span>
                  </span>
                  <button
                    onClick={clearHistory}
                    className="text-zinc-500 hover:text-red-400 flex items-center gap-1 text-[11px] cursor-pointer"
                  >
                    <Trash2 size={12} />
                    <span>Clear Log</span>
                  </button>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {dispatches.map((d) => (
                    <div
                      key={d.id}
                      className={`p-2.5 rounded-lg border text-[11px] ${
                        isDark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white border-zinc-200'
                      }`}
                    >
                      <div className="flex items-center justify-between text-zinc-500">
                        <span className="font-bold text-zinc-300">{d.subject}</span>
                        <span>{d.timestamp}</span>
                      </div>
                      <p className="text-zinc-400 truncate mt-1">{d.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Status Feedback Banner */}
            {status === 'success' && (
              <div
                className={`p-4 rounded-xl border text-xs sm:text-sm font-mono-hud space-y-3 animate-fadeIn ${
                  isDark
                    ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-300'
                    : 'bg-emerald-50 border-emerald-300 text-emerald-900'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-emerald-400">
                    <CheckCircle2 size={16} />
                    <span>READY TO TRANSMIT TO {PROFILE.email}</span>
                  </div>
                  <button
                    onClick={resetForm}
                    className="text-[11px] text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw size={12} />
                    <span>Write Another</span>
                  </button>
                </div>

                <p className="text-xs leading-relaxed text-zinc-300">
                  {statusMessage}
                </p>

                {/* Instant delivery actions */}
                <div className="pt-1 flex flex-wrap items-center gap-2">
                  <a
                    href={getGmailWebLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-lg bg-[#de1b1c] hover:bg-[#ff2a2b] text-white text-xs font-mono-hud font-bold inline-flex items-center gap-1.5 shadow-md shadow-[#de1b1c]/20 cursor-pointer"
                  >
                    <Mail size={14} />
                    <span>OPEN GMAIL COMPOSER</span>
                    <ExternalLink size={12} />
                  </a>

                  <a
                    href={getMailtoLink()}
                    className={`px-3.5 py-2 rounded-lg border text-xs font-mono-hud font-semibold inline-flex items-center gap-1.5 cursor-pointer ${
                      isDark
                        ? 'bg-zinc-900 hover:bg-zinc-800 border-zinc-700 text-zinc-200'
                        : 'bg-white hover:bg-zinc-100 border-zinc-300 text-zinc-800'
                    }`}
                  >
                    <Mail size={14} />
                    <span>OPEN IN MAIL APP</span>
                  </a>

                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-mono-hud font-bold inline-flex items-center gap-1.5 shadow-md shadow-emerald-600/20"
                  >
                    <Send size={14} />
                    <span>DISPATCH VIA WHATSAPP</span>
                  </a>

                  <button
                    type="button"
                    onClick={copyFullDraft}
                    className={`px-3 py-2 rounded-lg border text-xs font-mono-hud inline-flex items-center gap-1.5 cursor-pointer ${
                      isDark
                        ? 'bg-zinc-900 hover:bg-zinc-800 border-zinc-700 text-zinc-200'
                        : 'bg-white hover:bg-zinc-100 border-zinc-300 text-zinc-800'
                    }`}
                  >
                    {copiedDraft ? (
                      <>
                        <Check size={14} className="text-emerald-500" />
                        <span>DRAFT COPIED!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>COPY EMAIL DRAFT</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label
                      className={`text-xs font-mono-hud uppercase tracking-wider block ${
                        isDark ? 'text-zinc-400' : 'text-zinc-700'
                      }`}
                    >
                      Your Name / Company *
                    </label>
                  </div>
                  <input
                    type="text"
                    placeholder="e.g. Alex Henderson (Tech Lead)"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) {
                        setErrors((prev) => {
                          const next = { ...prev };
                          delete next.name;
                          return next;
                        });
                      }
                    }}
                    className={`w-full px-4 py-3 border rounded-xl text-xs sm:text-sm font-mono-hud focus:outline-none transition-colors ${
                      errors.name
                        ? 'border-red-500 bg-red-950/20 text-red-200 focus:border-red-500'
                        : isDark
                        ? 'bg-black border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus:border-[#de1b1c]'
                        : 'bg-zinc-50 border-zinc-300 text-zinc-900 placeholder:text-zinc-400 focus:border-[#de1b1c]'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-[11px] font-mono-hud text-red-400 flex items-center gap-1 mt-1">
                      <AlertCircle size={12} />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label
                      className={`text-xs font-mono-hud uppercase tracking-wider block ${
                        isDark ? 'text-zinc-400' : 'text-zinc-700'
                      }`}
                    >
                      Your Email Address *
                    </label>
                  </div>
                  <input
                    type="email"
                    placeholder="e.g. alex@company.com"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) {
                        setErrors((prev) => {
                          const next = { ...prev };
                          delete next.email;
                          return next;
                        });
                      }
                    }}
                    className={`w-full px-4 py-3 border rounded-xl text-xs sm:text-sm font-mono-hud focus:outline-none transition-colors ${
                      errors.email
                        ? 'border-red-500 bg-red-950/20 text-red-200 focus:border-red-500'
                        : isDark
                        ? 'bg-black border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus:border-[#de1b1c]'
                        : 'bg-zinc-50 border-zinc-300 text-zinc-900 placeholder:text-zinc-400 focus:border-[#de1b1c]'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-[11px] font-mono-hud text-red-400 flex items-center gap-1 mt-1">
                      <AlertCircle size={12} />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label
                  className={`text-xs font-mono-hud uppercase tracking-wider block ${
                    isDark ? 'text-zinc-400' : 'text-zinc-700'
                  }`}
                >
                  Subject / Topic
                </label>
                <input
                  type="text"
                  placeholder="e.g. Full-Time MERN Stack Developer Position"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className={`w-full px-4 py-3 border rounded-xl text-xs sm:text-sm font-mono-hud focus:outline-none focus:border-[#de1b1c] transition-colors ${
                    isDark
                      ? 'bg-black border-zinc-800 text-zinc-100 placeholder:text-zinc-600'
                      : 'bg-zinc-50 border-zinc-300 text-zinc-900 placeholder:text-zinc-400'
                  }`}
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    className={`text-xs font-mono-hud uppercase tracking-wider block ${
                      isDark ? 'text-zinc-400' : 'text-zinc-700'
                    }`}
                  >
                    Message (Direct to {PROFILE.email}) *
                  </label>
                  <span
                    className={`text-[10px] font-mono-hud ${
                      formData.message.length > 800 ? 'text-amber-500' : 'text-zinc-500'
                    }`}
                  >
                    {formData.message.length} / 1500 chars
                  </span>
                </div>
                <textarea
                  rows={5}
                  placeholder="Hi Jawad, we came across your ShopNest & Banking system projects..."
                  value={formData.message}
                  maxLength={1500}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (errors.message) {
                      setErrors((prev) => {
                        const next = { ...prev };
                        delete next.message;
                        return next;
                      });
                    }
                  }}
                  className={`w-full px-4 py-3 border rounded-xl text-xs sm:text-sm font-mono-hud focus:outline-none transition-colors resize-none ${
                    errors.message
                      ? 'border-red-500 bg-red-950/20 text-red-200 focus:border-red-500'
                      : isDark
                      ? 'bg-black border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus:border-[#de1b1c]'
                      : 'bg-zinc-50 border-zinc-300 text-zinc-900 placeholder:text-zinc-400 focus:border-[#de1b1c]'
                  }`}
                />
                {errors.message && (
                  <p className="text-[11px] font-mono-hud text-red-400 flex items-center gap-1 mt-1">
                    <AlertCircle size={12} />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              {/* Submit and Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#de1b1c] hover:bg-[#ff2a2b] text-white text-xs sm:text-sm font-mono-hud font-bold uppercase tracking-wider transition-all shadow-lg shadow-[#de1b1c]/25 cursor-pointer disabled:opacity-50"
                >
                  <Send size={15} />
                  <span>
                    {status === 'sending'
                      ? 'PREPARING DISPATCH...'
                      : `SEND TO ${PROFILE.email.toUpperCase()}`}
                  </span>
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => SoundFX.playHover()}
                    className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl border text-xs font-mono-hud uppercase tracking-wider transition-all cursor-pointer ${
                      isDark
                        ? 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-zinc-200'
                        : 'bg-zinc-100 hover:bg-zinc-200 border-zinc-300 text-zinc-800'
                    }`}
                  >
                    <MessageSquare size={14} className="text-[#25D366]" />
                    <span>QUICK WHATSAPP</span>
                  </a>

                  <button
                    type="button"
                    onClick={resetForm}
                    title="Reset Form"
                    className={`p-3.5 rounded-xl border text-xs font-mono-hud transition-colors cursor-pointer ${
                      isDark
                        ? 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-zinc-400 hover:text-white'
                        : 'bg-zinc-100 hover:bg-zinc-200 border-zinc-300 text-zinc-600 hover:text-zinc-950'
                    }`}
                  >
                    <RotateCcw size={15} />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
