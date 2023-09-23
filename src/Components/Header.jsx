import { View, Text, Image } from "react-native";
import React from "react";
import logo from "../../assets/images/logo.png";
import { SafeAreaView } from "react-native-safe-area-context";

const Header = () => {
  return (
    <View style={{ marginBottom: "10%", alignItems: "center" }}>
      <Image style={{ height: 80, width: "90%" }} source={logo} />
    </View>
  );
};

export default Header;
