
import {Stack } from "expo-router";

export default function MenuStack() {
    return (
    <Stack>
        <Stack.Screen name="index" options={{headerShown:false}}/>
        <Stack.Screen name="[mainName]" options={{headerShown:false}}/>
        <Stack.Screen name="subCat" options={{title: "opa" , headerBackTitle: "Back"}}/>

    </Stack>
    );
}