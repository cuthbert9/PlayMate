import { ChordKey } from '@/constants/chords';

// Nashville number system maps each note to a scale degree
// relative to the key. C major scale: C=1, D=2, E=3, F=4, G=5, A=6, B=7

const NOTE_TO_SEMITONE: Record<ChordKey, number> = {
    'C': 0,
    'Db': 1,
    'D': 2,
    'Eb': 3,
    'E': 4,
    'F': 5,
    'Gb': 6,
    'G': 7,
    'Ab': 8,
    'A': 9,
    'Bb': 10,
    'B': 11,
};

const SEMITONE_TO_NOTE: ChordKey[] = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

// Major scale intervals (in semitones from root)
const MAJOR_SCALE_INTERVALS = [0, 2, 4, 5, 7, 9, 11];

/**
 * Calculate Nashville number for a chord relative to a key
 * @param chordKey The root note of the chord (e.g., 'D')
 * @param currentKey The current key we're in (e.g., 'C')
 * @returns Nashville number as string (e.g., '1', '2', 'b3', etc.)
 */
export function getNashvilleNumber(chordKey: ChordKey, currentKey: ChordKey): string {
    const keySemitone = NOTE_TO_SEMITONE[currentKey];
    const chordSemitone = NOTE_TO_SEMITONE[chordKey];

    // Calculate interval from key to chord (mod 12)
    let interval = (chordSemitone - keySemitone + 12) % 12;

    // Find the scale degree
    for (let i = 0; i < MAJOR_SCALE_INTERVALS.length; i++) {
        if (MAJOR_SCALE_INTERVALS[i] === interval) {
            return String(i + 1);
        }
    }

    // If not in major scale, find closest and add flat/sharp
    // Check if it's a flat note (one semitone below a scale degree)
    for (let i = 0; i < MAJOR_SCALE_INTERVALS.length; i++) {
        if ((MAJOR_SCALE_INTERVALS[i] - 1 + 12) % 12 === interval) {
            return `♭${i + 1}`;
        }
    }

    // Check if it's a sharp note (one semitone above a scale degree)
    for (let i = 0; i < MAJOR_SCALE_INTERVALS.length; i++) {
        if ((MAJOR_SCALE_INTERVALS[i] + 1) % 12 === interval) {
            return `♯${i + 1}`;
        }
    }

    // Fallback (shouldn't reach here)
    return '?';
}

/**
 * Get the diatonic chords for a given key
 * Returns array of 7 chords: [I, ii, iii, IV, V, vi, vii°]
 */
export function getDiatonicChords(key: ChordKey): { degree: number; chord: string; nashville: string }[] {
    const rootSemitone = NOTE_TO_SEMITONE[key];

    // Quality for each scale degree (1=Major, 0=minor, -1=diminished)
    const qualities = [1, 0, 0, 1, 1, 0, -1]; // I, ii, iii, IV, V, vi, vii°
    const qualitySuffixes = ['', 'm', 'm', '', '', 'm', 'dim'];

    return MAJOR_SCALE_INTERVALS.map((interval, index) => {
        const chordSemitone = (rootSemitone + interval) % 12;
        const chordRoot = SEMITONE_TO_NOTE[chordSemitone];
        const quality = qualitySuffixes[index];

        return {
            degree: index + 1,
            chord: `${chordRoot}${quality}`,
            nashville: String(index + 1),
        };
    });
}
