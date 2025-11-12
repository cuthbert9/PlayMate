import React from 'react';
import { View, Text } from 'react-native';

import { FaGuitar,FaHome,FaMusic } from "react-icons/fa";


export default function AllKeysMajor() {
    return (
        <View
            className="mx-5 my-3 rounded-xl p-8"
            style={{
                backgroundColor: 'black',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8,
            }}
        >
            {/* Icon Circle */}
            <View className="w-20 h-20 rounded-full bg-blue-200 justify-center items-center mb-6 self-center">
                <FaGuitar size={38}  color={'blue'} />
            </View>

            {/* Title */}
            <Text
                className="text-white text-2xl font-bold text-center"
                style={{
                    textShadowColor: 'rgba(255, 255, 255, 0.4)',
                    textShadowOffset: { width: 0, height: 1 },
                    textShadowRadius: 6,
                }}
            >
                All Keys Major Scale
            </Text>

            {/* Subtitle */}
            <Text
                className="text-white/80 text-base text-center mt-3 leading-6"
                style={{
                    textShadowColor: 'rgba(255, 255, 255, 0.3)',
                    textShadowOffset: { width: 0, height: 1 },
                    textShadowRadius: 4,
                }}
            >
                Practice scales across all keys with{'\n'}
                <Text className="font-medium">Nashville numbers</Text>
            </Text>
        </View>
    );
}