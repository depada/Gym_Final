import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { globalStyles } from "../../Styles/GlobalStyles";
import DatePicker from "./DatePicker";

const FormElement = ({ label, type, value, onChange, error }) => {
  const { formStyles } = globalStyles.addMemberScreenStyles;

  const typeMap = {
    name: "Name",
    address: "Address",
    phoneNumber: "Mobile Number",
    subscriptionPeriod: "Months of GYM Subscription",
    admissionNumber: "Admission Number",
    lastMonthPaid: "Last Month Paid",
    joiningDate: "Joining Date",
    selectedOption: "Choose one option",
  };

  const [errorEle, setErrorEle] = useState(""); // To store validation errorEle message

  const handleValidation = (text) => {
    setErrorEle(""); // Reset errorEle message

    if (label === "phoneNumber") {
      if (text.length !== 10) {
        setErrorEle("Mobile number must be exactly 10 digits");
      }
    } else if (label === "admissionNumber") {
      if (!text.trim()) {
        setErrorEle("Admission number must not be empty");
      } else if (isNaN(text)) {
        setErrorEle("Admission number must be a number");
      }
    } else if (label === "subscriptionPeriod") {
      const num = Number(text);
      if (isNaN(num) || num < 1 || num > 12 || !text.trim()) {
        setErrorEle("Subscription period must be a number between 1 and 12");
      }
    } else if (label === "amount") {
      if (parseInt(text) < 0) {
        setErrorEle("amount should be greater than 0");
      }
    } else {
      if (!text.trim()) {
        setErrorEle(`${typeMap[label]} cannot be empty`);
      }
    }

    // Pass the value to the parent component
    onChange(text);
  };
  const handleDateTransform = (dateString) => {
    const dateParts = dateString.split("/");
    if (dateParts.length === 3) {
      const [day, month, year] = dateParts.map(Number);
      if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
        return new Date(year, month - 1, day); // Month is zero-based
      }
    }
    return null; // Invalid date string
  };
  return type === "textField" ? (
    <View style={formStyles.row}>
      <Text style={formStyles.label}>{typeMap[label]}</Text>
      <TextInput
        value={value}
        onChangeText={(data) => handleValidation(data)}
        style={formStyles.input}
        keyboardType={
          label === "phoneNumber" ||
          label === "subscriptionPeriod" ||
          label === "admissionNumber"
            ? "numeric"
            : "default"
        }
        inlineImageLeft={
          label === "phoneNumber"
            ? "image_phone"
            : label === "subscriptionPeriod"
            ? "image_subscription"
            : label === "admissionNumber"
            ? "image_admission"
            : label === "name"
            ? "image_name"
            : label === "address"
            ? "image_address"
            : null
        }
        maxLength={label === "phoneNumber" ? 10 : 50}
      />
      {error ? (
        <Text style={formStyles.errorStyle}>{error}</Text>
      ) : errorEle ? (
        <Text style={formStyles.errorStyle}>{errorEle}</Text>
      ) : null}
    </View>
  ) : type === "datePicker" ? (
    <DatePicker
      label={typeMap[label]}
      value={typeof value === "string" ? handleDateTransform(value) : value}
      onChange={(date) => onChange(date)}
    />
  ) : null;
};

export default FormElement;
