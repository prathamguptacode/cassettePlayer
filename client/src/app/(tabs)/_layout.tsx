import { NativeTabs } from 'expo-router/unstable-native-tabs';
import colors from '../styles/colors';
import { Platform } from 'react-native';

export default function TabLayout() {
  const tintColor = Platform.OS === "android" ? colors.fontColor : ""
  return (
    <NativeTabs backgroundColor={colors.tabBackgroundColor} indicatorColor={colors.indicatorColor} tintColor={tintColor} minimizeBehavior="onScrollDown">
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="house" md="home" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="search" role='search'>
        <NativeTabs.Trigger.Icon sf="magnifyingglass" md="search" />
        <NativeTabs.Trigger.Label>Search</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="playlist">
        <NativeTabs.Trigger.Icon sf="bookmark" md="bookmarks" />
        <NativeTabs.Trigger.Label>Playlist</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}

