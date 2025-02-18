import React, { useEffect, useState } from "react";
import {
  Pressable,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import type { NativeSyntheticEvent } from "react-native";
import { ScrollView } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useData } from "@/context/data";
import { Skeleton } from "moti/skeleton";
import type { itemType } from '@/utils/types';
import { useRouter  } from "expo-router";

const CloseButton = ({
  searchOpen,
  closeSearch,
}: {
  searchOpen: boolean;
  closeSearch: () => void;
}) => {
  return (
    <>
      {searchOpen && (
        <TouchableOpacity
          onPress={closeSearch}
          style={{
            position: "absolute",
            zIndex: 4,
            top: 10,
            right: 10,
          }}
        >
          <Ionicons name="close" size={50} color="rgb(51, 150, 255)" />
        </TouchableOpacity>
      )}
    </>
  );
};

const OpenSeachButton = ({
  searchOpen,
  openSearch,
}: {
  searchOpen: boolean;
  openSearch: () => void;
}) => {
  return (
    <>
      {!searchOpen && (
        <Pressable
          onPress={openSearch}
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            gap: 0,
            alignItems: "center",
          }}
        >
          <EvilIcons
            name="search"
            size={50}
            color="#fff"
            style={{ marginTop: -10, marginLeft: -10 }}
          />

          <Text style={{ color: "#fff", fontSize: 25 }}>Add on Interrest</Text>
        </Pressable>
      )}
    </>
  );
};

const SearchView = ({
  searchOpen,
  closeSearch,
  searchResults,
  handleSearch,
  searchValue,
}: {
  searchOpen: boolean;
  searchResults: itemType[];
  handleSearch: (e: NativeSyntheticEvent<{ text: string }>) => void;
  closeSearch: () => void;
  searchValue: string;
}) => {
  const { handleAddToSearchQuery } = useData();
  const [resultsLoading, setResultsLoading] = useState(true);

  useEffect(() => {
    setResultsLoading(true);
    setTimeout(() => {
      setResultsLoading(false);
    }, 1500);
  }, [searchOpen]);
  return (
    <>
      {searchOpen && (
        <View
          style={{
            flex: 1,
            padding: 12,
            paddingTop: 0,
            overflow: "hidden",
            borderRadius: 50,
            justifyContent: "flex-end",
          }}
        >
          {resultsLoading ? (
            <>
              {Array.from({ length: 4 }).map((_, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      width: "100%",
                      marginTop: 8,
                      flexDirection: "row",
                      alignItems: "center",
                      padding: 4,
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      <Skeleton
                        colorMode={"light"}
                        radius={12}
                        height={75}
                        width={75}
                      />
                    </View>

                    <View style={{ flex: 5 }}>
                      <Skeleton
                        colorMode={"light"}
                        radius={12}
                        height={45}
                        width={"100%"}
                      />
                    </View>
                  </View>
                );
              })}
            </>
          ) : (
            <View style={{ flex: 1 }}>
              <ScrollView
                ref={(ref) => {
                  if (ref) {
                    setTimeout(() => {
                      ref.scrollToEnd({ animated: true });
                    }, 200);
                  }
                }}
                contentContainerStyle={{
                  width: "100%",
                  zIndex: 10,
                  paddingBottom: 20
                }}
              >
                {searchResults.map((result) => {
                  return (
                    <Pressable
                    onPress={() =>{
                        handleAddToSearchQuery(result);
                         closeSearch();
                        }}
                      key={result.id}
                      style={{
                        width: "100%",
                        marginTop: 8,
                        flexDirection: "row",
                        alignItems: "center",
                        padding: 4,
                      }}
                    >
                      <View style={{ flex: 1 }}>
                        {result.avatar ? (
                          <Image
                            src={result.avatar}
                            source={{ uri: result.avatar }}
                            style={{
                              width: 50,
                              height: 50,
                              borderRadius: 12,
                            }}
                          />
                        ) : (
                          <View
                            style={{
                              backgroundColor: result.color,
                              borderRadius: 12,
                              justifyContent: "center",
                              alignItems: "center",
                              width: 50,
                              height: 50,
                            }}
                          >
                            <Text style={{ fontSize: 30 }}>
                              {result.name[0]}
                            </Text>
                          </View>
                        )}
                      </View>
                      <View
                        style={{
                          flex: 7,
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Text style={{ fontSize: 18 }}>{result.name}</Text>
                        <Text
                          style={{
                            fontSize: 15,
                            marginLeft: 10,
                            color: "rgb(158, 158, 158)",
                          }}
                        >
                          {result.type || ""}
                        </Text>
                      </View>
                    </Pressable>
                  );
                })}
              </ScrollView>
            </View>
          )}

          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "center",
              borderTopColor: "rgba(158, 158, 158, 0.41)",
              borderTopWidth: 1,
              borderStyle: "solid",
            }}
          >
            <View style={{ flex: 1, height: 60, alignItems: "center" }}>
              <EvilIcons
                name="search"
                size={50}
                color="rgb(158, 158, 158)"
                style={{ marginTop: 5 }}
              />
            </View>
            <View style={{ flex: 6 }}>
              <TextInput
                autoFocus={searchOpen}
                onChange={handleSearch}
                placeholder="Add on Interrest"
                value={searchValue}
                style={{
                  width: "100%",
                  flex: 1,
                  fontSize: 18,
                  padding: 12,
                }}
              />
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default function SearchBar({ searchData }: { searchData: itemType[] }) {
  const searchValues = useSharedValue<boolean>(false);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResults, setSearchResults] = useState<itemType[]>(searchData);
  const router = useRouter ();

  const openSearch = () => {
    searchValues.value = true;
    setSearchOpen(true);
  };
  const closeSearch = () => {
    console.log("pressed");
    searchValues.value = false;
    setSearchOpen(false);
    router.push('/');
    setSearchValue("");
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(searchValues.value ? "95%" : "50%", {
        duration: 300,
      }),
      height: withTiming(searchValues.value ? 500 : 80, {
        duration: 300,
      }),

      bottom: withTiming(searchValues.value ? 90 : 45, {
        duration: 300,
      }),
      backgroundColor: withTiming(
        searchValues.value ? "#fff" : "rgb(51, 150, 255)",
        {
          duration: 300,
        }
      ),
      elevation: withTiming(searchValues.value ? 1 : 0, {
        duration: 300,
      }),
    };
  });

  const handleSearch = (e: NativeSyntheticEvent<{ text: string }>) => {
    setSearchValue(e.nativeEvent.text);
    setSearchResults(searchFilter(searchData, e.nativeEvent.text).reverse());
  };

  const searchFilter = (arr: itemType[], filterTerm: string): itemType[] => {
    const reg = new RegExp(`^${filterTerm}`, "i");
    const filtered = arr.filter((el) => reg.test(el.name));
    const unfiltered = arr.filter((el) => !reg.test(el.name));
    return [...filtered, ...unfiltered];
  };
  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          position: "absolute",
          left: "50%",
          transform: [{ translateX: "-50%" }],
          borderRadius: 50,
          zIndex: 3,
        },
      ]}
    >
      <CloseButton searchOpen={searchOpen} closeSearch={closeSearch} />
      <OpenSeachButton searchOpen={searchOpen} openSearch={openSearch} />
      <SearchView
        searchOpen={searchOpen}
        searchResults={searchResults}
        handleSearch={handleSearch}
        searchValue={searchValue}
        closeSearch={closeSearch}
      />
    </Animated.View>
  );
}
