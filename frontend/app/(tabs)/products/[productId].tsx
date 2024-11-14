import { View, Text,  Image, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState , useRef} from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import ProductListItems from '@/components/products/ProductListItems';
import AsyncStorage from '@react-native-async-storage/async-storage';


const productId = () => {
  const { productId } = useLocalSearchParams();  
  const [data, setData] = useState({detailProd: [], sameCatProd: []});
  const [viewedItems, setViewedItems] = useState([]);
  const [mainImage, setMainImage] = useState(null);

  const flatListRef = useRef(null);

  // Funkcja przewijająca na początek listy
  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

 

  useEffect(() => {
    const fetchDataAndViewedItems = async () => {
      await fetchData(); // Pobranie danych produktu
      await fetchViewedProducts()
    };
  
    fetchDataAndViewedItems();
  }, [productId]);
  const fetchData = async () => {
    try {
      const response  = await fetch(`http://127.0.0.1:8000/api/detail/${productId}/`)
      const detailProd = await response.json();
      addItemToViewed(detailProd.id)
      const [ sameCatProdResponse] = await Promise.all([
        
        fetch(`http://127.0.0.1:8000/api/generic/?is_for_sale=true&category=${detailProd.category.main_cat_name.main_name}&sub_category=${detailProd.category.category_name}`),
      ]) 
      
      const sameCatProd = await sameCatProdResponse.json();
      setData({detailProd, sameCatProd});

      // Ustaw domyślne główne zdjęcie
      if (detailProd && detailProd.images && detailProd.images.length > 0) {
        setMainImage(detailProd.images[0].image);
      }

    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };


  const addItemToViewed = async (productId) =>{
    try{
      const viewedItems = await AsyncStorage.getItem('viewedItems');
      const viewedItemsArray = viewedItems ? JSON.parse(viewedItems) : [];

      if (!viewedItemsArray.includes(productId)){
        viewedItemsArray.push(productId)
      }

      if (viewedItemsArray.length > 4) {
        viewedItemsArray.shift(); 
      }

      await AsyncStorage.setItem('viewedItems', JSON.stringify(viewedItemsArray));

    }catch (error) {
      console.error("Error saving viewed item:", error);
    }
  
  }


  const getViewedItems = async () => {
    try {
      const viewedItems = await AsyncStorage.getItem('viewedItems');
      return viewedItems ? JSON.parse(viewedItems) : [];
    } catch (error) {
      console.error("Error retrieving viewed items:", error);
      return [];
    }
  };

  const fetchViewedProducts = async() => {
    const ids = await getViewedItems();
    const viewedProducts = await Promise.all((
      ids.map(async(id) => {
        const response = fetch(`http://127.0.0.1:8000/api/detail/${id}/`)
        return (await response).json()
      })
    ))
    setViewedItems(viewedProducts)
  }


  

  if (!data.detailProd || !data.detailProd.images || data.detailProd.images.length === 0) {
    return <Text>Loading...</Text>;
  }

  // Delete Products from AsyncStorage
  // AsyncStorage.removeItem("viewedItems")

  return (
    <SafeAreaView>
      
      <FlatList data={data.sameCatProd} numColumns={2} keyExtractor={(item) => item.id}
                    renderItem={({item}) => (<ProductListItems product={item}></ProductListItems>)}
                
                ListHeaderComponent={(
                  <>
                  <Image style={styles.image} source={{ uri: mainImage }} />

                  <View style={styles.smallImagesContainer} >
                    {data.detailProd.images.map((image, index) => (
                      <TouchableOpacity key={index} onPress={() => setMainImage(image.image)}>
                        <Image style={styles.smallImage} source={{ uri: image.image }} />
                      </TouchableOpacity>
                    ))}
                  </View>

                  <View style={styles.container} >
                    <Text style={styles.title}>{data.detailProd.name}</Text>
                    <Text style={styles.span}>INDEKS: {data.detailProd.inside_number}</Text>
                    <Text style={styles.price}>{data.detailProd.sale_price}zł</Text>
                    <Text style={styles.description}>{data.detailProd.description}</Text>
                  </View>

                  <View style={styles.moreInfo}>
                    <View style={styles.column}>
                      <Text style={styles.colTile}>Rodzaj Kamenia: <Text style={styles.prodInfo}>{data.detailProd.stone}</Text></Text>
                      <Text style={styles.colTile}>Wykończenie: <Text style={styles.prodInfo}>{data.detailProd.setting}</Text></Text>
                    </View>

                    <View style={styles.column}>
                      <Text style={styles.colTile}>Masa: <Text style={styles.prodInfo}>{data.detailProd.weight}g</Text></Text>
                      <Text style={styles.colTile}>Kategoria: <Text style={styles.prodInfo}>{data.detailProd.category.main_cat_name.main_name} - {data.detailProd.category.category_name}</Text></Text>
                    </View>
                  </View>

                  <View>
                    <Text>Produkty z tej samej kategorii</Text>
                  </View>
                  </>
                  
                )}
                ListFooterComponent={(
                  <>
                  <View>
                    <Text>Wcześniej ogladane</Text>
                  </View>  
                  <FlatList data={viewedItems} numColumns={2} keyExtractor={(item) => item.id.toString()}
                  renderItem={({item}) => (<ProductListItems onPress={scrollToTop} product={item}></ProductListItems>)}

                  >

                  </FlatList>
                  </>
                )}
              
                >
                
      </FlatList>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    // height: 500,
  },

  image: {
    width: "100%",
    height: 400,
    resizeMode: "cover"
  },

  smallImagesContainer: {
    marginTop: 5,
    flex: 1,
    flexDirection: "row",
    height: 110
  },

  smallImage: {
    width: 100,
    height: 100,
  },

  container: {
    padding: 10,
  },

  title: {
    fontSize: 30,
    fontWeight: 400,
  },

  span: {
    fontSize: 10,
    color: "#c29958"
  },

  price: {
    fontSize: 20,
    marginTop: 10,
  },

  description: {
    marginTop: 10,
    fontSize: 15,
  },

  moreInfo: {
    flexDirection: 'row',    
    flexWrap: 'wrap',        
    justifyContent: 'space-between', 
    marginVertical: 10,
    padding: 10,
  },
  column: {
    marginTop: 10,
    width: '45%',           
    marginBottom: 10,       
  },

  colTile: {
    fontSize: 10
  },

  prodInfo: {
    fontSize: 15,
    fontWeight: 200,
    color: "#c29958",
  },

});
export default productId;
