import React, { useEffect, useState } from "react";
import { EvilIcons, AntDesign } from "@expo/vector-icons";
import { View, Text, ScrollView, TextInput, StyleSheet } from "react-native";
import ListCard from "../Components/ListCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { getAllUsers } from "../Firebase/firebaseOperations";
import { formatDate } from "../../utils";
import Loading from "../Components/Loading";

const initialData = [
  {
    name: "shyam",
    amountPaid: "1000",
    joiningDate: "01-08-2023",
    monthsOfSubs: 2,
    profileImg:
      "https://www.thesun.co.uk/wp-content/uploads/2019/11/NINTCHDBPICT000303802783-e1573032149745.jpg",
  },
];

function calculateDaysLeft(dateString, monthsOfSubs) {
  console.log("initDate==>", dateString, "numberOfMonths==>", monthsOfSubs);
  const currentDate = new Date();

  // Parse the input date string in "DD/MM/YYYY" format
  const [day, month, year] = dateString.split("/").map(Number);

  // Calculate the new month and year after adding months
  let newMonth = month + Number(monthsOfSubs);
  let newYear = year;

  while (newMonth > 12) {
    newMonth -= 12;
    newYear += 1;
  }

  const expiryDate = new Date(newYear, newMonth - 1, day); // Subtract 1 from month to adjust to JavaScript's 0-based month indexing
  console.log("expiryDate==>", expiryDate);

  // Calculate the difference in milliseconds
  const timeDifference = expiryDate - currentDate;

  // Convert milliseconds to days and round up
  const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  return daysLeft;
}

const ListPage = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [membersData, setMembersData] = useState();
  const filteredData = [];
  if (membersData) {
    membersData.map((ele) => {
      filteredData.push({
        name: ele["name"],
        amountPaid: ele["amountPaid"],
        memberShip:
          ele["selectedOption"] === "1"
            ? "Cardio + Strength"
            : ele["selectedOption"] === "2"
            ? "Only Strength"
            : ele["selectedOption"] === "3"
            ? "Personal Training"
            : "Default",
        // expiryDate: calculateExpiryAndDaysLeft(
        //   ele["joiningDate"],
        //   ele["subscriptionPeriod"]
        // ),
        numberOfDaysLeft: calculateDaysLeft(
          ele["joiningDate"],
          ele["subscriptionPeriod"]
        ),
        profileImg: ele["selectedImage"],
      });
    });
  }

  // initialData.filter((item) =>
  //   item.name.toLowerCase().includes(searchQuery.toLowerCase())
  // );
  const getAllMembers = async () => {
    try {
      const initDataCollec = await getAllUsers();
      setMembersData(initDataCollec);
    } catch (error) {
      console.log("error getting usersData=>", error);
    }
  };

  useEffect(() => {
    getAllMembers();
  }, []);

  return (
    <SafeAreaView style={styles.wholeContainer}>
      <View style={styles.searchContainer}>
        <View style={styles.searchContent}>
          <EvilIcons
            name="search"
            size={25}
            color="black"
            style={{ marginBottom: 5, marginRight: 5, marginLeft: 5 }}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by Name"
            onChangeText={setSearchQuery}
            value={searchQuery}
          />
        </View>
      </View>
      {membersData ? (
        <ScrollView>
          {filteredData.map((item, index) => {
            return <ListCard key={index} data={item} />;
          })}
        </ScrollView>
      ) : (
        <Loading />
      )}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddMemberScreen")}
      >
        <AntDesign name="adduser" size={30} color="#312C51" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wholeContainer: {
    backgroundColor: "#48426D",
    flex: 1,
  },
  searchContainer: {
    backgroundColor: "#E1D9EB",
    marginTop: 50,
    marginHorizontal: 20,
    height: 40,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  searchContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#32075C",
  },
  addButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#f0c38e", // You can change the background color
    borderRadius: 35,
    width: 68,
    height: 68,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
});

export default ListPage;