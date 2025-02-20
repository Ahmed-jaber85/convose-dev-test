import React, { SetStateAction, useEffect, useState } from "react";
import {
  Pressable,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
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
import type { itemType } from "@/utils/types";
import { useRouter } from "expo-router";

const parsName = (str: string): any => {
  const [name, tagsStr] = str.split(" [");
  const tags = tagsStr ? tagsStr.slice(0, -1).split(" ") : [];
  const parsed = {
    name,
    tags,
  };
  console.log(parsed);
  return parsed;
};
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
        <TouchableOpacity onPress={closeSearch} style={styles.chatCloseButton}>
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
        <Pressable onPress={openSearch} style={styles.chatOpenButton}>
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
  autoCompeleteLocal,
  handleSearch,
  searchValue,
}: {
  searchOpen: boolean;
  autoCompeleteLocal: itemType[];
  handleSearch: (e: NativeSyntheticEvent<{ text: string }>) => void;
  closeSearch: () => void;
  searchValue: string;
}) => {
  const { handleAddToSearchQuery } = useData();

  return (
    <>
      {searchOpen && (
        <View style={styles.resultsViewContainer}>
          {!(autoCompeleteLocal.length > 0) ? (
            <>
              {Array.from({ length: 4 }).map((_, index) => {
                return (
                  <View key={index} style={styles.resultsSkeletonContainer}>
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
            <View style={{ flex: 1}}>
              <ScrollView
                ref={(ref) => {
                  if (ref) {
                    setTimeout(() => {
                      ref.scrollToEnd({ animated: true });
                    }, 200);
                  }
                }}
                contentContainerStyle={styles.resultsScrollContainer}
              >
                {autoCompeleteLocal.map((result, index) => {
                  return (
                    <Pressable
                      onPress={() => {
                        handleAddToSearchQuery(result);
                        closeSearch();
                      }}
                      key={index}
                      style={styles.resultItem}
                    >
                      <View style={{ flex: 1 }}>
                        {result.avatar ? (
                          <Image
                            src={result.avatar}
                            source={{ uri: result.avatar }}
                            style={styles.resultImage}
                          />
                        ) : (
                          <View
                            style={{
                              ...styles.resultImagePlaceHolder,
                              backgroundColor: result.color,
                            }}
                          >
                            <Text style={{ fontSize: 30 }}>
                              {result.name[0]}
                            </Text>
                          </View>
                        )}
                      </View>
                      <View style={styles.resultTextContainer}>
                        <Text style={{ fontSize: 18 }}>
                          {parsName(result.name)?.name}
                        </Text>

                    
                            {parsName(result.name)?.tags.map((tag: string, index: number) => {
                              return (
                                <Text key={index} style={styles.resultText}>{tag},</Text>
                              );
                            })}
                        
                      </View>
                    </Pressable>
                  );
                })}
              </ScrollView>
            </View>
          )}

          <View style={styles.searchInputContainer}>
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
                style={styles.searchTextInput}
              />
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default function SearchBar({
  autoCompeleteData,
  updateAutoCompeleteSuggestions,
  setautoCompeleteData,
}: {
  autoCompeleteData: itemType[];
  updateAutoCompeleteSuggestions: (word: string) => Promise<any>;
  setautoCompeleteData: React.Dispatch<React.SetStateAction<itemType[]>>;
}) {
  const searchValues = useSharedValue<boolean>(false);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [autoCompeleteLocal, setautoCompeleteLocal] = useState<itemType[]>(
    autoCompeleteData || []
  );

  const router = useRouter();
  const openSearch = () => {
    searchValues.value = true;
    setSearchOpen(true);
  };
  const closeSearch = () => {
    searchValues.value = false;
    setSearchOpen(false);
    setautoCompeleteData([]);
    router.push("/");
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

  const handleSearch = async (
    e: NativeSyntheticEvent<{ text: string }> | null
  ) => {
    if (!e) return;
    const { text } = e.nativeEvent;
    setSearchValue(text);
    setautoCompeleteLocal((prevData) =>
      autoCompeleteFilter([ ...prevData], text).reverse()
    );
    updateAutoCompeleteSuggestions(text).then((data: itemType[]) => {
      const newData = data.filter((newItem) => {
        return (
          !autoCompeleteLocal.some(
            (oldItem) => oldItem.id === newItem.id
          ) 
        );
      });
      setautoCompeleteLocal((prevData) => {
        let filteredPrevData = prevData.filter((newItem) => {
          return (
            !autoCompeleteLocal.some(
              (oldItem) => oldItem.id === newItem.id
            ) 
          );
        });
        return  autoCompeleteFilter([...newData, ...filteredPrevData], text).reverse()
      }
      );
    });
  };

  const autoCompeleteFilter = (
    arr: itemType[],
    filterTerm: string
  ): itemType[] => {
    const reg = new RegExp(`^${filterTerm}`, "i");
    const filtered = arr.filter((el) => reg.test(el.name));
    const unfiltered = arr.filter((el) => !reg.test(el.name));
    return [...filtered, ...unfiltered];
  };
  useEffect(() => {
    updateAutoCompeleteSuggestions("a");
  }, [searchOpen]);
  return (
    <Animated.View style={[animatedStyle, styles.chatContainer]}>
      <CloseButton searchOpen={searchOpen} closeSearch={closeSearch} />
      <OpenSeachButton searchOpen={searchOpen} openSearch={openSearch} />
      <SearchView
        searchOpen={searchOpen}
        autoCompeleteLocal={autoCompeleteLocal}
        handleSearch={handleSearch}
        searchValue={searchValue}
        closeSearch={closeSearch}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  chatContainer: {
    position: "absolute",
    left: "50%",
    transform: [{ translateX: "-50%" }],
    borderRadius: 50,
    zIndex: 3,
  },
  chatCloseButton: {
    position: "absolute",
    zIndex: 4,
    top: 10,
    right: 10,
  },

  chatOpenButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    gap: 0,
    alignItems: "center",
  },
  resultsViewContainer: {
    flex: 1,
    padding: 12,
    paddingTop: 0,
    overflow: "hidden",
    borderRadius: 50,
    justifyContent: "flex-end",
  },
  resultsSkeletonContainer: {
    width: "100%",
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
  },
  resultsScrollContainer: {
    width: "100%",
    minHeight: '100%',
    zIndex: 10,
  
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  resultItem: {
    width: "100%",
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
  },
  resultImage: {
    width: 50,
    height: 50,
    borderRadius: 12,
  },
  resultImagePlaceHolder: {
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
  },
  resultTextContainer: {
    flex: 7,
    flexDirection: "row",
    alignItems: "center",
  },
  resultText: {
    fontSize: 15,
    marginLeft: 10,
    color: "rgb(158, 158, 158)",
  },
  searchInputContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    borderTopColor: "rgba(158, 158, 158, 0.41)",
    borderTopWidth: 1,
    borderStyle: "solid",
  },
  searchTextInput: {
    width: "100%",
    flex: 1,
    fontSize: 18,
    padding: 12,
  },
});
