import { View, Text,SafeAreaView} from 'react-native';
import PracticeType from "@/components/PracticeMode";
import ChordCard from "@/components/ChordCard";


export default function TabTwoScreen() {
  return (
       <SafeAreaView style={{flex:1, backgroundColor:'#0E1428'}}>
           <Text className={'text-center text-white text-2xl font-bold my-2 font-[cursive]'}>
               Practice
           </Text>

           <View className={'flex items-center'}>
               <PracticeType/>

               <ChordCard/>

           </View>


       </SafeAreaView>


  );
}

