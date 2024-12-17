import { View, Text, Image, StyleSheet, Pressable, FlatList, } from 'react-native';
import React, {useEffect, useState} from 'react';
import { Link} from 'expo-router'; 
import MainCategoriesList from '@/components/categories/MainCategoriesList';
import { SafeAreaView } from 'react-native-safe-area-context';

const Modal = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async() => {
        try{
            const response = await fetch("http://127.0.0.1:8000/api/main-categories")
            const data = await response.json()
            setData(data)
        
        }catch(error){
            console.error("Error fetching data: ", error)
        }
    }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList style={styles.text}  data={data} keyExtractor={(item) => item.id} renderItem={({item}) => <MainCategoriesList  mainCategory={item}/>} 
      ListHeaderComponent={(
        <>
          <Link href={"/(tabs)"} asChild >
            <Pressable>
              <Image style={styles.logo} source={require("../assets/banners/logo1.png")} />
            </Pressable>
           </Link>
        </>
      )}>

      </FlatList>
    </SafeAreaView>
    // <View style={styles.container}>
    //   <Image style={styles.logo} source={require("../assets/banners/logo1.png")} />
    //     <View style={styles.line}/>
    //     <View>
    //     <Link href="/(tabs)" asChild>
    //         <Pressable >
    //         <Text style={styles.text}>Home</Text>
    //         </Pressable>
    //     </Link>

    //     <Link href="/(tabs)" asChild>
    //         <Pressable >
    //         <Text style={styles.text}>Home</Text>
    //         </Pressable>
    //     </Link>

    //     <Link href="/(tabs)" asChild>
    //         <Pressable >
    //         <Text style={styles.text}>Home</Text>
    //         </Pressable>
    //     </Link>

    //     <Link href="/(tabs)" asChild>
    //         <Pressable >
    //         <Text style={styles.text}>Home</Text>
    //         </Pressable>
    //     </Link>

    //     <Link href="/(tabs)" asChild>
    //         <Pressable >
    //         <Text style={styles.text}>Home</Text>
    //         </Pressable>
    //     </Link>
    //     </View>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    
  },
  logo: {
    width: 100,
    resizeMode: "contain",    
  },

  line: {
    height: 2, 
    backgroundColor: '#d3d3d3', 
    width: '100%', 
  },

  text: {
    fontSize: 18,
    color: "#303470",
  },
});

export default Modal;
function useSrate(arg0: never[]): [any, any] {
    throw new Error('Function not implemented.');
}

