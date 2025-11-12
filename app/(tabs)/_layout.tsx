import { Tabs } from 'expo-router';
import React from 'react';
import '../../global.css'
import { FaGuitar,FaHome,FaMusic } from "react-icons/fa";
import { FaShuffle } from "react-icons/fa6";
import { MdOutlineSettings } from "react-icons/md";
import { GiWeightLiftingUp } from "react-icons/gi";
import {View} from 'react-native'



export default function TabLayout() {

    return (
    <View style={{flex:1, backgroundColor:'#0E1428'}}>

    <Tabs

      screenOptions={{
        tabBarActiveTintColor:  'blue',
        headerShown: false,
          tabBarStyle:{
            backgroundColor:'#000',
              borderRadius:20,
              marginBottom:10,
              shadowColor:'white'


          }

      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FaHome size={22}  color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Practice',
            tabBarIcon: ({ color }) => <GiWeightLiftingUp size={25}  color={color} />,

        }}
      />
        <Tabs.Screen
            name="shuffle"
            options={{
                title: 'shuffle',
                tabBarIcon: ({ color }) => <FaShuffle name="musical-notes" size={22} color={color}  />,

            }}
        />
        <Tabs.Screen
            name="settings"
            options={{
                title: 'settings',
                tabBarIcon: ({ color }) => <MdOutlineSettings size={25}  color={color} />,

            }}
        />
    </Tabs>

    </View>


  );
}
