import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "white",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
  },
  descriptionText: {
    color: "gray",
  },
  box: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  boxA: {
    width: 60,
  },
  boxB: {
    display: "flex",
    paddingTop: 2,
    justifyContent: "space-between",
  },
  languageBtn: {
    backgroundColor: "#0366d6",
    borderRadius: 3,
  },
  button: {
    color: "white",
    padding: 4,
  },
  otherBoxes: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
    marginVertical: 10,
  },
  otherBoxText: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

const OtherContents = ({ content, title }) => {
  return (
    <View style={styles.otherBoxText}>
      <Text style={styles.text}>{content}</Text>
      <Text>{title}</Text>
    </View>
  );
};

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={styles.boxA}>
          <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
        </View>
        <View style={styles.boxB}>
          <Text style={styles.text}>{item.fullName}</Text>
          <Text style={styles.descriptionText}>{item.description}</Text>
        </View>
      </View>
      <View style={styles.box}>
        <View style={styles.boxA}></View>
        <View style={styles.boxB}>
          <Pressable style={styles.languageBtn}>
            <Text style={styles.button}>{item.language}</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.otherBoxes}>
        <OtherContents
          content={`${
            item.stargazersCount >= 1000
              ? `${(item.stargazersCount / 1000).toFixed(1)}k`
              : item.stargazersCount
          }`}
          title={"Stars"}
        />

        <OtherContents
          content={`${
            item.forksCount > 1000
              ? `${(item.forksCount / 1000).toFixed(1)}k`
              : item.forksCount
          }`}
          title={"Forks"}
        />

        <OtherContents content={item.reviewCount} title={"Reviews"} />

        <OtherContents content={item.ratingAverage} title={"Rating"} />
      </View>
    </View>
  );
};

export default RepositoryItem;
