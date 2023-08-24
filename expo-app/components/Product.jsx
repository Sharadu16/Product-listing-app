import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native";
import React from "react";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const Product = ({ item }) => {
  console.log("each products>>>>>", item);
  return (
    <View style={styles.container}>
      {item ? (
        <TouchableOpacity style={styles.card}>
          <View style={styles.ImageBox}>
            <Image
              style={{ width: "100%", height: "100%", borderRadius: 10 }}
              source={{ uri: item.thumbnail }}
            />
          </View>
          <View style={styles.infoBox}>
            <Text style={{ fontSize: 18, color: "#2F539B",fontWeight: "500", }}>{item.title}</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: 10,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "grey",
                  fontWeight: "500",
                  fontSize: 16,
                }}
              >
                {item.category}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ color: "teal" }}>Brand : </Text>
                <Text
                  style={{
                    textAlign: "center",
                    color: "gray",
                    fontSize: 14,
                    fontWeight: "500",
                  }}
                >
                  {item.brand}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  textAlign: "center",
                  color: "green",
                  fontWeight: "700",
                }}
              >
                {" "}
                $ {item.price}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  textAlign: "center",
                  color: "orange",
                  fontWeight: "700",
                  paddingVertical: 5,
                }}
              >
                {item.rating} ⭐
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 20,
    width: deviceWidth / 1.08,
    height: "auto",
    // borderWidth: 1,
    borderColor: "grey",
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 5,
    borderRadius: 12,
    backgroundColor: "#F8F8FF",
  },
  card: {
    width: deviceWidth / 1.1,
    height: "auto",
    // borderWidth: 1,
    borderColor: "red",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ImageBox: {
    width: "25%",
    height: 120,
    // borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
  },
  infoBox: {
    width: "72%",
    height: 120,
    // borderWidth: 1,
    borderColor: "white",
  },
});
