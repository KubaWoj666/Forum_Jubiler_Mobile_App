import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import React, {useEffect, useState} from 'react';
import { Link} from 'expo-router'; 
import { FlatList } from 'react-native-gesture-handler';

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
            console.log(data)
        }catch(error){
            console.error("Error fetching data: ", error)
        }
    }

  return (
    <FlatList data={data} renderItem={undefined} >
        
    </FlatList>
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

