import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import axios from "axios";

const PostDetailsScreen = ({ route }) => {
  const [post, setPost] = useState(null);
  const { id } = route.params;

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        console.log("Error fetching post details: ", error);
      });
  }, [id]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      {post ? (
        <View>
          <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
            Post Details
          </Text>
          <Text>ID: {post.id}</Text>
          <Text>Title: {post.title}</Text>
          <Text>Body: {post.body}</Text>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default PostDetailsScreen;
