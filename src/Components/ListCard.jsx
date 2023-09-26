import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
export const defaultImageSource =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
const ListCard = ({ data, onClick }) => {
  const { amountPaid, selectedOption, name, profileImg, numberOfDaysLeft } =
    data;
  const [membershipType, setMembershipType] = useState();

  const displaySubscription = (selectedOption) => {
    setMembershipType(
      selectedOption === "1"
        ? "Cardio + Strength"
        : selectedOption === "2"
        ? "Only Strength"
        : selectedOption === "3"
        ? "Personal Training"
        : ""
    );
  };

  useEffect(() => {
    displaySubscription(selectedOption);
  }, [data]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onClick}>
        <View style={styles.cardContainer}>
          <Image
            style={styles.cardImage}
            src={profileImg ? profileImg : defaultImageSource}
          />
          <View style={styles.cardContent}>
            <View style={styles.headerContent}>
              <Text style={styles.cardContentName}>{name}</Text>
              <View style={styles.membership}>
                <Text style={styles.membershipText}>{membershipType}</Text>
              </View>
            </View>
            <Text style={styles.cardContentAmount}>Amt-Paid: {amountPaid}</Text>
            <Text style={styles.cardContentExpiryDate}>
              Exp: {numberOfDaysLeft} Days Left
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 10,
  },
  cardContainer: {
    backgroundColor: "#312C51",
    width: "90%",
    height: 90,
    borderRadius: 8,
    marginTop: 5,
    elevation: 3,
    shadowColor: "#333",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  cardContent: {
    flex: 1,
    justifyContent: "space-between",
    margin: 0,
  },
  cardContentName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#f0c38e",
  },
  cardContentAmount: {
    fontSize: 12,
    fontFamily: "Roboto",
    color: "#C7BFFD",
  },
  cardContentExpiryDate: {
    fontSize: 12,
    color: "#C7BFFD",
  },
  cardImage: {
    height: 75,
    width: 75,
    margin: 12,
    borderRadius: 8,
  },
  membership: {
    borderRadius: 10,
    width: 85,
    maxWidth: 90,
    alignItems: "center",
    borderColor: "#f0c38e",
    justifyContent: "center",
    borderWidth: 1,
    minHeight: 30,
    flex: 1,
  },
  membershipText: {
    fontSize: 12,
    color: "#f0c38e",
  },
  headerContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 10,
  },
});

export default ListCard;
