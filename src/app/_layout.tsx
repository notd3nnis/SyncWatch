import { NativeTabs, Icon, Label } from "expo-router/unstable-native-tabs";

export default function TabLayout() {
  return (
    <NativeTabs
      iconColor={{
        default: "#A3A3A3",
        selected: "#FFFFFF",
      }}
      labelStyle={{
        default: { color: "#A3A3A3" },
        selected: { color: "#FFFFFF" },
      }}
    >
      <NativeTabs.Trigger name="index">
        <Label>Home</Label>
        <Icon
          sf={{ default: "house", selected: "house.fill" }}
          drawable="custom_android_drawable"
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="parties">
        <Label>Parties</Label>
        <Icon
          sf={{ default: "person.2", selected: "person.2.fill" }}
          drawable="custom_settings_drawable"
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="settings">
        <Label>Settings</Label>
        <Icon
          sf={{ default: "gearshape", selected: "gearshape.fill" }}
          drawable="custom_settings_drawable"
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
