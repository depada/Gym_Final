import React, { useState } from "react";
import { View, Text, Pressable, Platform } from "react-native";

function Button({ label, onPress, width, height }) {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  const shadowStyle =
    Platform.OS === "ios"
      ? {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.5,
          shadowRadius: 4,
        }
      : {
          elevation: isPressed ? 0 : 40,
        };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      style={({ pressed }) => [
        {
          height: height ? height : 50,
          width: width ? width : "50%",
          borderRadius: 30,
          borderWidth: 1,
          justifyContent: "center",
          borderColor: "#f0c38e",
          alignItems: "center",
          backgroundColor: pressed ? "#f0c38e" : "transparent",
          ...shadowStyle,
        },
      ]}
    >
      {({ pressed }) => (
        <Text
          style={{
            color: pressed ? "white" : "#f0c38e",
            fontSize: 25,
            fontWeight: "800",
          }}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
}

export default Button;
