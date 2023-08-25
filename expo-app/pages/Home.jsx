import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  Pressable,
  Alert,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import Product from "../components/Product";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  addProducts,
  sortProducts,
} from "../redux-toolkit/store/slices/ProductSlice";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const Home = () => {
  const [input, setInput] = useState("");
  const [product, setProduct] = useState([]);
  const [oldData, setOldData] = useState([]);
  const [ind, setInd] = useState(0);
  const listRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();
  const listData = useSelector((state) => state.product.list);

  useEffect(() => {
    fetchData();
    // console.log("redux-data------------------->>",listData);
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      let res = await fetch("https://dummyjson.com/products");
      let data = await res.json();
      // console.log("data is here------->>>>>>>>>>>>",data);
      setProduct(data.products);
      dispatch(addProducts(data.products));
      setOldData(data.products);
      setIsLoading(false);
    } catch (err) {
      Alert.alert("Unhandled Promise rejected");
      console.log(err);
    }
  };

  const searchProducts = (text) => {
    if (text == "") {
      dispatch(addProducts(oldData));
    } else {
      let filterData = product.filter((item) => {
        return item.title.toLowerCase().indexOf(text.toLowerCase()) > -1;
      });
      dispatch(addProducts(filterData));
    }
  };

  const FilterTheProducts = (data) => {
    console.log("sorted data is ------------------------", data);
    dispatch(sortProducts(data));
  };

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
            color: "orange",
            marginVertical: 10,
            textAlign: "center",
            textTransform: "uppercase",
            marginVertical: 20,
            fontWeight: "bold",
          }}
        >
          This is An Ecommerce App
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={styles.searchBox}>
            <TextInput
              placeholder="Search Your products"
              placeholderTextColor="white"
              onChangeText={(prev) => {
                setInput(prev);
                searchProducts(prev);
              }}
              value={input}
              style={{
                color: "white",
                paddingHorizontal: 5,
                fontSize: 16,
                width: 210,
              }}
            />
            {input == "" ? (
              <TouchableOpacity onPress={() => {}}>
                <AntDesign name="search1" size={22} color="white" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setInput("");
                  searchProducts("");
                }}
              >
                <AntDesign name="close" size={22} color="white" />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
            onPress={() => {
              // setModalVisible(!modalVisible);
            }}
          >
            <AntDesign
              name="filter"
              size={42}
              color="white"
              style={{ left: 10 }}
            />
          </TouchableOpacity>
        </View>
        {/* loader added here to indicate that data is loading  */}
        <Loader loading={isLoading} />
        {/* open modal here to filter the products  */}
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <TouchableOpacity
                  onPress={() => {
                    let sortData = listData.sort((a, b) =>
                      a.title > b.title ? 1 : -1
                    );
                    // setProduct(sortData);
                    FilterTheProducts(sortData)
                    setModalVisible(!modalVisible);
                    listRef.current.scrollToIndex({ animated: true, index: 0 });
                  }}
                >
                  <Text style={styles.modalText}>Sort By Name</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    let sortData = product.sort((a, b) => a.price - b.price);
                    setProduct(sortData);
                    setModalVisible(!modalVisible);
                    listRef.current.scrollToIndex({ animated: true, index: 0 });
                  }}
                >
                  <Text style={styles.modalText}>Price Low To high</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    let sortData = product.sort((a, b) => b.price - a.price);
                    setProduct(sortData);
                    setModalVisible(!modalVisible);
                    listRef.current.scrollToIndex({ animated: true, index: 0 });
                  }}
                >
                  <Text style={styles.modalText}>Price High To Low</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    let sortData = product.sort((a, b) => b.rating - a.rating);
                    setProduct(sortData);
                    setModalVisible(!modalVisible);
                    listRef.current.scrollToIndex({ animated: true, index: 0 });
                  }}
                >
                  <Text style={styles.modalText}>Sort By Rating</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
        {/* modal has closed here   */}
        <FlatList
          showsVerticalScrollIndicator={false}
          initialScrollIndex={ind}
          ref={listRef}
          data={listData}
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
    width: deviceWidth / 1.26,
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

  // style for modal view //
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "lightgray",
    borderRadius: 10,
    paddingHorizontal: 90,
    paddingVertical: 20,
    alignItems: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: "teal",
  },
});
