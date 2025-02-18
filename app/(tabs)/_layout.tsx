import { Tabs } from "expo-router";
import React from "react";
import {
  Platform,
} from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import SearchBar from "@/components/ui/search";
import searchData from '@/utils/data.json';



export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <React.Fragment>
      <SearchBar searchData={searchData} />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
          tabBarItemStyle: { marginLeft: 100, marginRight: 100, width: 20 },
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarIconStyle: {
            width: 200,
            height: 50,
            marginLeft: 20,
            marginRight: 20,
            backgroundColor: "green",
          },
          tabBarStyle: Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: "absolute",
              zindex: -1,
            },
            default: {
              position: "absolute",
              bottom: 10,
              zindex: -1,
              borderRadius: 20,
              height: 70,
              paddingTop: 0,
              justifyContent: "space-between",
            },
          }),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "",
            tabBarIconStyle: {
              width: 200,
              height: 50,
              marginRight: 100,
            },
            tabBarIcon: ({ color }) => (
              <MaterialIcons
                size={50}
                name="person-2"
                color={"rgb(51, 150, 255)"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: "",
            tabBarIconStyle: {
              width: 200,
              height: 50,
              marginLeft: 100,
            },
            tabBarIcon: ({ color }) => (
              <Ionicons
                size={50}
                name="chatbubble-sharp"
                color={"rgb(51, 150, 255)"}
              />
            ),
          }}
        />
      </Tabs>
    </React.Fragment>
  );
}
