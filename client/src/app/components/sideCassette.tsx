import { View, StyleSheet, Text, TouchableOpacity, } from "react-native";
import { Image } from 'expo-image';
import { useState } from "react";
import colors from "../styles/colors";
import { useRouter } from "expo-router";
import { useAudioPlayer } from 'expo-audio';
import { apiUrl } from "../_layout";


const insertSound = require("../../../assets/insert.mp3")

export default function SideCassette({ _id, title, singers }: { _id: string, title: string, singers: string[] }) {

  const [dis, setDis] = useState(false)
  const router = useRouter()

  const player = useAudioPlayer(insertSound);

  async function playButtonSound() {
    await player.seekTo(0);
    player.play();
  }



  return (
    <TouchableOpacity onPress={() => setDis(prev => !prev)} onLongPress={() => { playButtonSound(); router.navigate(`/${_id}?title=${title}&singers=${singers}`) }} >
      <View style={[dis ? styles.pressContainer : styles.container]}>
        <View style={styles.leftHolder} />
        {
          dis ? <View style={styles.titleBox}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.singer}>{
              singers.map(e => e + ", ")
            }</Text>
          </View> : null
        }
        <Image
          style={[styles.image, dis ? styles.pressImage : null]}
          source={apiUrl + "/stream/sidecover/" + _id}
          contentFit="cover"
        />
        <View style={styles.rightHolder} />
      </View>
    </TouchableOpacity >

  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    width: 390,
    alignSelf: "center",
    marginTop: 16,
    boxShadow: "0px 4px 10px 10px rgba(0, 0, 0, 0.25)",
    borderRadius: 16,
    borderWidth: 5,
    borderColor: "rgba(0, 0, 0, 0.35)",
    overflow: "hidden",
    position: "relative",
  },
  image: {
    flex: 1,
    width: '100%',
  },
  pressImage: {
    flex: 1,
    width: '100%',
    filter: "brightness(60%)"
  },
  leftHolder: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 10,
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    zIndex: 10,
  },
  rightHolder: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 10,
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    zIndex: 10,
  },
  titleBox: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8
  },
  pressContainer: {
    height: 70,
    width: 390,
    alignSelf: "center",
    marginTop: 16,
    boxShadow: "0px 2px 5px 5px rgba(0, 0, 0, 0.25)",
    borderRadius: 16,
    borderWidth: 3,
    borderColor: "rgba(0, 0, 0, 0.35)",
    overflow: "hidden",
    position: "relative",
  },
  title: {
    color: colors.fontColor,
    fontWeight: 600,
    fontSize: 20
  },
  singer: {
    color: colors.fontColor,
    fontSize: 16
  },
});
