import { StyleSheet, Text, View, ScrollView } from "react-native";
const documentation = `in the _layout.tsx you can find the component searchBar, this component when open it get the search result from the api (i simulated the data in this example). on change of the input it call the function  handle seach this functino reorder the search results on every change of the input it will call the function setSearchResults and update the state of the search results.`;

export default function TabTwoScreen() {
  return (
    <View style={{ flex: 1, padding: 0, marginBottom: 50 }}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <View
            style={{
              flex: 1,
              borderRadius: 150,
              backgroundColor: "rgb(252, 88, 129)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 50 }}>AJ</Text>
          </View>
        </View>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={{ fontSize: 30, color: "#000" }}>Ahmed Jaber</Text>
        </View>
      </View>
      <View style={styles.chatView}>
        <ScrollView contentContainerStyle={{ width: "100%", padding: 10 }}>
          <View style={{ ...styles.recived, ...styles.msg }}>
            <Text style={styles.textMsg}>hello,</Text>
          </View>
          <View style={{ ...styles.recived, ...styles.msg }}>
            <Text style={styles.textMsg}>you documention</Text>
          </View>
          <View style={{ ...styles.sent, ...styles.msg }}>
            <Text style={styles.textMsg}>yes</Text>
          </View>
          <View style={{ ...styles.sent, ...styles.msg }}>
            <Text style={styles.textMsg}>The Search Feature: </Text>
          </View>
          <View style={{ ...styles.sent, ...styles.msg }}>
            <Text style={styles.textMsg}>{documentation}</Text>
          </View>
        </ScrollView>
      </View>
      <View style={styles.chatbox}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 100,
    borderBottomColor: "rgba(158, 158, 158, 0.41)",
    borderBottomWidth: 1,
    borderStyle: "solid",
    backgroundColor: "rgb(232, 232, 232)",
    flexDirection: "row",
  },
  avatar: {
    borderRadius: 150,
    padding: 10,
    height: 150,
    width: 150,
    backgroundColor: "rgb(232, 232, 232)",
  },
  chatView: {
    flex: 1,
    justifyContent: "flex-end",
  },
  chatbox: {
    flexDirection: "row",
    height: 80,
  },
  msg: {
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    maxWidth: "80%",
  },
  recived: {
    backgroundColor: "rgb(44, 125, 255)",
    marginLeft: "auto",
  },
  sent: {
    backgroundColor: "rgb(39, 193, 0)",
    marginRight: "auto",
  },
  textMsg: {
    fontSize: 20,
    lineHeight: 35,
    color: "#fff",
  },
});
