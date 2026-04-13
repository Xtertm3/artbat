import { useCallback, useState, useEffect } from 'react';
import * as Tone from 'tone';

// Persistent Singletons
let PIANO_ENGINE: Tone.PolySynth | null = null;
let GUITAR_ENGINE: Tone.PolySynth | null = null;
let MASTER_REVERB: Tone.Reverb | null = null;

const initializeSynthesisEngines = () => {
  if (PIANO_ENGINE && GUITAR_ENGINE) return;

  console.log('--- Initializing ArtBeat Audio Engine ---');

  MASTER_REVERB = new Tone.Reverb(1.5).toDestination();

  PIANO_ENGINE = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: 'sine' },
    envelope: {
      attack: 0.005,
      decay: 0.1,
      sustain: 0.3,
      release: 0.8
    },
    volume: -2 // Increased volume
  }).connect(MASTER_REVERB);

  GUITAR_ENGINE = new Tone.PolySynth(Tone.FMSynth, {
    harmonicity: 3,
    modulationIndex: 10,
    oscillator: { type: 'sine' },
    envelope: {
      attack: 0.01,
      decay: 0.2,
      sustain: 0.1,
      release: 1.2
    },
    volume: -6 // Increased volume
  }).connect(MASTER_REVERB);
};

export function useAudio() {
  const [isReady, setIsReady] = useState(false);
  const [isAudioRunning, setIsAudioRunning] = useState(false);

  useEffect(() => {
    initializeSynthesisEngines();
    setIsReady(true);
    
    // Check initial state
    setIsAudioRunning(Tone.getContext().state === 'running');

    // Subscribe to state changes
    const checkState = () => {
      setIsAudioRunning(Tone.getContext().state === 'running');
    };
    
    // Some browsers don't support the 'statechange' event reliably on Context
    const interval = setInterval(checkState, 1000);
    return () => clearInterval(interval);
  }, []);

  const unlockAudio = useCallback(async () => {
    console.log('--- Attempting to Unlock Audio ---');
    try {
      await Tone.start();
      setIsAudioRunning(Tone.getContext().state === 'running');
      console.log('Audio State:', Tone.getContext().state);
      
      // Play a tiny silent note to force initialization
      PIANO_ENGINE?.triggerAttackRelease("C4", "8n", "+0.1", 0);
    } catch (err) {
      console.error('Unlock error:', err);
    }
  }, []);

  const playPianoNote = useCallback(async (note: string) => {
    if (Tone.getContext().state !== 'running') {
      await unlockAudio();
    }
    PIANO_ENGINE?.triggerAttack(note);
  }, [unlockAudio]);

  const stopPianoNote = useCallback((note: string) => {
    PIANO_ENGINE?.triggerRelease(note);
  }, []);

  const playGuitarNote = useCallback(async (note: string) => {
    if (Tone.getContext().state !== 'running') {
      await unlockAudio();
    }
    GUITAR_ENGINE?.triggerAttackRelease(note, "1n");
  }, [unlockAudio]);

  return { 
    playPianoNote, 
    stopPianoNote, 
    playGuitarNote, 
    unlockAudio,
    isAudioLoaded: isReady,
    isAudioRunning
  };
}
