import { View, Text, Pressable } from "react-native";
import { FaList } from "react-icons/fa";


const chordTypes = [
    "Major",
    "Minor",
    "7th",
    "Maj7",
    "Sus2",
    "Sus4",
    "Dim",
    "Add9",
];

export default function PracticeType() {
    return (
        <View className="bg-[#141414] p-4 rounded-xl w-[340px] mt-8">

            <Text className={'text-white  m-2 text-center font-[cursive]' }>
                  Choose what  you want to practice
            </Text>
            <View className="flex-row items-center mb-3 gap-4">
                <View  >
                    <FaList size={28} color={'blue'}/>
                </View>
                <Text className="text-white text-lg font-semibold mx-2 font-[cursive]">Chord Types</Text>
            </View>

            <View className="flex-row flex-wrap justify-between">
                {chordTypes.map((type, index) => (
                    <Pressable
                        key={index}
                        className="w-[48%] py-3 rounded-md bg-[#1E1E1E] mb-2 items-center justify-center"
                        style={type === "Major" ? { backgroundColor: "blue" } : {}}
                    >
                        <Text
                            className={`${
                                type === "Major" ? "text-white" : "text-gray-300"
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
