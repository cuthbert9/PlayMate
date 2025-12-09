import { CHORD_TYPES, ChordType } from '@/constants/chords';
import { useAppStore } from '@/store/useAppStore';
import { Ionicons } from "@expo/vector-icons";
import React from 'react';
import { Pressable, Text, View } from "react-native";

export default function PracticeType() {
    const { practiceSelectedTypes, togglePracticeChordType } = useAppStore();

    const isSelected = (type: ChordType) => practiceSelectedTypes.includes(type);

    return (
        <View className="bg-[#141414] p-4 rounded-xl w-[340px] mt-8">
            <Text className="text-white m-2 text-center font-[cursive]">
                Choose what you want to practice
            </Text>

            <View className="flex-row items-center mb-3 gap-4">
                <View>
                    <Ionicons name="list" size={28} color="blue" />
                </View>
                <Text className="text-white text-lg font-semibold mx-2 font-[cursive]">
                    Chord Types
                </Text>
            </View>

            <View className="flex-row flex-wrap justify-between">
                {CHORD_TYPES.map((type, index) => (
                    <Pressable
                        key={index}
                        className="w-[48%] py-3 rounded-md mb-2 items-center justify-center"
                        style={{
                            backgroundColor: isSelected(type) ? '#3B82F6' : '#1E1E1E'
                        }}
                        onPress={() => togglePracticeChordType(type)}
                    >
                        <Text
                            className={`${isSelected(type) ? 'text-white' : 'text-gray-300'
                                } font-medium`}
                        >
                            {type}
                        </Text>
                    </Pressable>
                ))}
            </View>
        </View>
    );
}
