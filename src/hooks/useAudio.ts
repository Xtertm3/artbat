import { useCallback, useState, useEffect } from 'react';
import * as Tone from 'tone';

// Persistent Singletons to prevent re-loading samples on component remounts
let PIANO_SAMPLER: Tone.Sampler | null = null;
let GUITAR_SAMPLER: Tone.Sampler | null = null;

const initializeSamplers = () => {
  if (PIANO_SAMPLER && GUITAR_SAMPLER) return;

  console.log('--- Initializing ArtBeat Audio Engine ---');

  PIANO_SAMPLER = new Tone.Sampler({
    urls: {
      "A0": "A0.mp3", "C1": "C1.mp3", "D#1": "Ds1.mp3", "F#1": "Fs1.mp3", "A1": "A1.mp3",
      "C2": "C2.mp3", "D#2": "Ds2.mp3", "F#2": "Fs2.mp3", "A2": "A2.mp3", "C3": "C3.mp3",
      "D#3": "Ds3.mp3", "F#3": "Fs3.mp3", "A3": "A3.mp3", "C4": "C4.mp3", "D#4": "Ds4.mp3",
      "F#4": "Fs4.mp3", "A4": "A4.mp3", "C5": "C5.mp3", "D#5": "Ds5.mp3", "F#5": "Fs5.mp3",
      "A5": "A5.mp3", "C6": "C6.mp3", "D#6": "Ds6.mp3", "F#6": "Fs6.mp3", "A6": "A6.mp3",
      "C7": "C7.mp3", "D#7": "Ds7.mp3", "F#7": "Fs7.mp3", "A7": "A7.mp3", "C8": "C8.mp3"
    },
    release: 1,
    baseUrl: "https://tonejs.github.io/audio/salamander/",
    onload: () => console.log('✅ Piano Samples Loaded'),
    onerror: (err) => console.error('❌ Piano Load Error:', err)
  }).toDestination();

  GUITAR_SAMPLER = new Tone.Sampler({
    urls: {
      "F#2": "Fs2.mp3", "A2": "A2.mp3", "C3": "C3.mp3", "D#3": "Ds3.mp3",
      "F#3": "Fs3.mp3", "A3": "A3.mp3", "C4": "C4.mp3", "D#4": "Ds4.mp3",
      "F#4": "Fs4.mp3", "A4": "A4.mp3", "C5": "C5.mp3", "D#5": "Ds5.mp3",
    },
    release: 1,
    baseUrl: "https://tonejs.github.io/audio/guitar-acoustic/",
    onload: () => console.log('✅ Guitar Samples Loaded'),
    onerror: (err) => console.error('❌ Guitar Load Error:', err)
  }).toDestination();
};

export function useAudio() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    initializeSamplers();
    
    // Periodically check if loaded (Tone.Sampler doesn't have a direct promise for 'loaded')
    const checkInterval = setInterval(() => {
      if (PIANO_SAMPLER?.loaded && GUITAR_SAMPLER?.loaded) {
        setIsLoaded(true);
        clearInterval(checkInterval);
      }
    }, 500);

    return () => clearInterval(checkInterval);
  }, []);

  const playPianoNote = useCallback(async (note: string) => {
    try {
      if (Tone.getContext().state !== 'running') {
        console.log('--- Waking up Audio Context ---');
        await Tone.start();
      }
      
      if (PIANO_SAMPLER?.loaded) {
        PIANO_SAMPLER.triggerAttack(note);
      } else {
        console.warn('⚠️ Piano not loaded yet');
      }
    } catch (err) {
      console.error('Audio Error:', err);
    }
  }, []);

  const stopPianoNote = useCallback((note: string) => {
    if (PIANO_SAMPLER?.loaded) {
      PIANO_SAMPLER.triggerRelease(note);
    }
  }, []);

  const playGuitarNote = useCallback(async (note: string) => {
    try {
      if (Tone.getContext().state !== 'running') {
        await Tone.start();
      }

      if (GUITAR_SAMPLER?.loaded) {
        GUITAR_SAMPLER.triggerAttackRelease(note, "1n");
      } else {
        console.warn('⚠️ Guitar not loaded yet');
      }
    } catch (err) {
      console.error('Audio Error:', err);
    }
  }, []);

  return { playPianoNote, stopPianoNote, playGuitarNote, isAudioLoaded: isLoaded };
}
