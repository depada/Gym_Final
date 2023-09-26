import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ConclusionText, Header } from "../Components";
import { useAppContext } from "../Context/AppContext";

const ConclusionScreen = () => {
  const { userCreationCode } = useAppContext();

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#48426D",
        height: "100%",
        width: "100%",
        justifyContent: "center",
      }}
    >
      <Header />
      <ConclusionText statusCode={userCreationCode} />
    </SafeAreaView>
  );
};

export default ConclusionScreen;
