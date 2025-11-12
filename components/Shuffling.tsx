import { View, Text,SafeAreaView } from "react-native";
import { FaShuffle } from "react-icons/fa6";
import ChordCard from "@/components/ChordCard";

export default function ShuffleChords() {
    return (
        <View className="bg-[#141414] p-8 rounded-xl w-[340px] mt-2">
            <View className="flex-row items-center mb-3">
                <View className="w-4 h-4 rounded-sm bg-[#6366F1] mr-2" />
                <Text className="text-white text-lg font-semibold font-[cursive]">Shuffle Chords</Text>
            </View>

            <View className="flex flex-wrap justify-between p-4 ">

                <View className={'items-center bg-white p-4 rounded-2xl mx-auto my-1'}>
                    <FaShuffle size={38} color={'blue'} />
                </View>
                <View>
                    <Text className="text-white text-2xl font-semibold font-[cursive] text-center truncate">Chord  Memory Trainer</Text>
                </View>
                <Text className={'text-white font-[cursive] my-2'}>
                    Random chord progression practice with timing
                </Text>

            </View>


        </View>
    );
}
