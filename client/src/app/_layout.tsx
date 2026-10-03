import { Stack } from "expo-router";
import colors from "./styles/colors";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from "react";
import axios, { isAxiosError } from "axios";
import MusicContext from "./context/musicContext";
import { Text, View } from "react-native";
import { FlaskConicalOff } from "lucide-react-native";

SplashScreen.preventAutoHideAsync()

// export const apiUrl ="http://starind.ddns.net:8080/napster";

export const apiUrl = "http://172.20.10.10:8000";

export type musicList = {
  list: { _id: string, title: string, singers: string[] }[]
}

export default function RootLayout() {

  const [isReady, setIsReady] = useState(false);
  const [musicL, setMusicL] = useState<musicList | null>(null)

  useEffect(() => {
    async function getMusic() {
      try {
        const music = await axios.get<musicList>(apiUrl + "/stream/list")
        setMusicL(music.data)
      } catch (e) {
        console.warn(e);
        if (isAxiosError(e)) {
          console.log(e.response)
        }
      } finally {
        setIsReady(true);
      }
    }
    getMusic();
  }, []);


  useEffect(() => {
    if (isReady) {
      SplashScreen.hide();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  if (musicL == null) {
    return <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 32 }}>
      <FlaskConicalOff size={100} color={"white"} />
      <Text style={{ color: "white", fontWeight: 500, fontSize: 24 }} >Connect to Pie</Text>
    </View>
  }




  return <MusicContext.Provider value={musicL}>
    <Stack screenOptions={{ headerShown: false, headerStyle: { backgroundColor: colors.backgroundColor }, headerShadowVisible: false }} >
      <Stack.Screen name="(tabs)" options={{ title: "Home" }} />
      <Stack.Screen name="[cassette]" options={{ headerShown: true, title: "", headerBackButtonDisplayMode: "minimal", headerBackButtonMenuEnabled: false }} />
    </Stack >
  </MusicContext.Provider>;
}
