/**
 * Web Audio API synthesizer for playing authentic Reggae Dub rhythms
 * No external audio files needed - pure browser AudioContext synthesis!
 */

class ReggaeAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timerId: number | null = null;
  private step: number = 0;
  private tempo: number = 72; // Classic laid-back Reggae tempo (72 BPM)
  private volume: number = 0.3;

  public onStepChange?: (step: number) => void;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public togglePlay(): boolean {
    this.initContext();
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
  }

  public setTempo(bpm: number) {
    this.tempo = Math.max(50, Math.min(120, bpm));
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  private start() {
    this.isPlaying = true;
    this.step = 0;
    this.scheduleNextBeat();
  }

  private stop() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  private scheduleNextBeat() {
    if (!this.isPlaying || !this.ctx) return;

    this.playBeatStep(this.step);
    if (this.onStepChange) {
      this.onStepChange(this.step);
    }

    this.step = (this.step + 1) % 16; // 16 sixteenth steps = 1 bar

    // Calculate time for next 16th note
    const stepTimeMs = (60 / this.tempo / 4) * 1000;
    this.timerId = window.setTimeout(() => this.scheduleNextBeat(), stepTimeMs);
  }

  private playBeatStep(currentStep: number) {
    if (!this.ctx || this.volume <= 0) return;

    const time = this.ctx.currentTime;

    // Reggae Offbeat Skank Guitar (Steps 2, 6, 10, 14 - the "and" of 1, 2, 3, 4)
    if (currentStep % 4 === 2) {
      this.playSkankGuitar(time);
    }

    // Reggae "One Drop" Kick & Snare / Rimshot on beat 3 (Step 8)
    if (currentStep === 8) {
      this.playOneDropKick(time);
      this.playReggaeSnare(time);
    }

    // Hi-Hat on every beat & 16th groove
    if (currentStep % 2 === 0) {
      this.playHiHat(time, currentStep % 4 === 2 ? 0.08 : 0.04);
    }

    // Deep Dub Reggae Bassline (Steps 0, 3, 6, 8, 11, 14)
    const bassSteps: Record<number, number> = {
      0: 65.41,  // C2
      3: 65.41,
      6: 73.42,  // D2
      8: 87.31,  // F2
      11: 98.00, // G2
      14: 65.41  // C2
    };

    if (bassSteps[currentStep] !== undefined) {
      this.playDubBass(time, bassSteps[currentStep]);
    }
  }

  // Reggae Offbeat "Skank" Staccato Synth Guitar Chords
  private playSkankGuitar(time: number) {
    if (!this.ctx) return;

    const masterGain = this.ctx.createGain();
    masterGain.gain.setValueAtTime(this.volume * 0.25, time);
    masterGain.gain.exponentialRampToValueAtTime(0.001, time + 0.12);

    // Filter for bright staccato skank sound
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1400;
    filter.Q.value = 2.0;

    // Reggae triad chord (C Major / F Major frequencies)
    const freqs = [261.63, 329.63, 392.00, 523.25]; // C E G C

    freqs.forEach(freq => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, time);
      osc.connect(filter);
      osc.start(time);
      osc.stop(time + 0.12);
    });

    filter.connect(masterGain);
    masterGain.connect(this.ctx.destination);
  }

  // Deep Sub Reggae Bassline
  private playDubBass(time: number, freq: number) {
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(250, time);

    gain.gain.setValueAtTime(this.volume * 0.45, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.35);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(time);
    osc.stop(time + 0.35);
  }

  // Reggae "One Drop" Heavy Kick Drum
  private playOneDropKick(time: number) {
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(120, time);
    osc.frequency.exponentialRampToValueAtTime(30, time + 0.2);

    gain.gain.setValueAtTime(this.volume * 0.6, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.2);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(time);
    osc.stop(time + 0.2);
  }

  // Reggae Snare / High Rimshot
  private playReggaeSnare(time: number) {
    if (!this.ctx) return;

    // Noise buffer for snare crack
    const bufferSize = this.ctx.sampleRate * 0.1;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 1800;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(this.volume * 0.35, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.12);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    whiteNoise.start(time);
    whiteNoise.stop(time + 0.12);
  }

  // Crisp Hi-Hat
  private playHiHat(time: number, volMultiplier: number) {
    if (!this.ctx) return;

    const bufferSize = this.ctx.sampleRate * 0.05;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 7000;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(this.volume * volMultiplier, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.04);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    whiteNoise.start(time);
    whiteNoise.stop(time + 0.04);
  }

  // Classic Jamaican Dub Siren Sound Effect!
  public playDubSiren() {
    this.initContext();
    if (!this.ctx) return;

    const time = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const lfo = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const lfoGain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(600, time);

    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(5, time); // 5 Hz siren sweep
    lfoGain.gain.setValueAtTime(300, time);

    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);

    gain.gain.setValueAtTime(this.volume * 0.4, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 1.2);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    lfo.start(time);
    osc.start(time);
    lfo.stop(time + 1.2);
    osc.stop(time + 1.2);
  }
}

export const reggaeAudio = new ReggaeAudioEngine();
