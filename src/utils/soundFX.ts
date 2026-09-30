/**
 * Web Audio API synthesizer for cybernetic portfolio sound effects
 */
class SoundEngine {
  private enabled: boolean = true;
  private ctx: AudioContext | null = null;

  constructor() {
    // Check localStorage preference if available
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio_sfx');
      if (saved !== null) {
        this.enabled = saved === 'true';
      }
    }
  }

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public toggle(): boolean {
    this.enabled = !this.enabled;
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio_sfx', String(this.enabled));
    }
    if (this.enabled) {
      this.playSelect();
    }
    return this.enabled;
  }

  public playTone(freq: number = 440, duration: number = 0.05, type: OscillatorType = 'sine', volume: number = 0.03) {
    if (!this.enabled || typeof window === 'undefined') return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // AudioContext policy handled gracefully
    }
  }

  public playHover() {
    this.playTone(620, 0.025, 'sine', 0.015);
  }

  public playClick() {
    this.playTone(420, 0.04, 'triangle', 0.04);
  }

  public playSelect() {
    this.playTone(840, 0.06, 'sine', 0.035);
  }

  public playSuccess() {
    if (!this.enabled) return;
    try {
      this.playTone(520, 0.06, 'sine', 0.04);
      setTimeout(() => this.playTone(780, 0.08, 'sine', 0.04), 70);
    } catch {}
  }

  public playBoot() {
    this.playTone(520, 0.1, 'triangle', 0.03);
  }
}

export const SoundFX = new SoundEngine();
