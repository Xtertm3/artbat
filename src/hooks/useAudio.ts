import { useCallback, useState, useEffect } from 'react';
import * as Tone from 'tone';

// Persistent Singletons
let PIANO_ENGINE: Tone.PolySynth | null = null;
let GUITAR_ENGINE: Tone.PolySynth | null = null;
let VIOLIN_ENGINE: Tone.PolySynth | null = null;
let DRUM_KICK: Tone.MembraneSynth | null = null;
let DRUM_SNARE: Tone.NoiseSynth | null = null;
let DRUM_HAT: Tone.NoiseSynth | null = null;
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
    volume: -6
  }).connect(MASTER_REVERB);

  VIOLIN_ENGINE = new Tone.PolySynth(Tone.AMSynth, {
    harmonicity: 2,
    oscillator: { type: 'sawtooth' },
    envelope: {
      attack: 0.3, // Slow attack for bowing
      decay: 0.1,
      sustain: 1.0,
      release: 0.5
    },
    volume: -8
  }).connect(MASTER_REVERB);

  DRUM_KICK = new Tone.MembraneSynth({
    pitchDecay: 0.05,
    octaves: 10,
    oscillator: { type: 'sine' },
    volume: 0
  }).connect(MASTER_REVERB);

  DRUM_SNARE = new Tone.NoiseSynth({
    noise: { type: 'white' },
    envelope: {
      attack: 0.001,
      decay: 0.2,
      sustain: 0
    },
    volume: -10
  }).connect(MASTER_REVERB);

  DRUM_HAT = new Tone.NoiseSynth({
    noise: { type: 'white' },
    envelope: {
      attack: 0.001,
      decay: 0.05,
      sustain: 0
    },
    volume: -14
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
    // Ensure the note has an octave (e.g. C -> C4)
    const processedNote = /^[A-G]#?\d$/.test(note) ? note : `${note}4`;
    PIANO_ENGINE?.triggerAttack(processedNote);
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

  const playViolinNote = useCallback(async (note: string) => {
    if (Tone.getContext().state !== 'running') {
      await unlockAudio();
    }
    VIOLIN_ENGINE?.triggerAttack(note);
  }, [unlockAudio]);

  const stopViolinNote = useCallback((note: string) => {
    VIOLIN_ENGINE?.triggerRelease(note);
  }, []);

  const playDrumSound = useCallback(async (type: 'kick' | 'snare' | 'hihat') => {
    if (Tone.getContext().state !== 'running') {
      await unlockAudio();
    }
    
    if (type === 'kick') DRUM_KICK?.triggerAttackRelease("C1", "8n");
    if (type === 'snare') DRUM_SNARE?.triggerAttackRelease("16n");
    if (type === 'hihat') DRUM_HAT?.triggerAttackRelease("32n");
  }, [unlockAudio]);

  return { 
    playPianoNote, 
    stopPianoNote, 
    playGuitarNote, 
    playViolinNote,
    stopViolinNote,
    playDrumSound,
    unlockAudio,
    isAudioLoaded: isReady,
    isAudioRunning
  };
}
