import MetronomeCard from "@/components/MetronomeCard";
import { SafeAreaView, ScrollView, Text, View } from 'react-native';

export default function Settings() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#0E1428' }}>
            <Text className={'text-center text-2xl text-white font-[cursive] font-bold'}>
                Settings
            </Text>

            <ScrollView
                contentContainerStyle={{ paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
            >
                <View className={'items-center mt-2'}>
                    <MetronomeCard />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
