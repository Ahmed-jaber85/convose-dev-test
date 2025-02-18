import { useData } from "@/context/data";
import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import ChatCard from "@/components/ui/chatCard";
import { Skeleton } from "moti/skeleton";

export default function HomeScreen() {
  const { searchQuery, removeItemFromSearchQuery, chatsLoading } = useData();
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <View style={styles.titleLogo}>
          <Text style={{ ...styles.logLetter, color: "rgb(250, 78, 55)" }}>
            C
          </Text>
          <Text style={{ ...styles.logLetter, color: "rgb(255, 212, 41)" }}>
            O
          </Text>
          <Text style={{ ...styles.logLetter, color: "rgb(144, 252, 56)" }}>
            N
          </Text>
          <Text style={{ ...styles.logLetter, color: "rgb(66, 145, 255)" }}>
            V
          </Text>
          <Text style={{ ...styles.logLetter, color: "rgb(144, 252, 56)" }}>
            O
          </Text>
          <Text style={{ ...styles.logLetter, color: "rgb(250, 213, 67)" }}>
            S
          </Text>
          <Text style={{ ...styles.logLetter, color: "rgb(250, 78, 55)" }}>
            E
          </Text>
        </View>
      </View>
      <View style={styles.screen}>
        {searchQuery.length > 0 && (
          <View style={styles.chipsContainer}>
            {searchQuery.map((query, index) => {
              return (
                <View
                  key={index}
                  style={{
                    margin: 3,
                    backgroundColor: query.color,
                    padding: 8,
                    paddingInline: 30,
                    borderRadius: 12,
                    position: "relative",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => removeItemFromSearchQuery(query.id)}
                    style={{
                      position: "absolute",
                      zIndex: 4,
                      top: 5,
                      right: 5,
                    }}
                  >
                    <Ionicons name="close" size={20} color="#fff" />
                  </TouchableOpacity>
                  <Text style={{ color: "#fff", fontSize: 25 }}>
                    {query.name}
                  </Text>
                </View>
              );
            })}
          </View>
        )}
        <ScrollView
          contentContainerStyle={{ alignItems: "center", paddingBottom: 100 }}
        >
          {chatsLoading ? (
            <>
              {Array.from({ length: 2 }).map((_, index) => (
                <View
                  key={index}
                  style={{
                    width: "95%",
                    marginTop: 20,
                  }}
                >
                  <Skeleton
                    colorMode={"light"}
                    radius={12}
                    height={500}
                    width={"100%"}
                  />
                </View>
              ))}
            </>
          ) : (
            <>
              <ChatCard
              key={"123"}
                chat={{
                  user: "Peter Parker",
                  avatar:
                    "https://static.wikia.nocookie.net/disney/images/2/2f/Tom_Holland.jpg/revision/latest?cb=20220705230939",
                }}
              />
              
              <ChatCard
              key={"546"}
                chat={{
                  user: "John Doe",
                  avatar:
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpYj7k68KtncfzaCLfsn3EH8atwWxaSmX9TA&s",
                }}
              />
            </>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  chipsContainer: {
    width: "90%",
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  screen: {
    flex: 1,
    padding: 10,
    paddingTop: 20,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  header: {
    width: "100%",
    height: 100,
    borderBottomColor: "rgba(158, 158, 158, 0.41)",
    borderBottomWidth: 1,
    borderStyle: "solid",
  },
  titleLogo: {
    flexDirection: "row",
    padding: 10,
  },
  logLetter: {
    fontSize: 40,
    fontWeight: "bold",
    margin: 2,
  },
});
