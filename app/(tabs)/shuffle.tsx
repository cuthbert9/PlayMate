import { View, Text,SafeAreaView} from 'react-native';
import ShuffleChords   from "@/components/Shuffling";
import ChordCard from "@/components/ChordCard";

export default function ChordShuffle() {
    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#0E1428'}}>
            <Text className={'text-center my-2 font-bold text-2xl text-white font-[cursive]'}>
                Shuffle
            </Text>

            <View className={'flex items-center'}>

                <ShuffleChords/>
                <ChordCard/>

            </View>
        </SafeAreaView>


    );
}

