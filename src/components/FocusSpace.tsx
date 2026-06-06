import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, Wind } from 'lucide-react';

interface PodcastTrack {
  id: number;
  title: string;
  author: string;
  duration: number; // in seconds
  description: string;
}

const TRACKS: PodcastTrack[] = [
  {
    id: 1,
    title: "1. The Online Version of You",
    author: "Student Term Project",
    duration: 342,
    description: "A short talk on why we spend so much energy polishing our profiles, and how our online avatar can start feeling more real than our day-to-day life."
  },
  {
    id: 2,
    title: "2. The Burnout Cycle",
    author: "Student Term Project",
    duration: 435,
    description: "Explaining Byung-Chul Han's idea of the 'Fatigue Society': how we willingly exhaust ourselves for productivity and likes, thinking we are free."
  },
  {
    id: 3,
    title: "3. Sisyphus & The Endless Scroll",
    author: "Student Term Project",
    duration: 270,
    description: "Comparing the ancient myth of Sisyphus rolling a boulder up a hill to our daily habit of scrolling through feeds that never end."
  }
];

export const FocusSpace: React.FC = () => {
  // --- Breathing States ---
  const [breatheState, setBreatheState] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [breatheSeconds, setBreatheSeconds] = useState(4);

  useEffect(() => {
    const interval = setInterval(() => {
      setBreatheSeconds((prev) => {
        if (prev <= 1) {
          // Change state
          setBreatheState((curr) => {
            if (curr === 'Inhale') return 'Hold';
            if (curr === 'Hold') return 'Exhale';
            return 'Inhale';
          });
          return 4; // Reset to 4 seconds
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // --- Web Audio Synthesizer States ---
  const [activeSynth, setActiveSynth] = useState<'none' | 'drone' | 'wind'>('none');
  const audioCtxRef = useRef<AudioContext | null>(null);
  
  // Drone Synth Nodes
  const droneOsc1Ref = useRef<OscillatorNode | null>(null);
  const droneOsc2Ref = useRef<OscillatorNode | null>(null);
  const droneGainRef = useRef<GainNode | null>(null);
  const droneModRef = useRef<OscillatorNode | null>(null);

  // Wind/Waves Synth Nodes
  const windSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const windGainRef = useRef<GainNode | null>(null);
  const windModRef = useRef<OscillatorNode | null>(null);

  const initAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioContextClass();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const stopAllSynths = () => {
    // Stop drone
    if (droneOsc1Ref.current) {
      try {
        droneOsc1Ref.current.stop();
      } catch {
        // Ignored: oscillator not started or stopped already
      }
    }
    if (droneOsc2Ref.current) {
      try {
        droneOsc2Ref.current.stop();
      } catch {
        // Ignored
      }
    }
    if (droneModRef.current) {
      try {
        droneModRef.current.stop();
      } catch {
        // Ignored
      }
    }
    
    // Stop wind
    if (windSourceRef.current) {
      try {
        windSourceRef.current.stop();
      } catch {
        // Ignored
      }
    }
    if (windModRef.current) {
      try {
        windModRef.current.stop();
      } catch {
        // Ignored
      }
    }

    droneOsc1Ref.current = null;
    droneOsc2Ref.current = null;
    droneModRef.current = null;
    windSourceRef.current = null;
    windModRef.current = null;
    
    setActiveSynth('none');
  };

  const startDrone = () => {
    stopAllSynths();
    initAudioContext();
    const ctx = audioCtxRef.current!;

    // Create Oscillators for deep drone
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(73.42, ctx.currentTime); // D2 note
    
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(110.00, ctx.currentTime); // A2 note (fifth)

    // Amplitude modulator (LFO) for breathing effect
    const mod = ctx.createOscillator();
    const modGain = ctx.createGain();
    mod.type = 'sine';
    mod.frequency.setValueAtTime(0.08, ctx.currentTime); // 12-second cycle
    modGain.gain.setValueAtTime(0.04, ctx.currentTime); // mod range

    gainNode.gain.setValueAtTime(0.08, ctx.currentTime); // base gain

    mod.connect(modGain);
    modGain.connect(gainNode.gain);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(250, ctx.currentTime);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc1.start();
    osc2.start();
    mod.start();

    droneOsc1Ref.current = osc1;
    droneOsc2Ref.current = osc2;
    droneModRef.current = mod;
    droneGainRef.current = gainNode;
    setActiveSynth('drone');
  };

  const startWind = () => {
    stopAllSynths();
    initAudioContext();
    const ctx = audioCtxRef.current!;

    // Generate White Noise Buffer
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    // Filter to sound like wind/waves
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.Q.setValueAtTime(1.8, ctx.currentTime);

    // Modulate filter frequency for waving wind
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.1, ctx.currentTime); // 10-second wave cycle
    lfoGain.gain.setValueAtTime(280, ctx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    filter.frequency.setValueAtTime(450, ctx.currentTime);

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.035, ctx.currentTime); // keep it background

    noiseSource.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    noiseSource.start();
    lfo.start();

    windSourceRef.current = noiseSource;
    windModRef.current = lfo;
    windGainRef.current = gainNode;
    setActiveSynth('wind');
  };

  useEffect(() => {
    return () => {
      stopAllSynths();
    };
  }, []);

  // --- Podcast Playback State ---
  const [selectedTrackIdx, setSelectedTrackIdx] = useState(0);
  const [isPlayingPodcast, setIsPlayingPodcast] = useState(false);
  const [podcastElapsed, setPodcastElapsed] = useState(0);
  
  // Melody oscillator when playing podcast (for sound feedback)
  const podcastMelodyIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentTrack = TRACKS[selectedTrackIdx];

  // Tick elapsed time when playing podcast
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isPlayingPodcast) {
      timer = setInterval(() => {
        setPodcastElapsed((prev) => {
          if (prev >= currentTrack.duration) {
            setIsPlayingPodcast(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlayingPodcast, currentTrack]);

  // Handle ambient synth music when playing podcast (Brian Eno style micro-chords)
  useEffect(() => {
    if (isPlayingPodcast) {
      initAudioContext();
      
      const playMelodyChord = () => {
        if (!audioCtxRef.current) return;
        const ctx = audioCtxRef.current;
        if (ctx.state === 'suspended') return;

        const baseNotes = [164.81, 220.00, 261.63, 329.63, 440.00]; // E3, A3, C4, E4, A4 pentatonic
        const selectedNotes = [
          baseNotes[Math.floor(Math.random() * baseNotes.length)],
          baseNotes[Math.floor(Math.random() * baseNotes.length)]
        ];

        selectedNotes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gainNode = ctx.createGain();
          
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.35);
          
          gainNode.gain.setValueAtTime(0.0001, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.012, ctx.currentTime + 0.5 + idx * 0.35);
          gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 4.5 + idx * 0.35);
          
          osc.connect(gainNode);
          gainNode.connect(ctx.destination);
          
          osc.start();
          osc.stop(ctx.currentTime + 5.0);
        });
      };

      // Play initially, then periodically
      playMelodyChord();
      podcastMelodyIntervalRef.current = setInterval(playMelodyChord, 6000);
    } else {
      if (podcastMelodyIntervalRef.current) {
        clearInterval(podcastMelodyIntervalRef.current);
        podcastMelodyIntervalRef.current = null;
      }
    }

    return () => {
      if (podcastMelodyIntervalRef.current) {
        clearInterval(podcastMelodyIntervalRef.current);
      }
    };
  }, [isPlayingPodcast]);

  const handlePodcastPlayPause = () => {
    initAudioContext();
    setIsPlayingPodcast(!isPlayingPodcast);
  };

  const handleTrackChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const idx = parseInt(e.target.value);
    setSelectedTrackIdx(idx);
    setPodcastElapsed(0);
    setIsPlayingPodcast(false);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = (podcastElapsed / currentTrack.duration) * 100;

  return (
    <div className="focus-space-container">
      {/* Box 1: Breathing Guide */}
      <div className="card focus-tool-card" style={{ flex: 1.2 }}>
        <span className="lib-concept">Mindfulness Space</span>
        <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Grounding Breath</h3>
        <p style={{ fontSize: '0.95rem', marginBottom: '2rem' }}>
          Give your eyes a break. Breathe in and out with the expanding ring to help slow down your racing thoughts.
        </p>

        <div className="breathing-box">
          <div className="breathing-ring-outer">
            <div className={`breathing-ring-inner ${breatheState.toLowerCase()}`}>
              <div className="breathing-text">
                {breatheState}
                <div style={{ fontSize: '0.85rem', fontWeight: 400, opacity: 0.8, marginTop: '2px' }}>
                  {breatheSeconds}s
                </div>
              </div>
            </div>
          </div>
          <p className="breathing-instruction">
            {breatheState === 'Inhale' && "Expand your lungs slowly..."}
            {breatheState === 'Hold' && "Observe the still space within..."}
            {breatheState === 'Exhale' && "Let go of all comparison..."}
          </p>
        </div>
      </div>

      {/* Box 2: Soundscapes & Podcasts */}
      <div className="card focus-tool-card audio-card">
        <span className="lib-concept">Audio Sanctuary</span>
        <h3 style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>Soundscapes</h3>

        {/* Ambient Synthesizers */}
        <div className="ambient-toggles">
          <div className="ambient-row">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Volume2 size={18} style={{ color: 'var(--accent-sage)' }} />
              <div>
                <div style={{ fontSize: '0.95rem', fontWeight: 500 }}>Earthy Resonance</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>A deep, steady hum to help you feel grounded</div>
              </div>
            </div>
            <button 
              className={activeSynth === 'drone' ? 'playing' : ''}
              onClick={activeSynth === 'drone' ? stopAllSynths : startDrone}
            >
              {activeSynth === 'drone' ? 'Playing' : 'Listen'}
            </button>
          </div>

          <div className="ambient-row">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Wind size={18} style={{ color: 'var(--accent-sage)' }} />
              <div>
                <div style={{ fontSize: '0.95rem', fontWeight: 500 }}>Sea Breeze & Waves</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>A soft, generated sound of wind and waves</div>
              </div>
            </div>
            <button 
              className={activeSynth === 'wind' ? 'playing' : ''}
              onClick={activeSynth === 'wind' ? stopAllSynths : startWind}
            >
              {activeSynth === 'wind' ? 'Playing' : 'Listen'}
            </button>
          </div>
        </div>

        {/* Podcast Player */}
        <div className="podcast-player">
          <span className="lib-concept" style={{ fontSize: '0.7rem' }}>Reflective Audio Talks</span>
          
          <div style={{ marginTop: '0.75rem', marginBottom: '1rem' }}>
            <select 
              className="track-select-dropdown" 
              value={selectedTrackIdx} 
              onChange={handleTrackChange}
            >
              {TRACKS.map((t, idx) => (
                <option key={t.id} value={idx}>{t.title}</option>
              ))}
            </select>
          </div>

          <div className="podcast-track-info">
            <div className="podcast-title">{currentTrack.title}</div>
            <div className="podcast-author">{currentTrack.author}</div>
            <p style={{ fontSize: '0.85rem', margin: '0.5rem 0 0 0', lineHeight: 1.4 }}>
              {currentTrack.description}
            </p>
          </div>

          <div className="podcast-controls">
            <button className="play-pause-btn" onClick={handlePodcastPlayPause}>
              {isPlayingPodcast ? <Pause size={20} fill="white" /> : <Play size={20} fill="white" style={{ marginLeft: '2px' }} />}
            </button>

            <div className="track-selector">
              <div className="progress-slider-container">
                <span>{formatTime(podcastElapsed)}</span>
                <div className="progress-slider" onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pct = (e.clientX - rect.left) / rect.width;
                  setPodcastElapsed(Math.floor(pct * currentTrack.duration));
                }}>
                  <div className="progress-slider-fill" style={{ width: `${progressPercent}%` }}></div>
                </div>
                <span>{formatTime(currentTrack.duration)}</span>
              </div>
            </div>
          </div>
          {isPlayingPodcast && (
            <div style={{ fontSize: '0.75rem', color: 'var(--accent-clay)', fontStyle: 'italic', textAlign: 'center', marginTop: '0.5rem' }} className="fade-in">
              🔊 Generating gentle, random melodies in the background...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
