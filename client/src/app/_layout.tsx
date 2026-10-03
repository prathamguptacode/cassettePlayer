import { Stack } from "expo-router";
import colors from "./styles/colors";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from "react";
import axios from "axios";
import MusicContext from "./context/musicContext";

SplashScreen.preventAutoHideAsync()

export const apiUrl = "http://localhost:8000"
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




  return <MusicContext.Provider value={musicL}>
    <Stack screenOptions={{ headerShown: false, headerStyle: { backgroundColor: colors.backgroundColor }, headerShadowVisible: false }} >
      <Stack.Screen name="(tabs)" options={{ title: "Home" }} />
      <Stack.Screen name="[cassette]" options={{ headerShown: true, title: "", headerBackButtonDisplayMode: "minimal", headerBackButtonMenuEnabled: false }} />
    </Stack >
  </MusicContext.Provider>;
}
