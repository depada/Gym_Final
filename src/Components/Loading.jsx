import { View } from "react-native";
import React from "react";
import loadingAnimation from "../../assets/animations/addEntryAnimation.json";
import LottieView from "lottie-react-native";

const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <LottieView source={loadingAnimation} autoPlay loop />
    </View>
  );
};

export default Loading;
