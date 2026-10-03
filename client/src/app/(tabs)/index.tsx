import { Text, View, StyleSheet, ScrollView } from "react-native";
import colors from "../styles/colors";
import SideCassette from "../components/sideCassette";
import { useContext } from "react";
import MusicContext from "../context/musicContext";

export default function Index() {

  const musicL = useContext(MusicContext)

  return (
    <ScrollView style={styles.container}>
      {
        musicL && musicL.list.map(e => {
          return <SideCassette _id={e._id} title={e.title} singers={e.singers} key={e._id} />
        })
      }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
});
