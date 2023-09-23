import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";

const ConclusionText = ({ statusCode }) => {
  console.log("statusCodefromConclusionText==>", statusCode);
  return (
    <View style={{ alignItems: "center" }}>
      {statusCode ? (
        <>
          <Text
            style={{
              fontSize: 40,
              fontWeight: "bold",
              color: "#f0c38e",
            }}
          >
            User Created Successfully
          </Text>
          <MaterialIcons
            style={{ marginTop: "10%" }}
            name="done-outline"
            size={70}
            color="#f0c38e"
          />
        </>
      ) : (
        <>
          <Text
            style={{
              fontSize: 40,
              fontWeight: "bold",
              color: "#f0c38e",
            }}
          >
            We encountered an Error
          </Text>
          <MaterialIcons
            style={{ marginTop: "10%" }}
            name="error-outline"
            size={70}
            color="#f0c38e"
          />
        </>
      )}
    </View>
  );
};

export default ConclusionText;
