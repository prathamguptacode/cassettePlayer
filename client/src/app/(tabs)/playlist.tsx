import { Text, StyleSheet, ScrollView } from "react-native";
import colors from "../styles/colors";

export default function Playlist() {
  return (
    <ScrollView style={styles.container}>
      <Text>under construction</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor
  },
});
