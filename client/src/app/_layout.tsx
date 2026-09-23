import { Stack } from "expo-router";
import colors from "./styles/colors";

export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false, headerStyle: { backgroundColor: colors.backgroundColor }, headerShadowVisible: false }} >
    <Stack.Screen name="(tabs)" options={{ title: "Home" }} />
    <Stack.Screen name="cassette" options={{ headerShown: true, title: "", headerBackButtonDisplayMode: "minimal", headerBackButtonMenuEnabled: false }} />
  </Stack>;
}
