import { View, Text, Switch, Pressable } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function MetronomeCard() {
    const [tempo, setTempo] = useState(115);
    const [bars, setBars] = useState("4 bars");
    const [nashville, setNashville] = useState(false);

    return (
        <View className="bg-[#141414] p-4 rounded-xl w-[300px]">

            <View className="flex-row items-center mb-4">
                <Ionicons name="settings-outline" size={18} color="#6366F1" className="mr-2" />
                <Text className="text-white text-lg font-semibold font-[cursive]">Quick Settings</Text>
            </View>

            <Text className="text-gray-300 text-sm mb-1 font-[cursive]">Tempo (BPM)</Text>


            <Text className="text-center text-white mb-3">{Math.round(tempo)}</Text>


            <Text className="text-gray-300 text-sm mb-1">Interval (bars)</Text>

            <Pressable
                className="bg-[#1E1E1E] rounded-md px-3 py-3 flex-row justify-between items-center mb-4"
                onPress={() => {
                    setBars(bars === "4 bars" ? "8 bars" : "4 bars");
                }}
            >
                <Text className="text-white">{bars}</Text>
                <Ionicons name="chevron-down" size={18} color="white" />
            </Pressable>


            <View className="flex-row justify-between items-center">
                <Text className="text-white font-[cursive]">Nashville Numbers</Text>
                <Switch
                    value={nashville}
                    onValueChange={setNashville}
                    thumbColor={nashville ? "#FFFFFF" : "#FFFFFF"}
                    trackColor={{ false: "#3A3A3A", true: "#6366F1" }}
                />
            </View>
        </View>
    );
}
