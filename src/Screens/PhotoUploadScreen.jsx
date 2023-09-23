import { View, Text } from "react-native";
import React from "react";
import { CameraScreen } from "../Components";

const PhotoUploadScreen = ({ navigation }) => {
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <CameraScreen navigation={navigation} />
      {/* <Text>HI</Text> */}
    </View>
  );
};

export default PhotoUploadScreen;
