import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;


const Product = ({item}) => {
    console.log("each products>>>>>",item);
  return (
    <View style={styles.container}>
      <Text>Product</Text>
    </View>
  )
}

export default Product

const styles = StyleSheet.create({
    container: {
    //   position: "absolute",
    //   justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 10,
      paddingVertical: 20,
      width: 200,
      height: 160,
      borderWidth:1,
      borderColor: "grey"
    },
  });
  