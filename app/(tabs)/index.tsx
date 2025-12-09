import AllKeysMajor from "@/components/AllMajor";
import PracticeSessionScreen from "@/components/ChordsChange";
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

export default function HomeScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View className={'flex items-center'}>
                    <AllKeysMajor />
                </View>
                <PracticeSessionScreen />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0E1428',
    },
    scrollContent: {
        paddingBottom: 20,
    },
});
