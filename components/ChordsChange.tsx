import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width: SCREEN_W } = Dimensions.get('window');

export default function PracticeSessionScreen() {
    // const [progress] = useState(0.25);

    return (
        <View className="flex-1 bg-black px-5 pt-2 mx-8 my-2 rounded-xl">

            <Text className="text-center text-white opacity-70 text-base mb-2 font-bold">
                Current Key
            </Text>

            {/* Key bar */}
            <View className="h-[50px] bg-[#1A1A1A] rounded-xl justify-center items-center mb-2">
                <Text className="text-white text-5xl font-bold">A</Text>
            </View>

            {/* Nashville */}
            <Text className="text-center text-blue-700 text-base mb-2">
                Nashville: 1
            </Text>

            {/* BPM */}
            <View className="flex-row items-center justify-center mb-2">
                <TouchableOpacity className="w-6 h-6 rounded-full bg-blue-700 justify-center items-center mr-3 p-4">
                    <Icon name="play" size={18} color="#fff" />
                </TouchableOpacity>

                <Text className="text-white text-2xl font-bold mr-1">115</Text>
                <Text className="text-white text-sm opacity-70">BPM</Text>
            </View>

             Progress label
            <Text className="text-white text-center opacity-70  mb-2 font-[cursive] font-bold text-lg">Progress</Text>

            {/* Progress bar */}
            <View className="flex-row items-center justify-between mb-4">
                <View className="flex-1 h-[15px] bg-[#333333] rounded-full mx-3 overflow-hidden">
                    <View
                        className="h-full bg-blue-700 rounded-full"
                        style={{ width: ` 35%` }}
                    />
                </View>

                <Text className="text-white text-sm opacity-70">3/12 Keys</Text>
            </View>

            {/* Bottom buttons – absolute */}
            <View className="absolute bottom-10 left-5 right-5">
                <TouchableOpacity className="bg-blue-700 h-12 rounded-full justify-center items-center mb-4">
                    <Text className="text-white text-base font-semibold">
                        Start Session
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity className="border border-blue-700 h-12 rounded-full justify-center items-center">
                    <Text className="text-blue-700 text-base font-semibold">
                        Reset
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}