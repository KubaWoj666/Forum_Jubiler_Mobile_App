import { View, Text, SafeAreaView, Image, StyleSheet, ImageBackground, Pressable, FlatList } from 'react-native';
import React, { useEffect, useState,  } from 'react';
import { Href, router } from 'expo-router';
import ProductListItems from '@/components/products/ProductListItems';
import  Ionicons  from '@expo/vector-icons/Ionicons';


const Index = () => {

  const handelPress = (url:Href) => {
    router.push(url);
  };

  const [data, setData] = useState({vintage: [], wedding: [], engagement: []});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [vintageResponse, weddingResponse, engagementResponse] = await Promise.all([
        fetch("http://127.0.0.1:8000/api/generic/?is_for_sale=true&category=Biżuteria Dawna&limit=4"),
        fetch("http://127.0.0.1:8000/api/generic/?is_for_sale=true&category=Ślub i Zaręczyny&sub_category=Obrączki&limit=4"),
        fetch("http://127.0.0.1:8000/api/generic/?is_for_sale=true&category=%C5%9Alub%20i%20Zar%C4%99czyny&sub_category=Pier%C5%9Bcionki%20Zar%C4%99czynowe&limit=4")
      ]);
      const vintage = await vintageResponse.json();
      const wedding = await weddingResponse.json();
      const engagement = await engagementResponse.json()
      setData({vintage, wedding, engagement});
      console.log(data.vintage)
      setLoading(false);

    } catch (error) {
      console.error("Error fetching data: ", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView>
      <FlatList 
        data={data.vintage}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => <ProductListItems product={item}/>}
        ListHeaderComponent={(
          <>
            <ImageBackground 
              source={require('@/assets/banners/kobita3.jpg')}
              style={styles.topBgImage}
            >
              <View style={styles.overlay}>
                <Image style={styles.logo} source={require('@/assets/banners/logo1.png')} />
              </View>
            </ImageBackground>

            <Pressable onPress={() => handelPress("/(tabs)/products")}
              style={({ pressed }) => [
                {
                  transform: pressed ? [{ scale: 0.99 }] : [{ scale: 1 }],
                  opacity: pressed ? 0.8 : 1,
                },
              ]}>
              <ImageBackground 
                source={require('@/assets/banners/sk-biz2.webp')}
                style={styles.backgroundImage}
              />
            </Pressable>

            <Pressable onPress={() => handelPress("/(tabs)/products")}
              style={({ pressed }) => [
                {
                  transform: pressed ? [{ scale: 0.99 }] : [{ scale: 1 }],
                  opacity: pressed ? 0.8 : 1,
                },
              ]}>
              <ImageBackground 
                source={require('@/assets/banners/sk-z3.webp')}
                style={styles.backgroundImage}
              />
            </Pressable>

            <Pressable onPress={() => handelPress("/(tabs)/products")}
              style={({ pressed }) => [
                {
                  transform: pressed ? [{ scale: 0.99 }] : [{ scale: 1 }],
                  opacity: pressed ? 0.8 : 1,
                },
              ]}>
              <ImageBackground 
                source={require('@/assets/banners/sk-br.webp')}
                style={styles.backgroundImage}
              />
            </Pressable>

            <Text style={styles.title}>Biżuteria Vintage</Text>
          </>
        )}
        ListFooterComponent={(
          <>
          <ImageBackground 
            source={require('@/assets/banners/prezent.jpeg')} // Dodaj swój obrazek
            style={styles.footerBackgroundImage}
          >
          </ImageBackground>
          
          <Text style={styles.title}>Ślub</Text>
          <FlatList numColumns={2} data={data.wedding} 
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => (<ProductListItems product={item}></ProductListItems>)}>
          </FlatList>

          <ImageBackground 
            source={require('@/assets/banners/slub1.jpg')} // Dodaj swój obrazek
            style={styles.footerBackgroundImage}
          >
          </ImageBackground>
          <ImageBackground 
            source={require('@/assets/banners/zar4.jpg')} // Dodaj swój obrazek
            style={styles.footerBackgroundImage}
          >
          </ImageBackground>
          <Text style={styles.title}>Pierścionki Zaręczynowe</Text>
          
          <FlatList data={data.engagement} numColumns={2} keyExtractor={(item) => item.id}
                    renderItem={({item}) => (<ProductListItems product={item}></ProductListItems>)}>
          </FlatList>
          
          <ImageBackground 
            source={require('@/assets/banners/ekspert.jpeg')} // Dodaj swój obrazek
            style={styles.footerBackgroundImage}
          >
          </ImageBackground>
          
          
          </>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topBgImage: {
    width: '100%',
    height: 300,
    justifyContent: 'center',
    marginBottom: 5,
  },
  backgroundImage: {
    width: '100%',
    height: 300,
    marginBottom: 5,
  },
  footerBackgroundImage: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  overlay: {
    position: 'absolute',
    top: 10,
    left: 40,
    width: 80,
    height: 80,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  footerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Index;
