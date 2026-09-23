import { Text, View, StyleSheet } from "react-native";
import colors from "../styles/colors";

export default function Search() {
  return (
    <View style={styles.container}>
      <Text>Hello Search Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.backgroundColor
  },
});
