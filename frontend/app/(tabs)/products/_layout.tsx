import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { Pressable } from "react-native";

export default function MenuStack() {
    return (
    <Stack>
        <Stack.Screen name="index" options={{title: "Events", headerTintColor: "white" }}/>
        <Stack.Screen name="[productId]" options={{headerShown:false}}/>
    </Stack>
    );
}