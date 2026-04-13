import { useCallback, useState, useEffect } from 'react';
import * as Tone from 'tone';

// Persistent Singletons to prevent re-initializing on component remounts
let PIANO_ENGINE: Tone.PolySynth | null = null;
let GUITAR_ENGINE: Tone.PolySynth | null = null;

const initializeSynthesisEngines = () => {
  if (PIANO_ENGINE && GUITAR_ENGINE) return;

  console.log('--- Initializing ArtBeat Synthesis Engine (Instant) ---');

  // Multi-layered Piano Synth
  PIANO_ENGINE = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: 'sine' },
    envelope: {
      attack: 0.005,
      decay: 0.1,
      sustain: 0.3,
      release: 1
    },
    volume: -8
  }).toDestination();

  // Add a subtle reverb/delay for a more "acoustic" feel to the synthesis
  const reverb = new Tone.Reverb(1.5).toDestination();
  PIANO_ENGINE.connect(reverb);

  // Guitar-like Synth using FM Synthesis for string character
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
    modulation: { type: 'square' },
    modulationEnvelope: {
      attack: 0.5,
      decay: 0,
      sustain: 1,
      release: 0.5
    },
    volume: -12
  }).toDestination();
  
  GUITAR_ENGINE.connect(reverb);
};

export function useAudio() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    initializeSynthesisEngines();
    // Synthesis is virtually instant
    setIsReady(true);
  }, []);

  const playPianoNote = useCallback(async (note: string) => {
    try {
      if (Tone.getContext().state !== 'running') {
        await Tone.start();
      }
      PIANO_ENGINE?.triggerAttack(note);
    } catch (err) {
      console.error('Audio Error:', err);
    }
  }, []);

  const stopPianoNote = useCallback((note: string) => {
    PIANO_ENGINE?.triggerRelease(note);
  }, []);

  const playGuitarNote = useCallback(async (note: string) => {
    try {
      if (Tone.getContext().state !== 'running') {
        await Tone.start();
      }
      // Use triggerAttackRelease with a long release for guitar strings
      GUITAR_ENGINE?.triggerAttackRelease(note, "1n");
    } catch (err) {
      console.error('Audio Error:', err);
    }
  }, []);

  return { playPianoNote, stopPianoNote, playGuitarNote, isAudioLoaded: isReady };
}
