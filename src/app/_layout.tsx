import { NativeTabs, Icon, Label } from "expo-router/unstable-native-tabs";

export default function TabLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <Label>Home</Label>
        <Icon sf="house.fill" drawable="custom_android_drawable" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="parties">
        <Label>Parties</Label>
        <Icon sf="person.2.fill" drawable="custom_settings_drawable" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="settings">
        <Label>Settings</Label>
        <Icon sf="gear.badge" drawable="custom_settings_drawable" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
