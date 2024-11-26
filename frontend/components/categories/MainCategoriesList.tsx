import { View, Text, Pressable, StyleSheet, } from 'react-native'
import React from 'react'
import { MainCategory } from '@/types'
import { Link } from 'expo-router'


type MainCategoryProps = {
  mainCategory: MainCategory
}

const MainCategoriesList = ({mainCategory}: MainCategoryProps) => {
  return (
    <Link href={`/(tabs)/`} asChild>
      <Pressable >
        <Text style={styles.text}>{mainCategory.main_name}</Text>
      </Pressable>
      </Link>

  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: "#303470",
    marginTop: 2
  },
})


export default MainCategoriesList