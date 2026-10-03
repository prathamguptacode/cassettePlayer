import { Text, View, StyleSheet, DimensionValue, TouchableOpacity, } from "react-native";
import colors from "./styles/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Pause, Play, SquareCode, StepBack, StepForward, StopCircle } from "lucide-react-native"
import { Audio, AudioTagHandle, } from 'react-native-audio-api';
import { RefObject, useRef } from "react";
import { useAudioPlayer } from "expo-audio";
import { useLocalSearchParams } from "expo-router";
import { apiUrl } from "./_layout";

const btnSound = require("../../assets/button.mp3")

export default function Cassette() {

  const ref = useRef<AudioTagHandle>(null);
  const { cassette, title, singers } = useLocalSearchParams<{ cassette: string, title?: string, singers?: string[] }>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.myCassette}>
        <CornerHoles top={6} left={6} />
        <CornerHoles bottom={6} left={6} />
        <CornerHoles top={6} right={6} />
        <CornerHoles bottom={6} right={6} />
        <Frost />
        <Image
          style={[styles.image,]}
          source={`${apiUrl}/stream/maincover/${cassette}`}
          contentFit="cover"
        />
        <Image
          style={[styles.round,]}
          source={require("../../assets/round.png")}
          contentFit="cover"
        />
        <Audio source={`${apiUrl}/stream/music/${cassette}`} autoPlay loop ref={ref} />
      </View>
      <PlayerBox ref={ref} singers={singers} title={title} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.backgroundColor,
    position: "relative",
  },
  myCassette: {
    borderWidth: 3,
    borderColor: colors.caseColor,
    width: 340,
    height: 550,
    borderRadius: 16,
    overflow: "hidden",
    position: "absolute",
    top: 8
  },
  cornerHoles: {
    width: 20,
    height: 20,
    borderRadius: 20,
    position: "absolute",
    zIndex: 20,
    backgroundColor: colors.holeColor
  },
  image: {
    width: "100%",
    flex: 1,
    borderRadius: 8,
  },
  frostBox: {
    position: "absolute",
    width: 80,
    height: "70%",
    right: 0,
    top: "50%",
    zIndex: 50,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    transform: "translate(0,-50%)",
    backgroundColor: 'rgba(255, 255, 255, 0.30)',
    boxShadow: "rgba(149, 157, 165, 0.2) -4px 0px 20px"
  },
  bigHole: {
    width: 24,
    height: 24,
    borderRadius: 26,
    position: "absolute",
    zIndex: 50,
    backgroundColor: colors.holeColor,
    right: 10
  },
  squareHole: {
    width: 22,
    height: 22,
    borderRadius: 6,
    position: "absolute",
    zIndex: 50,
    backgroundColor: colors.holeColor,
    right: 24
  },
  playerBox: {
    position: "absolute",
    bottom: 0,
    zIndex: 10,
    width: "100%",
    height: 170,
    borderTopColor: "white",
    borderTopWidth: 2,
    padding: 16,
    gap: 28,
  },
  timer: {
    position: "absolute",
    top: 16,
    right: 16
  },
  songname: {
    fontWeight: 500,
    fontSize: 18,
    color: colors.songColor,
  },
  singerName: {
    color: colors.singerColor,
  },
  controlBox: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "space-between"
  },
  playButton: {
    borderRadius: 40,
    backgroundColor: "#3B3C45",
    width: 55,
    height: 55,
    justifyContent: "center",
    alignItems: "center"
  },
  stopButton: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    padding: 12,
    borderRadius: 40,
    backgroundColor: "#3B3C45",
  },
  psBox: {
    flexDirection: "row",
    gap: 12,
  },
  round: {
    position: "absolute",
    width: 100,
    height: 400,
    borderRadius: 16,
    top: "50%",
    left: "46%",
    transform: "translate(-50%, -50%)",
    opacity: 0.95
  },

});


function CornerHoles({ top, left, right, bottom }: { top?: DimensionValue, left?: DimensionValue, right?: DimensionValue, bottom?: DimensionValue }) {
  return <View style={[styles.cornerHoles, { top: top, left: left, right: right, bottom: bottom }]} />
}

function Frost() {
  return <View style={styles.frostBox}>
    <View style={[styles.bigHole, { top: 20 }]} />
    <View style={[styles.bigHole, { bottom: 20 }]} />
    <View style={[styles.squareHole, { top: 58 }]} />
    <View style={[styles.squareHole, { bottom: 58 }]} />
  </View>
}

function PlayerBox({ ref, title, singers }: { ref: RefObject<AudioTagHandle | null>, title?: string, singers?: string[] }) {

  const btnSnd = useAudioPlayer(btnSound);

  async function playButtonSound() {
    await btnSnd.seekTo(0);
    btnSnd.play();
  }

  function handlePlay() {
    playButtonSound()
    if (ref.current) {
      ref.current.play()
    }
  }

  function handlePause() {
    playButtonSound()
    if (ref.current) {
      ref.current.pause()
    }
  }


  return <View style={styles.playerBox}>
    <View style={styles.timer}><Text style={{ color: colors.fontColor }}></Text></View>
    <View>
      <Text style={styles.songname}>{title}</Text>
      <Text style={styles.singerName}>{singers}</Text>
    </View>
    <View style={styles.controlBox}>
      <TouchableOpacity style={styles.stopButton}><StepBack color={colors.songColor} size={20} /></TouchableOpacity>
      <View style={styles.psBox}>
        <TouchableOpacity onPress={handlePlay} style={[styles.playButton]}><Play fill={"white"} color={"white"} size={24} /></TouchableOpacity>
        <TouchableOpacity onPress={handlePause} style={[styles.playButton]}><SquareCode fill={"#FF746C"} color={"#FF746C"} size={24} /></TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.stopButton}><StepForward size={20} color={colors.songColor} /></TouchableOpacity>
    </View>
  </View>
}



