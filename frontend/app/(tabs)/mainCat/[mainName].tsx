import { View, Text, FlatList, SafeAreaView, StyleSheet, Pressable, } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Link, router, useLocalSearchParams } from 'expo-router'
import ProductListItems from '@/components/products/ProductListItems';
import {Stack } from "expo-router";

const mainName = () => {

  const {mainName} = useLocalSearchParams();
  const [data, setData] = useState({products: [], subCategories: []})

  useEffect(() => {
    fetchData();
  }, [mainName]);

  const fetchData = async() => {
    try{
      const [productsResponse, subCategoriesResponse] =  await Promise.all([
        fetch(`http://127.0.0.1:8000/api/generic/?is_for_sale=true&category=${mainName}`),
        fetch(`http://127.0.0.1:8000/api/main-categories/?main_name=${mainName}`)
      ]) 
      const products = await productsResponse.json()
      const subCategories = await subCategoriesResponse.json()
      setData({products, subCategories})

    }catch(error){
      console.error("Error fetching data: ", error)
    }
  }



  return (
    <SafeAreaView style={styles.container}>
    {/* Główna lista produktów */}
    <FlatList
      numColumns={2}
      data={data.products}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <ProductListItems product={item} />}
      ListHeaderComponent={(
        <>
          
          <FlatList
            data={data.subCategories}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.categoryContainer}>
                <Text style={styles.mainCategory}>{item.main_name}</Text>
                
                
                <View style={styles.subCategoriesContainer}>
                  {item.sub_categories && item.sub_categories.map((subCategory) => (
                    <View key={subCategory.id} style={styles.subCategoryBox}>
                      <Pressable onPress={() => {router.push({pathname: "/(tabs)/mainCat/subCat/[subCatName]", params:{subCatName:subCategory.category_name, mainName: mainName }})}}>
                      <Text style={styles.subCategoryText}>
                        {subCategory.category_name}
                      </Text>
                      </Pressable>
                    </View>
                  ))}
                </View>
              </View>
            )}
          />
        </>
      )}
    />
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 10,
  },
  categoryContainer: {
    marginVertical: 10,
    alignItems: 'center', // Wyśrodkowanie w poziomie
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1.5,
    elevation: 3,
  },
  mainCategory: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  subCategoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Pozwala na zawijanie elementów
    justifyContent: 'center',
  },
  subCategoryBox: {
    margin: 5,
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: "#303470", // Jasny kolor tła
    borderRadius: 20, // Owalny kształt
    elevation: 2,
  },
  subCategoryText: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
  },
});

export default mainName