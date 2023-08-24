import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import Product from "../components/Product";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const Home = () => {
  const [input, setInput] = useState("");
  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let res = await fetch("https://dummyjson.com/products");
      let data = await res.json();
    //   console.log("data is here------->>>>>>>>>>>>",data);
      setProduct(data.products);
    } catch {
      console.log(err);
    }
  };

  const searchProducts = (text) => {
   
  }

  return (
    <View>
      <ImageBackground
        source={require("../assets/image2.jpg")}
        style={styles.imageBox}
        imageStyle={{ opacity: 0.5, backgroundColor: "black" }}
      />
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 20,
            color: "white",
            marginVertical: 10,
            textAlign: "center",
          }}
        >
          This is An Ecommerce App
        </Text>
        <View style={styles.searchBox}>
          <TextInput
            placeholder="Search Your products"
            placeholderTextColor="white"
            onChangeText={prev => {setInput(prev); searchProducts(prev)}}
            value={input}
            style={{
              color: "white",
              paddingHorizontal: 5,
              fontSize: 16,
              width: 210,
            }}
          />
          <TouchableOpacity onPress={() => {}}>
            <AntDesign name="search1" size={22} color="white" />
          </TouchableOpacity>
        </View>
        <FlatList
          style={{marginVertical:10}}
          showsVerticalScrollIndicator={false}
          data={product}
          renderItem={({ item }) => <Product item={item} />}
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    // justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 20,
    width: deviceWidth,
    height: deviceHeight,
  },
  searchBox: {
    width: deviceWidth / 1.08,
    height: 56,
    borderWidth: 1,
    borderRadius: 7,
    borderColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  imageBox: {
    width: deviceWidth,
    height: "100%",
  },
});
