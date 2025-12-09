import { useAppStore } from '@/store/useAppStore';
import { loadMetronomeSound, startMetronome, stopMetronome } from '@/utils/metronome';
import { getNashvilleNumber } from '@/utils/nashville';
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface ChordCardProps {
    mode: 'practice' | 'shuffle';
}

export default function ChordCard({ mode }: ChordCardProps) {
    const {
        tempo,
        playingMode,
        practiceChords,
        practiceCurrentIndex,
        shuffleChords,
        shuffleCurrentIndex,
        startPractice,
        stopPractice,
        startShuffle,
        stopShuffle,
        tick,
    } = useAppStore();

    const isPracticeMode = mode === 'practice';
    const isCurrentModeActive = playingMode === mode;

    // Get current chord based on mode
    const currentChord = isPracticeMode
        ? practiceChords[practiceCurrentIndex]
        : shuffleChords[shuffleCurrentIndex];

    // Load metronome sound on mount
    useEffect(() => {
        loadMetronomeSound();
        return () => {
            stopMetronome();
        };
    }, []);

    // Handle metronome playback
    useEffect(() => {
        if (isCurrentModeActive) {
            startMetronome(tempo, tick);
        } else if (playingMode === 'idle' || playingMode !== mode) {
            stopMetronome();
        }
    }, [isCurrentModeActive, tempo, playingMode]);

    const handlePlay = () => {
        if (isPracticeMode) {
            startPractice();
        } else {
            startShuffle();
        }
    };

    const handleStop = () => {
        if (isPracticeMode) {
            stopPractice();
        } else {
            stopShuffle();
        }
    };

    // Calculate Nashville number (use C as reference key for now)
    const referenceKey = 'C';
    const currentNashville = currentChord
        ? getNashvilleNumber(currentChord.key, referenceKey)
        : '1';

    const displayChord = currentChord ? currentChord.label : '--';

    return (
        <View className="flex-1 bg-black px-5 pt-2 mx-8 my-2 rounded-xl w-[300px]">
            {/* Play/Stop Controls */}
            <View className="flex flex-row mx-auto">
                <View className="bg-blue-700 p-3 my-2 items-center mx-2 rounded">
                    <TouchableOpacity onPress={handlePlay} disabled={isCurrentModeActive}>
                        <Ionicons name="play" size={28} color={isCurrentModeActive ? '#666' : 'white'} />
                    </TouchableOpacity>
                </View>
                <View className="bg-blue-700 p-3 my-2 items-center mx-2 rounded">
                    <TouchableOpacity onPress={handleStop} disabled={!isCurrentModeActive}>
                        <Ionicons name="stop-circle" size={28} color={isCurrentModeActive ? 'white' : '#666'} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Chord Display with Nashville */}
            <View className="bg-[#1A1A1A] rounded-xl p-6 mb-4">
                <Text className="text-center text-white opacity-70 text-sm mb-3 font-bold">
                    Current Chord
                </Text>

                {/* Chord Name */}
                <View className="items-center mb-4">
                    <Text className="text-white text-6xl font-bold">{displayChord}</Text>
                </View>

                {/* Nashville Number */}
                <View className="items-center">
                    <Text className="text-blue-400 text-sm opacity-70 mb-1">Nashville</Text>
                    <Text className="text-blue-400 text-3xl font-bold">{currentNashville}</Text>
                </View>
            </View>
        </View>
    );
}