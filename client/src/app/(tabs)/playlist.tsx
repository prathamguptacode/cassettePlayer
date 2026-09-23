import { Text, View, StyleSheet, ScrollView } from "react-native";
import colors from "../styles/colors";
import SideCassette from "../components/sideCassette";

export default function Playlist() {
  return (
    <ScrollView style={styles.container}>
      <SideCassette />
      <SideCassette />
      <SideCassette />
      <SideCassette />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor
  },
});
