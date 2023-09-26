// EditUserScreen.js
import React from "react";
import { View } from "react-native";
import { useRoute } from "@react-navigation/native";
import EditUser from "../Components/EditUser.jsx";

const EditUserScreen = ({ navigation }) => {
  const route = useRoute();
  const item = route.params?.item; // Access the item parameter

  return (
    <View>
      <EditUser data={item ? item : []} navigation={navigation} />
    </View>
  );
};

export default EditUserScreen;
