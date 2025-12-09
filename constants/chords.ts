export type ChordType = 'Major' | 'Minor' | '7th' | 'Maj7' | 'Sus2' | 'Sus4' | 'Dim' | 'Add9';

export type ChordKey = 'A' | 'Bb' | 'B' | 'C' | 'Db' | 'D' | 'Eb' | 'E' | 'F' | 'Gb' | 'G' | 'Ab';

export type PracticeChord = {
    id: string;
    label: string;
    key: ChordKey;
    type: ChordType;
};

export const CHORD_TYPES: ChordType[] = [
    'Major',
    'Minor',
    '7th',
    'Maj7',
    'Sus2',
    'Sus4',
    'Dim',
    'Add9',
];

export const CHORD_KEYS: ChordKey[] = [
    'A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab'
];

// Mapping of chord types to their suffix notation
const CHORD_TYPE_SUFFIX: Record<ChordType, string> = {
    'Major': '',
    'Minor': 'm',
    '7th': '7',
    'Maj7': 'maj7',
    'Sus2': 'sus2',
    'Sus4': 'sus4',
    'Dim': 'dim',
    'Add9': 'add9',
};

// Generate full chord library
export const CHORD_LIBRARY: PracticeChord[] = CHORD_KEYS.flatMap(key =>
    CHORD_TYPES.map(type => ({
        id: `${key}${CHORD_TYPE_SUFFIX[type]}`,
        label: `${key}${CHORD_TYPE_SUFFIX[type]}`,
        key,
        type,
    }))
);

// All keys for the session mode (cycling through all 12 keys)
export const SESSION_KEYS: ChordKey[] = [
    'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'
];

export const DEFAULT_SELECTED_CHORD_TYPES: ChordType[] = ['Major'];
