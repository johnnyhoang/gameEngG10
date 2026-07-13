class SoundManager {
  private ctx: AudioContext | null = null;
  private muted: boolean = false;

  constructor() {
    // Lazy initialize to comply with browser autoplay policy
    if (typeof window !== 'undefined') {
      this.muted = localStorage.getItem('game_sound_muted') === 'true';
    }
  }

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx!;
  }

  public isMuted() {
    return this.muted;
  }

  public setMuted(muted: boolean) {
    this.muted = muted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('game_sound_muted', muted ? 'true' : 'false');
    }
  }

  private playTone(freq: number, type: OscillatorType, duration: number, startTime: number, endFreq?: number) {
    if (this.muted) return;
    try {
      const ctx = this.init();
      if (!ctx) return;
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, startTime);
      if (endFreq !== undefined) {
        // Logarithmic/exponential sweep for a smoother cartoon slide
        osc.frequency.exponentialRampToValueAtTime(endFreq, startTime + duration);
      }

      gain.gain.setValueAtTime(0.12, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration);
    } catch (e) {
      console.warn("Failed to play sound tone:", e);
    }
  }

  // 1. Correct sound: upbeat 8-bit double beep
  public playCorrect() {
    try {
      const ctx = this.init();
      if (!ctx) return;
      const now = ctx.currentTime;
      // C5 (523Hz) then E5 (659Hz) then G5 (784Hz)
      this.playTone(523.25, 'sine', 0.08, now);
      this.playTone(659.25, 'sine', 0.08, now + 0.07);
      this.playTone(784.00, 'sine', 0.20, now + 0.14);
    } catch (e) {
      console.warn(e);
    }
  }

  // 2. Incorrect sound: Descending "tẻo tẻo" (funny, descending cartoon pitch)
  public playIncorrect() {
    try {
      const ctx = this.init();
      if (!ctx) return;
      const now = ctx.currentTime;
      // First "tẻo"
      this.playTone(220, 'sawtooth', 0.15, now, 110);
      // Second "tẻo" (slightly lower pitch)
      this.playTone(196, 'sawtooth', 0.25, now + 0.16, 98);
    } catch (e) {
      console.warn(e);
    }
  }

  // 3. Next question sound: Quick upward transition sweep
  public playNext() {
    try {
      const ctx = this.init();
      if (!ctx) return;
      const now = ctx.currentTime;
      this.playTone(392, 'triangle', 0.12, now, 587.33);
    } catch (e) {
      console.warn(e);
    }
  }

  // 4. Ruby/Purchase sound: classic Mario-like double-beep
  public playRuby() {
    try {
      const ctx = this.init();
      if (!ctx) return;
      const now = ctx.currentTime;
      // B5 (987.77Hz) for 0.08s then E6 (1318.51Hz) for 0.22s
      this.playTone(987.77, 'square', 0.06, now);
      this.playTone(1318.51, 'square', 0.22, now + 0.06);
    } catch (e) {
      console.warn(e);
    }
  }

  // 5. Escape sound: swoosh downwards
  public playEscape() {
    try {
      const ctx = this.init();
      if (!ctx) return;
      const now = ctx.currentTime;
      this.playTone(440, 'triangle', 0.30, now, 110);
    } catch (e) {
      console.warn(e);
    }
  }
}

export const sound = new SoundManager();
