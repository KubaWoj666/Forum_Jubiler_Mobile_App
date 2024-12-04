import { View, Text, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router'
import ProductListItems from '@/components/products/ProductListItems';

const mainName = () => {
  const {mainName} = useLocalSearchParams();
  const [data, setData] = useState([])

  useEffect(() => {
    fetchData();
  }, [mainName]);

  const fetchData = async() => {
    try{
      const response = await fetch(`http://127.0.0.1:8000/api/generic/?is_for_sale=true&category=${mainName}`)
      const data = await response.json()
      
      setData(data)
    }catch(error){
      console.error("Error fetching data: ", error)
    }
  }

  return (
    <View>
      <FlatList  numColumns={2} data={data} keyExtractor={(item) => item.id} renderItem={({item}) => (
        <ProductListItems product={item}/>
      )}></FlatList>
    </View>
  )
}

export default mainName