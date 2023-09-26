import React, { createContext, useContext, useReducer, useState } from "react";

// Step 3: Define your initial state
const initialState = {
  name: "",
  admissionNumber: "",
  joiningDate: new Date(),
  address: "",
  phoneNumber: "",
  lastMonthPaid: new Date(),
  subscriptionPeriod: "1",
  selectedOption: "2",
  amountPaid: "800",
  selectedImage: "",
};

// Step 4: Create a context with the initial state as the default value
const AppContext = createContext(initialState);

// Step 5: Create a provider component
export const AppProvider = ({ children }) => {
  // Define a reducer function to handle state updates
  const reducer = (state, action) => {
    switch (action.type) {
      case "UPDATE_FIELD":
        return {
          ...state,
          [action.field]: action.value,
        };
      case "RESET_FORM":
        return initialState; // Reset the form fields to their initial values
      default:
        return state;
    }
  };

  // Use useReducer to manage state with the reducer function
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isLoading, setIsLoading] = useState(false); // Initialize isLoading state
  const [userCreationCode, setUserCreationCode] = useState("");

  // Create functions to dispatch actions for state updates
  const updateField = (field, value) => {
    if (field === "isLoading") {
      // Handle loading state separately
      setIsLoading(value);
    } else if (field === "userCreationCode") {
      setUserCreationCode(value);
    } else {
      // Handle other fields as usual
      dispatch({ type: "UPDATE_FIELD", field, value });
    }
  };

  const resetForm = () => {
    dispatch({ type: "RESET_FORM" });
  };

  return (
    // Step 6: Provide the state and update functions to the components
    <AppContext.Provider
      value={{ state, updateField, resetForm, isLoading, userCreationCode }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Create a custom hook to easily access the context values
export const useAppContext = () => {
  return useContext(AppContext);
};
