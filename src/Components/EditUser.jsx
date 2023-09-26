import React, { useEffect, useState } from "react";
import { View, ScrollView, Image, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RadioGroup } from "react-native-radio-buttons-group";
import Button from "./Button";
import Header from "./Header";
import { globalStyles } from "../../Styles/GlobalStyles";
import FormElement from "./FormElement";
import { radioButtons } from "../../Constants/constants";
import { useAppContext } from "../Context/AppContext";
import { defaultImageSource } from "./ListCard";

const EditUser = ({ navigation, data }) => {
  const { formStyles } = globalStyles.addMemberScreenStyles;
  const { state, updateField } = useAppContext();

  const [user, setUser] = useState(data);
  const [errors, setErrors] = useState({
    nameError: "",
    addressError: "",
    admissionNumberError: "",
    subscriptionPeriodError: "",
    phoneNumberError: "",
  });

  const handleFieldChange = (field, value) => {
    setUser({ ...user, [field]: value });
    validateField(field, value);
  };

  const validateField = (field, value) => {
    // Validation logic for each field
    let error = "";

    if (field === "subscriptionPeriod") {
      if (
        isNaN(Number(value)) ||
        Number(value) < 1 ||
        Number(value) > 12 ||
        !value?.trim()
      ) {
        error = "Subscription period must be a number between 1 and 12";
      }
    } else if (field === "name") {
      if (!value) {
        error = "Name must not be empty";
      }
    } else if (field === "phoneNumber") {
      if (value?.length !== 10) {
        error = "Mobile number must be exactly 10 digits";
      }
    } else if (field === "address") {
      if (!value?.trim()) {
        error = "Address must not be empty";
      }
    }

    setErrors({ ...errors, [`${field}Error`]: error });
  };

  const screenWidth = Dimensions.get("window").width;
  const imageWidth = screenWidth * 0.45;
  const imageHeight = imageWidth;

  const formElementsArr = [
    { label: "name", type: "textField" },
    { label: "address", type: "textField" },
    { label: "amountPaid", type: "textField" },
    { label: "joiningDate", type: "datePicker" },
    { label: "phoneNumber", type: "textField" },
    { label: "subscriptionPeriod", type: "textField" },
  ];

  const validateForm = () => {
    for (const field of formElementsArr) {
      validateField(field.label, user[field.label]);
    }

    // Check if any errors exist
    return Object.values(errors).every((error) => !error);
  };

  const handleUpdate = () => {
    if (validateForm()) {
      // Perform the update action
      alert("Update successful!");
    } else {
      alert("Fill all the details properly");
    }
  };

  return (
    <SafeAreaView style={formStyles.safeAreaViewContainer}>
      <Header />
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Image
          style={{
            width: imageWidth,
            height: imageHeight,
            borderRadius: imageWidth / 2,
            alignSelf: "center",
          }}
          source={{ uri: user?.profileImg || defaultImageSource }}
        />
      </View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        style={formStyles.scrollViewContainer}
      >
        {formElementsArr.map((field) => (
          <FormElement
            key={field.label}
            label={field.label}
            type={field.type}
            value={user[field.label]}
            onChange={(text) => handleFieldChange(field.label, text)}
            error={errors[`${field.label}Error`]}
            style={{ height: Dimensions.get("window").height * 0.1 }}
          />
        ))}
        <View style={formStyles.radioBtnContainer}>
          <RadioGroup
            containerStyle={formStyles.radioBtnContent}
            radioButtons={radioButtons}
            selectedId={user?.selectedOption}
            onPress={(option) => handleFieldChange("selectedOption", option)}
            flexDirection="row"
          />
        </View>
        <View style={formStyles.buttonContainer}>
          <Button label="Update" onPress={handleUpdate} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditUser;
