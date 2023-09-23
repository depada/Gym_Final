import { View, Text } from "react-native";
import React from "react";
import { Form } from "../Components";

const AddMember = ({ navigation }) => {
  return (
    <View>
      <Form navigation={navigation} />
    </View>
  );
};

export default AddMember;
