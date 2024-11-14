import { View, Text, TouchableOpacity, Pressable, Image, StyleSheet } from 'react-native'
import React from 'react'
import { Product } from '@/types'
import { Link } from 'expo-router'

type ProductProps = {
    product: Product

}

const ProductListItems = ({product, onPress}: ProductProps, ) => {

  return (
    <Link href={`/(tabs)/products/${product.id}`} asChild>
  <Pressable onPress={onPress} style={styles.card}>
    {product.images && Array.isArray(product.images) && product.images.length > 0 ? (
      <Image style={styles.image} source={{ uri: product.images[0].image }} />
    ) : (
      <Text>No Image Available</Text>
    )}
    <Text style={styles.name}>{product.name}</Text>
    <Text>{product.sale_price} zł</Text>
  </Pressable>
</Link>
  )
}

const styles = StyleSheet.create({
    card: {
        width: 180,
        height: 220, // Zwiększona wysokość karty, by pomieścić tekst i obraz
        padding: 5,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        margin: 5,  // Odstępy między kartami
        shadowColor: '#000',  // Dodanie cienia, by karty były bardziej widoczne
        shadowOffset: { width: 0, height: 0.5 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 3,
      },

    image: {
        padding: 20,
        // height:"auto",
        width: "100%",
        height: "80%",
        resizeMode: "cover",
        borderRadius: 20
    },

    name: {
        marginTop: 2,
        fontWeight: "500",
        textAlign: "center", 
    }
})

export default ProductListItems