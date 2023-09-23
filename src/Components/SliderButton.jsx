import { View, Text, PanResponder, Animated, Dimensions } from "react-native";
import React, { useState } from "react";
import { FontAwesome, FontAwesome5, AntDesign } from "@expo/vector-icons";
import { globalStyles } from "../../Styles/GlobalStyles";

const { height } = Dimensions.get("window");

export const shadowStyle = {
  shadowColor: "#000000",
  elevation: 40,
};

const SliderButton = ({ navigation }) => {
  const [slideDirection, setSlideDirection] = useState("");
  const { landingScreenStyles } = globalStyles;

  const slideAnim = new Animated.Value(0);

  const slideUp = (gestureState) => {
    if (gestureState && gestureState.dy) {
      const slideDistance = -150;
      const newSlideValue = Math.max(
        -height * 0.35,
        Math.min(slideDistance, height * 0.35)
      );

      Animated.spring(slideAnim, {
        toValue: newSlideValue,
        stiffness: 200,
        damping: 20,
        useNativeDriver: false,
      }).start(() => {
        setSlideDirection("up");
      });
    }
  };

  const slideDown = (gestureState) => {
    if (gestureState && gestureState.dy) {
      const slideDistance = Math.min(gestureState.dy * 2, 150);
      const newSlideValue = Math.max(
        -height * 0.35,
        Math.min(slideDistance, height * 0.35)
      );

      Animated.spring(slideAnim, {
        toValue: newSlideValue,
        stiffness: 200,
        damping: 20,
        useNativeDriver: false,
      }).start(() => {
        setSlideDirection("down");
      });
    }
  };

  const resetCirclePosition = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      setSlideDirection("");
    });
  };

  const isCircleAt75Percent = () => {
    return slideAnim._value >= 100 || slideAnim._value <= -100;
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,

    onPanResponderMove: (_, gestureState) => {
      if (gestureState.dy < -10) {
        slideUp(gestureState);
      } else if (gestureState.dy > 10) {
        slideDown(gestureState);
      }
    },

    onPanResponderRelease: () => {
      if (isCircleAt75Percent()) {
        if (slideDirection === "up") {
          navigation.navigate("AddMemberScreen");
        } else if (slideDirection === "down") {
          navigation.navigate("ViewMembersScreen");
        }
      }

      resetCirclePosition();
    },
  });

  return (
    <View
      key={"capsule"}
      style={landingScreenStyles.sliderButtonContainer}
      {...panResponder.panHandlers}
    >
      <View style={landingScreenStyles.sliderButtonContent}>
        <Text style={landingScreenStyles.sliderButtonText}>Add</Text>
        <Text style={landingScreenStyles.sliderButtonText}>User</Text>
        <AntDesign
          style={{ zIndex: 1 }}
          name="pluscircleo"
          size={24}
          color="#f0c38e"
        />
        <FontAwesome5 name="angle-double-up" size={40} color="#83898D" />
        <Animated.View
          key={"circle"}
          style={{
            width: 110,
            borderColor: "#f0c38e",
            borderWidth: 1,
            height: 110,
            borderRadius: 55,
            backgroundColor: "#48426D",
            ...shadowStyle,
            transform: [
              {
                translateY: slideAnim,
              },
            ],
          }}
        ></Animated.View>

        <FontAwesome5 name="angle-double-down" size={40} color="#83898D" />
        <View
          style={{
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Text style={landingScreenStyles.sliderButtonText}>View</Text>
          <Text style={landingScreenStyles.sliderButtonText}>Users</Text>
          <FontAwesome name="list-ul" size={24} color="#f0c38e" />
        </View>
      </View>
    </View>
  );
};

export default SliderButton;
