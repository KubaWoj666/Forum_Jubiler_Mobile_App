
import {Stack, useLocalSearchParams } from "expo-router";

export default function MenuStack() {
    const {subCatName} = useLocalSearchParams()
    return (
    <Stack>
        <Stack.Screen name="index" options={{headerShown:false}}/>
        <Stack.Screen name="[subCatName]" options={{title: `${subCatName}` , headerBackTitle: "Back"}}/>
    </Stack>
    );
}