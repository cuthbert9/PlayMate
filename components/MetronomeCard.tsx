import { useAppStore } from '@/store/useAppStore';
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

const BARS_OPTIONS = [1, 2, 4, 8];

export default function MetronomeCard() {
    const { tempo, bars, setTempo, setBars } = useAppStore();
    const [showBarsDropdown, setShowBarsDropdown] = useState(false);
    const [tempoInput, setTempoInput] = useState(String(tempo));

    const handleTempoChange = (value: string) => {
        setTempoInput(value);
    };

    const handleTempoSubmit = () => {
        const numValue = parseInt(tempoInput);
        if (!isNaN(numValue) && numValue >= 40 && numValue <= 240) {
            setTempo(numValue);
        } else {
            // Reset to valid range / current validated tempo
            if (isNaN(numValue) || numValue < 40) {
                setTempo(40);
                setTempoInput('40');
            } else if (numValue > 240) {
                setTempo(240);
                setTempoInput('240');
            }
        }
    };

    const handleTempoBlur = () => {
        handleTempoSubmit();
    };

    return (
        <View className="bg-[#141414] p-6 rounded-xl w-[320px]">
            {/* Header */}
            <View className="flex-row items-center mb-6">
                <Ionicons name="settings-outline" size={20} color="#6366F1" />
                <Text className="text-white text-xl font-semibold font-[cursive] ml-2">
                    Quick Settings
                </Text>
            </View>

            {/* Tempo */}
            <View className="mb-6">
                <Text className="text-gray-300 text-sm mb-2 font-[cursive]">
                    Tempo (BPM)
                </Text>
                <View className="bg-[#1E1E1E] rounded-lg px-4 py-3">
                    <TextInput
                        className="text-white text-center text-2xl font-bold"
                        value={tempoInput}
                        onChangeText={handleTempoChange}
                        onBlur={handleTempoBlur}
                        onSubmitEditing={handleTempoSubmit}
                        keyboardType="numeric"
                        maxLength={3}
                        returnKeyType="done"
                    />
                </View>
                <Text className="text-gray-500 text-xs mt-1 text-center">
                    40 - 240 BPM (Press Enter to apply)
                </Text>
            </View>

            {/* Bars Interval */}
            <View className="mb-6">
                <Text className="text-gray-300 text-sm mb-2 font-[cursive]">
                    Interval (bars)
                </Text>
                <Pressable
                    className="bg-[#1E1E1E] rounded-lg px-4 py-3 flex-row justify-between items-center"
                    onPress={() => setShowBarsDropdown(!showBarsDropdown)}
                >
                    <Text className="text-white text-lg">{bars} bars</Text>
                    <Ionicons
                        name={showBarsDropdown ? "chevron-up" : "chevron-down"}
                        size={20}
                        color="white"
                    />
                </Pressable>

                {showBarsDropdown && (
                    <View className="bg-[#1E1E1E] rounded-lg mt-2 overflow-hidden">
                        {BARS_OPTIONS.map((option) => (
                            <Pressable
                                key={option}
                                className="px-4 py-3 border-b border-gray-700"
                                onPress={() => {
                                    setBars(option);
                                    setShowBarsDropdown(false);
                                }}
                            >
                                <Text className="text-white text-center">
                                    {option} bars
                                </Text>
                            </Pressable>
                        ))}
                    </View>
                )}
            </View>

            {/* Profile Section */}
            <View className="border-t border-gray-700 pt-6">
                <View className="flex-row items-center">
                    <View className="w-12 h-12 rounded-full bg-blue-600 items-center justify-center mr-3">
                        <Text className="text-white text-xl font-bold">C</Text>
                    </View>
                    <View>
                        <Text className="text-white text-lg font-semibold">
                            Cuthbert.Dev
                        </Text>
                        <Text className="text-gray-400 text-sm">
                            Guitar Practitioner
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}
