import { View, Text,SafeAreaView} from 'react-native';
import MetronomeCard from "@/components/MetronomeCard";

export default function Settings() {
    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#0E1428'}}>
            <Text className={'text-center text-2xl text-white font-[cursive] font-bold'}>
                Settings
            </Text>

            <View className={'items-center mt-2 '}>

                <MetronomeCard/>
            </View>
        </SafeAreaView>


    );
}

