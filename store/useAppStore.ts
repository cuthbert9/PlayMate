import { CHORD_LIBRARY, ChordKey, ChordType, DEFAULT_SELECTED_CHORD_TYPES, PracticeChord } from '@/constants/chords';
import { create } from 'zustand';

export type PlayingMode = 'idle' | 'session' | 'practice' | 'shuffle';

interface AppState {
    // Settings
    tempo: number;
    bars: number;

    // Playback state
    playingMode: PlayingMode;
    currentBeat: number;
    currentBar: number;

    // Session mode (homepage)
    sessionKeyIndex: number;
    sessionCurrentKey: ChordKey;
    sessionChordDegree: number;
    sessionProgress: number;

    // Practice mode
    practiceSelectedTypes: ChordType[];
    practiceChords: PracticeChord[];
    practiceCurrentIndex: number;

    // Shuffle mode
    shuffleChords: PracticeChord[];
    shuffleCurrentIndex: number;

    // Actions
    setTempo: (tempo: number) => void;
    setBars: (bars: number) => void;
    setPlayingMode: (mode: PlayingMode) => void;

    // Session actions
    startSession: () => void;
    resetSession: () => void;
    nextSessionChord: () => void;

    // Practice actions
    togglePracticeChordType: (type: ChordType) => void;
    startPractice: () => void;
    stopPractice: () => void;
    nextPracticeChord: () => void;
    buildPracticeChords: () => void;

    // Shuffle actions
    startShuffle: () => void;
    stopShuffle: () => void;
    nextShuffleChord: () => void;
    buildShuffleChords: () => void;

    // Metronome actions
    tick: () => void;
    resetBeats: () => void;
}

const SESSION_KEYS: ChordKey[] = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

export const useAppStore = create<AppState>((set, get) => ({
    // Initial state
    tempo: 115,
    bars: 4,
    playingMode: 'idle',
    currentBeat: 0,
    currentBar: 0,

    // Session
    sessionKeyIndex: 0,
    sessionCurrentKey: 'C',
    sessionChordDegree: 1,
    sessionProgress: 0,

    // Practice
    practiceSelectedTypes: DEFAULT_SELECTED_CHORD_TYPES,
    practiceChords: [],
    practiceCurrentIndex: 0,

    // Shuffle
    shuffleChords: [],
    shuffleCurrentIndex: 0,

    // Settings actions
    setTempo: (tempo) => set({ tempo }),
    setBars: (bars) => set({ bars }),
    setPlayingMode: (mode) => set({ playingMode: mode }),

    // Session actions
    startSession: () => {
        set({
            playingMode: 'session',
            sessionKeyIndex: 0,
            sessionCurrentKey: SESSION_KEYS[0],
            sessionChordDegree: 1,
            sessionProgress: 0,
            currentBeat: 0,
            currentBar: 0,
        });
    },

    resetSession: () => {
        set({
            playingMode: 'idle',
            sessionKeyIndex: 0,
            sessionCurrentKey: SESSION_KEYS[0],
            sessionChordDegree: 1,
            sessionProgress: 0,
            currentBeat: 0,
            currentBar: 0,
        });
    },

    nextSessionChord: () => {
        const { sessionKeyIndex, sessionChordDegree } = get();

        if (sessionChordDegree < 7) {
            set({ sessionChordDegree: sessionChordDegree + 1 });
        } else {
            const nextKeyIndex = (sessionKeyIndex + 1) % SESSION_KEYS.length;
            const totalChords = SESSION_KEYS.length * 7;
            const currentChordNumber = nextKeyIndex * 7 + 1; // Start of next key
            const progress = (currentChordNumber / totalChords) * 100;

            set({
                sessionKeyIndex: nextKeyIndex,
                sessionCurrentKey: SESSION_KEYS[nextKeyIndex],
                sessionChordDegree: 1,
                sessionProgress: progress,
            });
        }
    },

    // Practice actions
    togglePracticeChordType: (type) => {
        const { practiceSelectedTypes } = get();
        const isSelected = practiceSelectedTypes.includes(type);

        const newTypes = isSelected
            ? practiceSelectedTypes.filter(t => t !== type)
            : [...practiceSelectedTypes, type];

        set({ practiceSelectedTypes: newTypes });
        get().buildPracticeChords();
    },

    buildPracticeChords: () => {
        const { practiceSelectedTypes } = get();

        if (practiceSelectedTypes.length === 0) {
            set({ practiceChords: [] });
            return;
        }

        const chords: PracticeChord[] = [];
        practiceSelectedTypes.forEach(type => {
            const chordsOfType = CHORD_LIBRARY.filter((c: PracticeChord) => c.type === type);
            chords.push(...chordsOfType);
        });

        set({ practiceChords: chords });
    },

    startPractice: () => {
        get().buildPracticeChords();
        set({
            playingMode: 'practice',
            practiceCurrentIndex: 0,
            currentBeat: 0,
            currentBar: 0,
        });
    },

    stopPractice: () => {
        set({
            playingMode: 'idle',
            currentBeat: 0,
            currentBar: 0,
        });
    },

    nextPracticeChord: () => {
        const { practiceChords, practiceCurrentIndex } = get();
        if (practiceChords.length === 0) return;

        const nextIndex = (practiceCurrentIndex + 1) % practiceChords.length;
        set({ practiceCurrentIndex: nextIndex });
    },

    // Shuffle actions
    buildShuffleChords: () => {
        const { practiceSelectedTypes } = get();

        let chords: PracticeChord[];
        if (practiceSelectedTypes.length === 0) {
            chords = [...CHORD_LIBRARY];
        } else {
            chords = CHORD_LIBRARY.filter((c: PracticeChord) =>
                practiceSelectedTypes.includes(c.type)
            );
        }

        const shuffled = [...chords].sort(() => Math.random() - 0.5);
        set({ shuffleChords: shuffled });
    },

    startShuffle: () => {
        get().buildShuffleChords();
        set({
            playingMode: 'shuffle',
            shuffleCurrentIndex: 0,
            currentBeat: 0,
            currentBar: 0,
        });
    },

    stopShuffle: () => {
        set({
            playingMode: 'idle',
            currentBeat: 0,
            currentBar: 0,
        });
    },

    nextShuffleChord: () => {
        const { shuffleChords, shuffleCurrentIndex } = get();
        if (shuffleChords.length === 0) return;

        const nextIndex = (shuffleCurrentIndex + 1) % shuffleChords.length;
        set({ shuffleCurrentIndex: nextIndex });
    },

    // Metronome actions
    tick: () => {
        const { currentBeat, bars, playingMode } = get();
        const beatsPerBar = 4;

        const nextBeat = currentBeat + 1;

        // Ensure bars is a number (handle potential strings from UI)
        const barsNum = Number(bars) || 4;

        if (nextBeat >= beatsPerBar * barsNum) {
            set({ currentBeat: 0 }); // Reset beat

            if (playingMode === 'session') {
                get().nextSessionChord();
            } else if (playingMode === 'practice') {
                get().nextPracticeChord();
            } else if (playingMode === 'shuffle') {
                get().nextShuffleChord();
            }
        } else {
            set({ currentBeat: nextBeat });
        }
    },

    resetBeats: () => set({ currentBeat: 0, currentBar: 0 }),
}));
