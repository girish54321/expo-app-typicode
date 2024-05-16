import React, { useEffect, useState, useMemo } from "react";
import {
  FlatList,
  Text,
  View,
  Button,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import PostDetailsScreen from "../postDetailsScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <GestureHandlerRootView>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PostDetailsScreen" component={PostDetailsScreen} />
      </Stack.Navigator>
    </GestureHandlerRootView>
  );
}

const PostItem = ({ item, onTap }) => {
  return useMemo(
    () => (
      <TouchableOpacity
        onPress={() => {
          onTap(item.id);
        }}
        style={{ marginBottom: 20 }}
      >
        <Text style={{ fontSize: 18 }}>ID: {item.id}</Text>
        <Text style={{ fontSize: 16 }}>Title: {item.title}</Text>
      </TouchableOpacity>
    ),
    [item]
  );
};

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const perPage = 10;

  const onTap = (id: any) => {
    navigation.navigate("PostDetailsScreen", { id });
  };

  useEffect(() => {
    axios
      .get(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${perPage}`
      )
      .then((response) => {
        setPosts([...posts,...response.data]);
      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
      });
  }, [page]);

  const nextPage = () => {
    setPage(page + 1);
  };


  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
        Posts:
      </Text>
      <FlatList
        data={posts}
        onEndReached={nextPage}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PostItem item={item} onTap={onTap} />}
      />
    </SafeAreaView>
  );
};
