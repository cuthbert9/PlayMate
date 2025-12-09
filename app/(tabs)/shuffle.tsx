import ChordCard from "@/components/ChordCard";
import ShuffleChords from "@/components/Shuffling";
import { SafeAreaView, ScrollView, Text, View } from 'react-native';

export default function ChordShuffle() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#0E1428' }}>
            <Text className={'text-center my-2 font-bold text-2xl text-white font-[cursive]'}>
                Shuffle
            </Text>

            <ScrollView
                contentContainerStyle={{ paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
            >
                <View className={'flex items-center'}>
                    <ShuffleChords />
                    <ChordCard mode="shuffle" />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
