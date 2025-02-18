import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import interrests from "@/utils/data.json";
import { ScrollView } from "moti";
import { useRouter  } from "expo-router";

const suggestions = [
    "say hello",
    "say hi",
    "i love javascript too",
    "show me how to impelent apis"
]
export default function ChatCard({ chat }: { chat: any }) {
    const router = useRouter ();
  return (
    <Pressable
    onPress={() => router.push('/explore')}
     style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Image
            source={{
              uri: chat.avatar,
            }}
            style={styles.avatarimage}
          />
        </View>
        <View style={styles.avatarPlaceHolder}></View>
        <View style={styles.avatarNameContainer}>
          <View>
            <Text style={{ ...styles.avatarName }}>{chat.user}</Text>
          </View>
        </View>
      </View>
      <View style={styles.cardContent}>
        {interrests.map((interrest, index) => (
          <View
            key={index}
            style={{
              padding: 15,
              flexDirection: "row",
              borderRadius: 12,
            }}
          >
            <View style={{borderRadius: 12 }}>
            <Image source={{ uri: interrest.avatar, width: 30, height: 30, }} />
            </View>
            <Text style={{ fontSize: 18, marginLeft: 10 }}>{interrest.name}</Text>
          </View>
        ))}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.footer}
      >
        <View style={{
            width: 60,
            height: 60,
            borderRadius: 60,
            backgroundColor: 'rgb(51, 150, 255)',
            marginRight: 10
        }}>
            <Text style={{fontSize: 50}}>✋</Text>
        </View>
        {suggestions.map((suggestion, key) => {
                return (
                    <View style={styles.suggestion} key={key}>  
                    <Text style={{fontSize: 18, color: 'rgb(51, 150, 255)'}}>{suggestion}</Text>
                    </View>
                )
            })}
      </ScrollView>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "90%",
    padding: 0,
    backgroundColor: "rgb(232, 232, 232)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: 50,
    elevation: 5,
    minHeight: 400,
    marginBottom: 20
  },
  header: {
    height: 100,
    backgroundColor: "rgb(rgb(233, 124, 105)",
    position: "relative",
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    flexDirection: "row",
  },
  cardContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 30,
    paddingTop: 60
  },
  avatar: {
    borderRadius: 150,
    padding: 10,
    height: 150,
    width: 150,
    position: "absolute",
    backgroundColor: "rgb(232, 232, 232)",
    bottom: -(150 / 2),
    zIndex: 2,
    left: 30,
  },
  avatarNameContainer: {
    flex: 2,
    padding: 5,
    justifyContent: "center",
  },
  avatarPlaceHolder: {
    flex: 1,
    padding: 12,
  },
  avatarName: {
    fontSize: 32,
  },
  avatarimage: {
    flex: 1,
    borderRadius: 150,
  },
  footer: { 
    flexDirection: "row",
    marginTop: 'auto',
    padding: 25,
    overflow: 'hidden',
    marginBottom: 20
    
  },
  suggestion: {
    borderRadius: 30,
    borderColor: 'rgb(51, 150, 255)',
    borderStyle: 'solid',
    borderWidth: 2,
    minWidth: 100,
    paddingInline: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10
  }
});
