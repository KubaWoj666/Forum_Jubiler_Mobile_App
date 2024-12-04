
import {Stack } from "expo-router";

export default function MenuStack() {
    return (
    <Stack>
        <Stack.Screen name="index" options={{title: "Events", headerTintColor: "white" }}/>
        <Stack.Screen name="[productId]" options={{headerShown:false}}/>
    </Stack>
    );
}