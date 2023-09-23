import LottieView from "lottie-react-native";
import { View, Text, Image } from "react-native";
import logoAnimation from "../../assets/animations/addEntryAnimation.json";
import { globalStyles } from "../../Styles/GlobalStyles";
import { Button, Loading, SliderButton } from "../Components";
import logoImg from "../../assets/images/logo.png";
import { SafeAreaView } from "react-native-safe-area-context";

const LandingScreen = ({ navigation }) => {
  const { landingScreenStyles } = globalStyles;
  return (
    <SafeAreaView style={landingScreenStyles.container}>
      <View style={landingScreenStyles.imgContainer}>
        <Image style={{ height: 73, width: 303 }} source={logoImg} />
      </View>

      <View style={{ justifyContent: "flex-start", alignItems: "center" }}>
        <SliderButton navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

export default LandingScreen;
