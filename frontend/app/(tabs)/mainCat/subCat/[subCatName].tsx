import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState} from 'react'
import { useLocalSearchParams } from 'expo-router'
import ProductListItems from '@/components/products/ProductListItems'
import {Stack } from "expo-router";

const subCatName = () => {

    const {subCatName, mainName} = useLocalSearchParams()
    const [data, setData] = useState([])

    

    useEffect(() => {
        fetchData();
      },[subCatName, mainName]);

    const fetchData = async() => {
        try{
            const response = await fetch(`http://127.0.0.1:8000/api/generic/?category=${mainName}&sub_category=${subCatName}`)
            const  data = await response.json()
            setData(data)
            
        }
        catch (error)
        {
            console.error("Error fetching data: ", error)
        }
    }
    
    
  return (
    <View>
      <FlatList data={data} numColumns={2} keyExtractor={(item) => item.id}
                    renderItem={({item}) => (<ProductListItems product={item}></ProductListItems>)}></FlatList>

    </View>
  )
}

export default subCatName