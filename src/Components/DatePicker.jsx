import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons } from "@expo/vector-icons";
import { globalStyles } from "../../Styles/GlobalStyles";

const DatePicker = ({ label, value, onChange }) => {
  const { formStyles } = globalStyles.addMemberScreenStyles;
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    console.log(`${label} dateChanged==>`, selectedDate);
    setShowDatePicker(false);
    if (selectedDate) {
      onChange(selectedDate);
      formattedDate(selectedDate);
    }
  };
  const formattedDate = (date) => {
    if (!date) {
      return ""; // Return an empty string if the date is not defined
    }
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <View>
      <Pressable style={formStyles.row} onPress={() => setShowDatePicker(true)}>
        <Text style={formStyles.label}>{label}</Text>
        <TextInput
          value={formattedDate(value)} // Use the formatted date here
          editable={false}
          placeholder={`Select ${label}`}
          style={formStyles.input}
        />
      </Pressable>
      {showDatePicker && (
        <DateTimePicker
          value={value}
          mode="date"
          display="spinner"
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

export default DatePicker;
