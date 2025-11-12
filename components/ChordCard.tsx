import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FaPlay ,FaStopCircle } from "react-icons/fa";


export default function ChordCard() {

    const [playing,setPlaying]=useState(false);

    return (
        <View className="flex-1 bg-black px-5 pt-2 mx-8 my-2 rounded-xl w-[300px] ">




            <View className={'flex flex-row  mx-auto  ' }>
                <View className={'bg-blue-700 p-3 my-2 items-center mx-2  rounded'}>

                    <FaPlay size={28} color={'white'}/>
                </View>
                <View className={'bg-blue-700 p-3 my-2 items-center mx-2 rounded'}>
                    <FaStopCircle  size={28} color={'white'}/>
                </View>

            </View>
            <View>

            </View>



            {/* Key bar */}
            <View className="h-[200px] bg-[#1A1A1A] rounded-xl justify-center items-center mb-2 ">
                <Text className="text-center text-white opacity-70 text-base mb-2 p-3 font-bold">
                    Current Key
                </Text>

                <Text className="text-white text-5xl font-bold">Am7</Text>
            </View>

            {/* Nashville */}
            <Text className="text-center text-white text-lg mb-2 font-bold">
                Nashville: 1
            </Text>

          </View>
    );
}