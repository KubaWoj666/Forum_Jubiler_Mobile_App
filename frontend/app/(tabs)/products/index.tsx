import { View, Text, SafeAreaView, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import ProductListItems from '@/components/products/ProductListItems';

const index = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async() => {
    try{
      const response = await fetch("http://127.0.0.1:8000/api/generic/?is_for_sale=true")
      const data = await response.json();
      setData(data)
    }catch(error){
        console.error("Error fetching data: ", error)
    }
    

  }
  return (
    <SafeAreaView style={styles.screen}>
      <FlatList  numColumns={2} data={data} keyExtractor={(item) => item.id} renderItem={({item}) => (
        <ProductListItems product={item}/>
      )}></FlatList>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen:{
    justifyContent: "space-around",
    alignItems: "center"
  }
})

export default index