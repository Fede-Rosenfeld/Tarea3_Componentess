import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "#d96c4f" }}>
      {/* Dejo una sola pestaña para la galería. */}
      <Tabs.Screen
        name="index"
        options={{ title: "Galería", headerShown: false }}
      />
    </Tabs>
  );
}
