import React, { useState } from "react";
import { Image, Text, TextInput, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "./Button";
import { useAppContext } from "../Context/AppContext";
import Loading from "./Loading";
import { createUser } from "../Firebase/firebaseOperations";
import { storeImage } from "../Firebase/storeImage";
import { globalStyles } from "../../Styles/GlobalStyles";
import { formatDate } from "../../utils";
const CameraScreen = ({ navigation }) => {
  const { state, updateField, isLoading, resetForm } = useAppContext();
  const [error, setError] = useState("");

  const { formStyles } = globalStyles.addMemberScreenStyles;

  const { selectedImage, amountPaid } = state;
  console.log("amount==>", amountPaid);

  // const handleValidation = (data) => {
  //   setError("");
  //   if (data == 0 || isNaN(data)) {
  //     setError("Please enter a valid amount");
  //   }
  //   updateField("amount", data);
  // };
  // const handleValidation = (data) => {
  //   setError("");

  //   if (!data.trim()) {
  //     setError("Please enter a valid amount");
  //   } else if (/^0+$|^0+\s|0+\s\d+/.test(data) || isNaN(data)) {
  //     setError("Please enter a valid amount");
  //   } else {
  //     updateField("amount", data);
  //   }
  //   updateField("amount", data);
  // };
  // const handleValidation = (data) => {
  //   setError("");

  //   if (!data.trim()) {
  //     setError("Please enter a valid amount");
  //   } else if (/^0+$|^0+\s|0+\s\d+/.test(data) || isNaN(data)) {
  //     setError("Please enter a valid amount");
  //   } else {
  //     updateField("amountPaid", data); // Update amountPaid, not amount
  //   }
  // };
  const handleValidation = (data) => {
    setError("");

    if (!data.trim()) {
      setError("Please enter a valid amount");
    } else if (/^0\d*$/.test(data) || isNaN(data)) {
      setError("Please enter a valid amount");
    } else {
      updateField("amountPaid", data); // Update amountPaid, not amount
      setError("");
    }
  };

  const handleImageSelection = async (uri) => {
    // Create a Blob object from the local file
    const response = await fetch(uri);
    const blob = await response.blob();

    try {
      const cloudAddress = await storeImage(
        blob,
        `${state.name}_${state.admissionNumber}.jpg` // Provide a file extension
      );
      console.log("cloudAddress==>", cloudAddress);
      updateField("selectedImage", cloudAddress);
    } catch (error) {
      console.error("Error storing image:", error);
    }
  };

  const openImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (pickerResult.canceled === true) {
      return;
    }

    // Update the context with the selected image
    handleImageSelection(pickerResult.assets[0].uri);
  };

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access the camera is required!");
      return;
    }

    const cameraResult = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3], // You can adjust the aspect ratio as needed.
    });

    if (cameraResult.canceled === true) {
      return;
    }
    handleImageSelection(cameraResult.assets[0].uri);
  };

  const handleUploadData = async () => {
    // console.log("date==>", formatDate(state.joiningDate));
    if (error && error.trim().length > 0) {
      alert(error);
    } else {
      updateField("isLoading", true);
      try {
        const userData = {
          name: state["name"],
          admissionNumber: state["admissionNumber"],
          joiningDate: formatDate(state["joiningDate"]),
          address: state["address"],
          phoneNumber: state["phoneNumber"],
          lastMonthPaid: formatDate(state["lastMonthPaid"]),
          subscriptionPeriod: state["subscriptionPeriod"],
          selectedOption: state["selectedOption"],
          amountPaid: state["amountPaid"],
          selectedImage: state["selectedImage"],
        };
        const createUserRes = await createUser(userData);
        updateField("userCreationCode", createUserRes);

        console.log("createUserRes==>", createUserRes);
        updateField("isLoading", false);
        if (createUserRes) {
          navigation.navigate("ConclusionScreen");
          resetForm();
        }
      } catch (error) {
        console.error("Error creating user:", error);
        updateField("isLoading", false);
      }
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#48426D",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {selectedImage && (
            <View
              style={{
                width: "100%",
                height: "70%",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                // source={}
                src={selectedImage}
                style={{ width: "90%", height: "50%" }}
                resizeMode="contain"
              />
              <Text style={{ color: "#f0c38e" }}>Amount Paid</Text>

              <TextInput
                style={{
                  width: "90%",
                  height: "10%",
                  borderWidth: 1,
                  borderColor: "#f0c38e",
                  borderRadius: 40,
                  padding: 10,
                  color: "#f0c38e",
                }}
                value={amountPaid}
                label="amount"
                keyboardType="numeric"
                onChangeText={(data) => {
                  handleValidation(data);
                  updateField("amountPaid", data); // Update the state with the new value
                }}
              />

              {error ? (
                <Text style={formStyles.errorStyle}>{error}</Text>
              ) : null}
            </View>
          )}
          <View>
            <Button
              width={200}
              height={50}
              label="Open Gallery"
              onPress={openImagePicker}
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <Button
              width={200}
              height={50}
              label="Open Camera"
              onPress={openCamera}
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <Button
              width={200}
              height={50}
              label="Submit"
              onPress={handleUploadData}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default CameraScreen;
