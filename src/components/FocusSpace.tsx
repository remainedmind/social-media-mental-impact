import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Wind, Play, Pause } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';
import type { TranslationKey } from '../utils/translations';

// Simple AudioContext synthesis for generative background sounds
// We don't want external audio files for this pure experience
let audioCtx: AudioContext | null = null;
let activeOscillators: OscillatorNode[] = [];
let activeGains: GainNode[] = [];

export const FocusSpace: React.FC = () => {
  const { t } = useTranslation();
  
  // --- Breathing States ---
  const [breatheState, setBreatheState] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [breatheSeconds, setBreatheSeconds] = useState(4);

  useEffect(() => {
    const timer = setInterval(() => {
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
    return () => clearInterval(timer);
  }, []);

  // Map state to translated breathing text
  const getBreatheStateText = (state: 'Inhale' | 'Hold' | 'Exhale') => {
    if (state === 'Inhale') return t('focus.bInhale');
    if (state === 'Hold') return t('focus.bHold');
    if (state === 'Exhale') return t('focus.bExhale');
    return state;
  };

  // --- Audio Synthesis ---
  const [activeSynth, setActiveSynth] = useState<'none' | 'drone' | 'wind'>('none');
  const [isPlayingPodcast, setIsPlayingPodcast] = useState(false);
  const [podcastTime, setPodcastTime] = useState(0);
  const podcastIntervalRef = useRef<number | null>(null);

  const initAudioContext = () => {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  };

  const stopAllSynths = () => {
    activeOscillators.forEach(osc => {
      try { osc.stop(); } catch (e) { /* ignore */ }
    });
    activeGains.forEach(gain => {
      gain.gain.setTargetAtTime(0, audioCtx?.currentTime || 0, 0.5);
    });
    activeOscillators = [];
    activeGains = [];
    setActiveSynth('none');
  };

  const startDrone = () => {
    initAudioContext();
    stopAllSynths();
    if (!audioCtx) return;

    const frequencies = [110, 110.5, 165, 220]; // Deep, slightly beating frequencies (A2)
    frequencies.forEach(freq => {
      const osc = audioCtx!.createOscillator();
      const gain = audioCtx!.createGain();
      
      osc.type = 'sine';
      osc.frequency.value = freq;
      
      gain.gain.value = 0;
      gain.gain.setTargetAtTime(0.05, audioCtx!.currentTime, 2); // Fade in
      
      osc.connect(gain);
      gain.connect(audioCtx!.destination);
      
      osc.start();
      activeOscillators.push(osc);
      activeGains.push(gain);
    });
    
    setActiveSynth('drone');
  };

  const startWind = () => {
    initAudioContext();
    stopAllSynths();
    if (!audioCtx) return;

    // White noise generator
    const bufferSize = audioCtx.sampleRate * 2; 
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 400; // Muffled

    const gain = audioCtx.createGain();
    gain.gain.value = 0;
    gain.gain.setTargetAtTime(0.1, audioCtx.currentTime, 2); // Fade in

    // Modulate filter to sound like wind
    const lfo = audioCtx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.1; // Very slow sweep
    const lfoGain = audioCtx.createGain();
    lfoGain.gain.value = 800; // Sweep range
    
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);

    noise.start();
    lfo.start();
    
    // We hack the active arrays to keep track of these for stopping
    activeOscillators.push(lfo as unknown as OscillatorNode);
    activeGains.push(gain);
    activeOscillators.push(noise as unknown as OscillatorNode); // Treat buffer source as osc for stop()

    setActiveSynth('wind');
  };

  // --- Fake Podcast Player ---
  // A dynamic list using translations
  const PODCASTS = [
    {
      id: 1,
      titleKey: "focus.p1Title",
      authorKey: "focus.p1Author",
      duration: 185,
      descriptionKey: "focus.p1Desc"
    },
    {
      id: 2,
      titleKey: "focus.p2Title",
      authorKey: "focus.p2Author",
      duration: 320,
      descriptionKey: "focus.p2Desc"
    },
    {
      id: 3,
      titleKey: "focus.p3Title",
      authorKey: "focus.p3Author",
      duration: 270,
      descriptionKey: "focus.p3Desc"
    }
  ];
  
  const [activePodcastId, setActivePodcastId] = useState(1);
  const activePodcast = PODCASTS.find(p => p.id === activePodcastId) || PODCASTS[0];

  useEffect(() => {
    if (isPlayingPodcast) {
      // Very gentle generative audio when podcast is "playing"
      // Since we don't have actual voice files, we'll generate a soft thought-provoking melody
      initAudioContext();
      
      const interval = window.setInterval(() => {
        setPodcastTime(prev => {
          if (prev >= activePodcast.duration) {
            setIsPlayingPodcast(false);
            return 0;
          }
          return prev + 1;
        });

        // Random generative chime every ~4 seconds
        if (audioCtx && Math.random() > 0.7) {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          const p = [220, 277.18, 329.63, 440]; // A major pentatonicish
          osc.frequency.value = p[Math.floor(Math.random() * p.length)];
          osc.type = 'sine';
          
          gain.gain.value = 0;
          gain.gain.setTargetAtTime(0.02, audioCtx.currentTime, 0.1);
          gain.gain.setTargetAtTime(0, audioCtx.currentTime + 0.5, 1);
          
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start();
          osc.stop(audioCtx.currentTime + 3);
        }
      }, 1000);
      podcastIntervalRef.current = interval;
    } else {
      if (podcastIntervalRef.current) {
        clearInterval(podcastIntervalRef.current);
      }
    }
    
    return () => {
      if (podcastIntervalRef.current) clearInterval(podcastIntervalRef.current);
    };
  }, [isPlayingPodcast, activePodcast.duration]);

  const handlePodcastPlayPause = () => {
    initAudioContext();
    setIsPlayingPodcast(!isPlayingPodcast);
  };

  const handleTrackChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setActivePodcastId(Number(e.target.value));
    setPodcastTime(0);
    setIsPlayingPodcast(false);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="focus-space-container">
      {/* Box 1: Breathing Guide */}
      <div className="card focus-tool-card" style={{ flex: 1.2 }}>
        <span className="lib-concept">{t('focus.uiMind')}</span>
        <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>{t('focus.uiGround')}</h3>
        <p style={{ fontSize: '0.95rem', marginBottom: '2rem' }}>
          {t('focus.uiEye')}
        </p>

        <div className="breathing-box">
          <div className="breathing-ring-outer">
            <div className={`breathing-ring-inner ${breatheState.toLowerCase()}`}>
              <div className="breathing-text">
                {getBreatheStateText(breatheState)}
                <div style={{ fontSize: '0.85rem', fontWeight: 400, opacity: 0.8, marginTop: '2px' }}>
                  {breatheSeconds}s
                </div>
              </div>
            </div>
          </div>
          <p className="breathing-instruction">
            {breatheState === 'Inhale' && t('focus.iInhale')}
            {breatheState === 'Hold' && t('focus.iHold')}
            {breatheState === 'Exhale' && t('focus.iExhale')}
          </p>
        </div>
      </div>

      {/* Box 2: Soundscapes & Podcasts */}
      <div className="card focus-tool-card audio-card">
        <span className="lib-concept">{t('focus.uiAudio')}</span>
        <h3 style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>{t('focus.uiSound')}</h3>

        {/* Ambient Synthesizers */}
        <div className="ambient-toggles">
          <div className="ambient-row">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Volume2 size={18} style={{ color: 'var(--accent-sage)' }} />
              <div>
                <div style={{ fontSize: '0.95rem', fontWeight: 500 }}>{t('focus.s1Title')}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{t('focus.s1Desc')}</div>
              </div>
            </div>
            <button 
              className={activeSynth === 'drone' ? 'playing' : ''}
              onClick={activeSynth === 'drone' ? stopAllSynths : startDrone}
            >
              {activeSynth === 'drone' ? t('focus.uiPlaying') : t('focus.uiPlay')}
            </button>
          </div>

          <div className="ambient-row">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Wind size={18} style={{ color: 'var(--accent-sage)' }} />
              <div>
                <div style={{ fontSize: '0.95rem', fontWeight: 500 }}>{t('focus.s2Title')}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{t('focus.s2Desc')}</div>
              </div>
            </div>
            <button 
              className={activeSynth === 'wind' ? 'playing' : ''}
              onClick={activeSynth === 'wind' ? stopAllSynths : startWind}
            >
              {activeSynth === 'wind' ? t('focus.uiPlaying') : t('focus.uiPlay')}
            </button>
          </div>
        </div>

        {/* Podcast Player */}
        <div className="podcast-player">
          <span className="lib-concept" style={{ fontSize: '0.7rem' }}>{t('focus.uiPodTag')}</span>
          
          <div style={{ marginTop: '0.75rem', marginBottom: '1rem' }}>
            <select 
              className="track-select-dropdown"
              value={activePodcastId} 
              onChange={handleTrackChange}
            >
              {PODCASTS.map(p => (
                <option key={p.id} value={p.id}>{t(p.titleKey as TranslationKey)}</option>
              ))}
            </select>
          </div>

          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', minHeight: '40px' }}>
            {t(activePodcast.descriptionKey as TranslationKey)}
          </div>

          {/* <div className='podcast-controls' style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}> */}
          <div className='podcast-controls'>
            <button 
              className="play-pause-btn" 
              onClick={handlePodcastPlayPause}
              aria-label={isPlayingPodcast ? "Pause" : "Play"}
            >
              {isPlayingPodcast ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" style={{ marginLeft: '4px' }} />}
            </button>
            <div className='track-selector'>
              <div className="progress-slider-container">
                <span>{formatTime(podcastTime)}</span>
                <div 
                  className="progress-slider" 
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const pct = (e.clientX - rect.left) / rect.width;
                    setPodcastTime(Math.floor(pct * activePodcast.duration));
                  }}
                >
                  <div 
                    className="progress-slider-fill" 
                    style={{ 
                      width: `${(podcastTime / activePodcast.duration) * 100}%`,
                      backgroundColor: 'var(--text-primary)'
                    }}
                  ></div>
                </div>
                <span>{formatTime(activePodcast.duration)}</span>
              </div>
            </div>
          </div>
          {isPlayingPodcast && (
            <div style={{ fontSize: '0.75rem', color: 'var(--accent-clay)', fontStyle: 'italic', textAlign: 'center', marginTop: '0.5rem' }} className="fade-in">
              {t('focus.uiGen')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
