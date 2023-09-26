import { View, Text, Image, Dimensions } from "react-native";
import React from "react";
import logo from "../../assets/images/logo.png";
import { SafeAreaView } from "react-native-safe-area-context";

const Header = () => {
  // Get the screen dimensions
  const screenWidth = Dimensions.get("window").width;

  // Calculate the logo width and height dynamically
  const logoWidth = screenWidth * 0.9; // 90% of the screen width
  const logoHeight = (logoWidth / 600) * 150; // Assuming the original image width is 600 and height is 80

  return (
    <View style={{ marginBottom: "5%", alignItems: "center" }}>
      <Image style={{ height: logoHeight, width: logoWidth }} source={logo} />
    </View>
  );
};

export default Header;
