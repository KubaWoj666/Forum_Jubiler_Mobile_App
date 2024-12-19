
import { Ionicons } from "@expo/vector-icons";
import {Stack, router } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';


export default function MenuStack() {
    return (
    <Stack>
        <Stack.Screen name="index" options={{headerShown:false}}/>
        <Stack.Screen
        name="[productId]"
        options={{
          title: "",
          headerLeft: () => (
            <Ionicons
              name={"arrow-back"}
              size={25}
              color="black"
              onPress={() => router.back()}
            />
          ),
        }}
      />
    </Stack>
    );
}