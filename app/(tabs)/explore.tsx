import ChordCard from "@/components/ChordCard";
import PracticeType from "@/components/PracticeMode";
import { SafeAreaView, ScrollView, Text, View } from 'react-native';

export default function TabTwoScreen() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#0E1428' }}>
            <Text className={'text-center text-white text-2xl font-bold my-2 font-[cursive]'}>
                Practice
            </Text>

            <ScrollView
                contentContainerStyle={{ paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
            >
                <View className={'flex items-center'}>
                    <PracticeType />
                    <ChordCard mode="practice" />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
