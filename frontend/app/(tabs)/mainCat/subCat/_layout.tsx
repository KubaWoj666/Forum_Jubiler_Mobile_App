
import {Stack } from "expo-router";

export default function MenuStack() {
    return (
    <Stack>
        <Stack.Screen name="index" options={{headerShown:false}}/>
        <Stack.Screen name="[subCatName]" options={{headerShown:false}}/>

    </Stack>
    );
}