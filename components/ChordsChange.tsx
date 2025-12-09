import { useAppStore } from '@/store/useAppStore';
import { loadMetronomeSound, startMetronome, stopMetronome } from '@/utils/metronome';
import { getDiatonicChords } from '@/utils/nashville';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const SESSION_KEYS = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'] as const;

export default function PracticeSessionScreen() {
    const {
        tempo,
        playingMode,
        sessionCurrentKey,
        sessionKeyIndex,
        sessionChordDegree,
        sessionProgress,
        startSession,
        resetSession,
        tick,
    } = useAppStore();

    const isPlaying = playingMode === 'session';

    // Load metronome sound on mount
    useEffect(() => {
        loadMetronomeSound();
        return () => {
            // Only stop if we are unmounting truly, though logic in component usually handles this
            stopMetronome();
        };
    }, []);

    // Handle metronome playback
    useEffect(() => {
        if (isPlaying) {
            startMetronome(tempo, tick);
        } else {
            stopMetronome();
        }
    }, [isPlaying, tempo]);

    const handleStartSession = () => {
        startSession();
    };

    const handleReset = () => {
        resetSession();
    };

    // Get diatonic chords for current key
    const diatonicChords = getDiatonicChords(sessionCurrentKey);
    const currentChordInfo = diatonicChords[sessionChordDegree - 1];

    const totalChords = SESSION_KEYS.length * 7;
    const currentChordNumber = sessionKeyIndex * 7 + sessionChordDegree;

    return (
        <View className="bg-black px-5 pt-4 mx-8 my-2 rounded-xl">
            {/* Current Key Title */}
            <Text className="text-center text-white text-lg font-bold mb-3">
                Current Key: <Text className="text-blue-400">{sessionCurrentKey}</Text>
            </Text>

            {/* Combined Nashville Number and Chord Display */}
            <View className="bg-[#1A1A1A] rounded-xl p-6 mb-4">
                {/* Nashville Number */}
                <View className="items-center mb-4">
                    <Text className="text-blue-400 text-sm opacity-70 mb-2">Nashville Number</Text>
                    <Text className="text-blue-400 text-5xl font-bold">{currentChordInfo?.nashville || "1"}</Text>
                </View>

                {/* Divider */}
                <View className="h-px bg-gray-700 my-4" />

                {/* Chord Name */}
                <View className="items-center">
                    <Text className="text-white opacity-70 text-sm mb-2">Chord</Text>
                    <Text className="text-white text-5xl font-bold">{currentChordInfo?.chord || sessionCurrentKey}</Text>
                </View>
            </View>

            {/* BPM Display */}
            <View className="flex-row items-center justify-center mb-4">
                <View className="w-10 h-10 rounded-full bg-blue-700 justify-center items-center mr-3">
                    <Ionicons name={isPlaying ? "pause" : "musical-note"} size={20} color="#fff" />
                </View>

                <Text className="text-white text-3xl font-bold mr-2">{tempo}</Text>
                <Text className="text-white text-sm opacity-70">BPM</Text>
            </View>

            {/* Progress label */}
            <Text className="text-white text-center opacity-70 mb-2 font-[cursive] font-bold text-lg">
                Progress
            </Text>

            {/* Progress bar */}
            <View className="flex-row items-center justify-between mb-6">
                <View className="flex-1 h-[15px] bg-[#333333] rounded-full mx-3 overflow-hidden">
                    <View
                        className="h-full bg-blue-700 rounded-full"
                        style={{ width: `${sessionProgress}%` }}
                    />
                </View>

                <Text className="text-white text-sm opacity-70">
                    {Math.min(currentChordNumber, totalChords)}/{totalChords}
                </Text>
            </View>

            {/* Bottom buttons */}
            <View className="mb-6">
                <TouchableOpacity
                    className="bg-blue-700 h-12 rounded-full justify-center items-center mb-3"
                    onPress={handleStartSession}
                    disabled={isPlaying}
                >
                    <Text className="text-white text-base font-semibold">
                        {isPlaying ? 'Session Running...' : 'Start Session'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="border border-blue-700 h-12 rounded-full justify-center items-center"
                    onPress={handleReset}
                >
                    <Text className="text-blue-700 text-base font-semibold">
                        Reset
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}