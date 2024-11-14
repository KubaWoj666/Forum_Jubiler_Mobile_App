import { View, Text, SafeAreaView, Image, StyleSheet, Button, TouchableOpacity} from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const index = () => {
  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Image source={require('@/assets/banners/logo.png')}/>
      </View>
      <View>
      <TouchableOpacity  onPress={() => router.push("/(tabs)")} >
        <Text>Get Started</Text>
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  header: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#102b40"
  },
})

export default index