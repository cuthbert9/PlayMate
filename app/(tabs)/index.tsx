import { SafeAreaView, View,StyleSheet} from 'react-native';
import PracticeSessionScreen from "@/components/ChordsChange";
import AllKeysMajor from "@/components/AllMajor";

export default function HomeScreen() {
    return (

        <SafeAreaView style={styles.container}>
               <View className={'flex items-center '}>
                        <AllKeysMajor/>
                    </View>
                <PracticeSessionScreen/>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0E1428',
    },
    text: {
        color: '#fff',
        textAlign:'center',
        fontSize:20,
        marginTop:10

    },
});
