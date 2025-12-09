import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export default function ShuffleChords() {
    return (
        <View className="bg-[#141414] p-6 rounded-xl w-[340px] mt-2">
            <View className="flex-row items-center mb-4">
                <View className="w-4 h-4 rounded-sm bg-[#6366F1] mr-2" />
                <Text className="text-white text-lg font-semibold font-[cursive]">
                    Shuffle Chords
                </Text>
            </View>

            <View className="items-center mb-4">
                <View className="items-center bg-white p-4 rounded-2xl mb-3">
                    <Ionicons name="shuffle" size={38} color="blue" />
                </View>
                <Text className="text-white text-xl font-semibold font-[cursive] text-center">
                    Random Chord Trainer
                </Text>
                <Text className="text-white font-[cursive] my-2 text-center text-sm opacity-70">
                    Shuffles chords from your Practice tab selection
                </Text>
                <Text className="text-gray-500 font-[cursive] text-center text-xs mt-2">
                    💡 If no chords selected in Practice, all chords will be shuffled
                </Text>
            </View>
        </View>
    );
}
