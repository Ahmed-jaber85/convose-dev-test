import { Tabs } from "expo-router";
import React, { useState } from "react";
import { Platform, StyleSheet } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import SearchBar from "@/components/ui/search";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [autoCompeleteData, setautoCompeleteData] = useState<any[]>([]);

  const updateAutoCompeleteSuggestions = async (word: string): Promise<any[]> => {
    const url = `https://be-v2.convose.com/autocomplete/interests?q=${word}&limit=12&from=0`;
    const headers = {
      Accept: "application/json",
      "Accept-Encoding": "gzip, deflate, br, zstd",
      "Accept-Language": "en-GB,en;q=0.9,en-US;q=0.8,de-DE;q=0.7,de;q=0.6",
      Authorization: "Jy8RZCXvvc6pZQUu2QZ2",
      Connection: "keep-alive",
      Host: "be-v2.convose.com",
    };

    return fetch(url, {
      method: "GET",
      headers: headers,
    })
      .then((response) => response.json()) // Parse JSON response
      .then((data) => data.autocomplete); // Handle the response data
  };

  return (
    <React.Fragment>
      <SearchBar
        autoCompeleteData={autoCompeleteData}
        setautoCompeleteData={setautoCompeleteData}
        updateAutoCompeleteSuggestions={updateAutoCompeleteSuggestions}
      />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
          tabBarItemStyle: { marginLeft: 100, marginRight: 100, width: 20 },
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarIconStyle: styles.tabs_tabBarIcon,
          tabBarStyle: Platform.select({
            ios: {
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
            tabBarIconStyle: styles.tabBarIconLeft,
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
            tabBarIconStyle: styles.tabBarIconRight,
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

const styles = StyleSheet.create({
  tabs_tabBarIcon: {
    width: 200,
    height: 50,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "green",
  },
  tabs_ios_tabBarStyle: {
    position: "absolute",
  },
  tabBarIconLeft: {
    width: 200,
    height: 50,
    marginRight: 100,
  },
  tabBarIconRight: {
    width: 200,
    height: 50,
    marginLeft: 100,
  },
});
