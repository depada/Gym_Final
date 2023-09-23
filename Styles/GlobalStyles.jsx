import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  landingScreenStyles: {
    container: {
      backgroundColor: "#48426D",
      height: "100%",
    },
    sliderButtonContainer: {
      borderColor: "#f0c38e",
      borderWidth: 2,
      borderRadius: 70,
      height: "70%",
      width: "30%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#312c51",
    },
    sliderButtonContent: {
      justifyContent: "space-evenly",
      alignItems: "center",
      position: "relative",
    },
    sliderButtonText: {
      fontSize: 25,
      fontWeight: "bold",
      color: "#f0c38e",
      marginBottom: 5,
      zIndex: 1,
    },

    imgContainer: {
      justifyContent: "center",
      alignItems: "center",
      margin: "30%",
    },
  },
  addMemberScreenStyles: {
    formStyles: {
      container: {},
      row: {
        justifyContent: "center",
        marginLeft: 10,
        flexDirection: "column", // Arrange items vertically
        alignItems: "center",
      },
      input: {
        width: "90%",
        height: "70%",
        borderWidth: 1,
        borderRadius: 30,
        borderColor: "#f0c38e",
        padding: 10,
        color: "#f0c38e",
        flex: 2,
      },
      label: {
        color: "#f0c38e",
        flex: 1,
        marginBottom: 5,
      },
      errorStyle: {
        color: "#F44040",
        flex: 1,
        // marginBottom: 5,
        fontSize: 18,
        fontWeight: 600,
      },
      buttonContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: "2%",
        marginLeft: "5%",
      },
      radioBtnContainer: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      },
      radioBtnContent: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        width: "28%",
        marginTop: 10,
      },
      scrollViewContainer: { height: "100%", width: "100%" },
      safeAreaViewContainer: {
        backgroundColor: "#48426D",
        height: "100%",
        width: "100%",
        justifyContent: "center",
      },
    },
  },
  viewMembersScreenStyles: {},
});
