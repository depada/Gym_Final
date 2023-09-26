import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RadioGroup } from "react-native-radio-buttons-group";
import Button from "./Button";
import Header from "./Header";
import { globalStyles } from "../../Styles/GlobalStyles";
import FormElement from "./FormElement";
import { radioButtons } from "../../Constants/constants";
import { useAppContext } from "../Context/AppContext";

const Form = ({ navigation, item }) => {
  const { formStyles } = globalStyles.addMemberScreenStyles;
  const { state, updateField } = useAppContext();
  const initialErrorState = {
    nameError: "",
    addressError: "",
    admissionNumberError: "",
    subscriptionPeriodError: "",
    phoneNumberError: "",
  };
  const [errors, setErrors] = useState(initialErrorState);
  const {
    nameError,
    addressError,
    admissionNumberError,
    subscriptionPeriodError,
    phoneNumberError,
  } = errors;

  const {
    name,
    address,
    phoneNumber,
    joiningDate,
    lastMonthPaid,
    admissionNumber,
    subscriptionPeriod,
    selectedOption,
  } = state;
  const formElementsArr = [
    {
      value: name,
      onChange: (name) => handleStateChange("name", name),
      label: "name",
      type: "textField",
      id: "name",
      error: nameError,
    },
    {
      value: address,
      onChange: (address) => handleStateChange("address", address),
      label: "address",
      type: "textField",
      id: "address",
      error: addressError,
    },
    {
      value: phoneNumber,
      onChange: (phoneNumber) => handleStateChange("phoneNumber", phoneNumber),
      label: "phoneNumber",
      type: "textField",
      id: "phoneNumber",
      error: phoneNumberError,
    },
    {
      value: joiningDate,
      onChange: (date) => handleStateChange("joiningDate", date),
      label: "joiningDate",
      type: "datePicker",
      error: "",
      id: "joiningDate",
    },
    {
      value: lastMonthPaid,
      onChange: (date) => handleStateChange("lastMonthPaid", date),
      label: "lastMonthPaid",
      type: "datePicker",
      error: "",
      id: "lastMonthPaid",
    },
    {
      value: subscriptionPeriod,
      onChange: (subscriptionPeriod) =>
        handleStateChange("subscriptionPeriod", subscriptionPeriod),
      label: "subscriptionPeriod",
      type: "textField",
      id: "subscriptionPeriod",
      error: subscriptionPeriodError,
    },
    { id: "radioButtons" },
    {
      value: admissionNumber,
      onChange: (admissionNumber) =>
        handleStateChange("admissionNumber", admissionNumber),
      label: "admissionNumber",
      type: "textField",
      id: "admissionNumber",
      error: admissionNumberError,
    },
  ];
  const handleStateChange = (field, value) => {
    // Use updateField from the context to update the state
    updateField(field, value);
  };

  const validateOnNext = () => {
    setErrors(initialErrorState); // Reset all errors

    let hasErrors = false;

    if (
      isNaN(Number(subscriptionPeriod)) ||
      Number(subscriptionPeriod) < 1 ||
      Number(subscriptionPeriod) > 12 ||
      !subscriptionPeriod?.trim()
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        subscriptionPeriodError:
          "Subscription period must be a number between 1 and 12",
      }));
      hasErrors = true;
    }

    if (!name) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        nameError: "Name must not be empty",
      }));
      hasErrors = true;
    }

    if (phoneNumber?.length !== 10) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phoneNumberError: "Mobile number must be exactly 10 digits",
      }));
      hasErrors = true;
    }

    if (!address?.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        addressError: "Address must not be empty",
      }));
      hasErrors = true;
    }

    if (!admissionNumber?.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        admissionNumberError: "Admission number must not be empty",
      }));
      hasErrors = true;
    }

    return !hasErrors; // Return true if there are no errors, otherwise false
  };

  const handleNext = () => {
    if (validateOnNext()) {
      navigation.navigate("PhotoUploadScreen");
    } else {
      alert("Fill all the details properly");
    }
    // alert(`selectedOption==>${selectedOption}`);
  };

  return (
    <SafeAreaView style={formStyles.safeAreaViewContainer}>
      <Header />
      <ScrollView
        contentContainerStyle={{}}
        style={formStyles.scrollViewContainer}
      >
        {formElementsArr.map((ele) => {
          if (ele.id === "radioButtons") {
            return (
              <View key={ele.id} style={formStyles.radioBtnContainer}>
                <RadioGroup
                  containerStyle={formStyles.radioBtnContent}
                  radioButtons={radioButtons}
                  selectedId={selectedOption ? selectedOption : "2"}
                  onPress={(option) => updateField("selectedOption", option)}
                  flexDirection="row"
                />
              </View>
            );
          } else {
            return (
              <FormElement
                value={state[ele.label]}
                label={ele.label}
                type={ele.type}
                onChange={(data) => handleStateChange(ele.label, data)}
                key={ele.id}
                error={ele.error}
              />
            );
          }
        })}
        <View style={formStyles.buttonContainer}>
          <Button label="Next" onPress={handleNext} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Form;
