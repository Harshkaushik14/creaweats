import { categories } from "@/src/utils/dummyData";
import { EvilIcons, Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

async function registerForPushNotificationsAsync() {
  if (!Device.isDevice) {
    alert("Must use a physical device for Push Notifications");
    return null;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    alert("Failed to get push notification permissions!");
    return null;
  }

  // Get Expo Push Token
  const { data: token } = await Notifications.getExpoPushTokenAsync();
  console.log("Expo Push Token:", token);
  return token;
}

const Home = () => {
  const [selectedDate, setSelectedDate] = useState("16 Sep");
  const [deliveryType, setDeliveryType] = useState("Delivery");
  const [flightNumber, setFlightNumber] = useState("");

  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      if (token) setExpoPushToken(token);
    });

    // Handle incoming notifications when app is in foreground
    const notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Notification Received:", notification);
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
    };
  }, []);

  // Function to trigger a local notification
  const handleNotificationPress = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "New Message 💬",
        body: "You have a new notification!",
        sound: "default",
      },
      trigger: { seconds: 2 }, // Notification appears after 2 seconds
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar style="dark" />
      <Stack.Screen
        options={{
          statusBarTranslucent: false,
          contentStyle: { flexDirection: "row", justifyContent: "center" },
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: "Home",
          // https://reactnavigation.org/docs/headers#adjusting-header-styles
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <ScrollView style={{ flex: 1, position: "relative" }}>
        <View style={styles.container}>
          {/* Top Navbar */}
          <View style={styles.navbar}>
            <Text style={styles.location}>LGA ▼</Text>
            <TouchableOpacity>
              <Ionicons name="cart-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>

          {/* Order Section */}
          <View style={styles.orderSection}>
            <Text style={styles.headerText}>
              Help Us Get Your Order Right! 💡🍔✨
            </Text>

            {/* Date Selector */}
            <View style={styles.datePicker}>
              <View style={styles.dateButton}>
                <TouchableOpacity>
                  <EvilIcons name="chevron-left" size={30} color="black" />
                </TouchableOpacity>
                <Text style={styles.dateText}>{selectedDate}</Text>
                <TouchableOpacity>
                  <EvilIcons name="chevron-right" size={30} color="black" />
                </TouchableOpacity>
              </View>
              <View style={styles.toggleContainer}>
                <TouchableOpacity
                  style={[
                    styles.toggleButton,
                    deliveryType === "Delivery" && styles.selectedToggle,
                  ]}
                  onPress={() => setDeliveryType("Delivery")}
                >
                  <Text
                    style={[
                      styles.toggleText,
                      deliveryType === "Delivery" && { color: "#fff" },
                    ]}
                  >
                    Delivery
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.toggleButton,
                    deliveryType === "Pick Up" && styles.selectedToggle,
                  ]}
                  onPress={() => setDeliveryType("Pick Up")}
                >
                  <Text
                    style={[
                      styles.toggleText,
                      deliveryType === "Pick Up" && { color: "#fff" },
                    ]}
                  >
                    Pick Up
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Delivery / Pickup Toggle */}

            {/* Flight Input */}
            <View style={styles.flightInputContainer}>
              <TextInput
                style={styles.flightInput}
                placeholder="Enter flight number"
                value={flightNumber}
                onChangeText={setFlightNumber}
              />
              <TouchableOpacity
                onPress={handleNotificationPress}
                style={styles.addButton}
              >
                <Text style={styles.addText}>Add</Text>
              </TouchableOpacity>
            </View>

            {/* Continue without flight */}
            <TouchableOpacity>
              <Text style={styles.continueText}>Continue without flight</Text>
            </TouchableOpacity>
          </View>

          {/* Categories */}
          <Text style={styles.categoryHeader}>
            What would you like to order?
          </Text>
          <FlatList
            data={categories}
            numColumns={4}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  router.navigate({
                    pathname: "/(category-details)/categoryDetails",
                  })
                }
                style={styles.categoryItem}
              >
                <Image source={item.icon} style={styles.categoryIcon} />
                <Text style={styles.categoryText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />

          {/* View All Restaurants Button */}
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View All Restaurants</Text>
            <EvilIcons name="chevron-right" size={30} color="black" />
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 10,
              marginHorizontal: 20,
              borderRadius: 10,
              marginTop: 20,
              marginBottom: 20,
              borderWidth: 4,
              borderColor: "#FFF0BB",
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "800",
                  color: "#000",
                  marginBottom: 5,
                }}
              >
                Schedule Food Delivery
              </Text>
              <Text style={{ fontSize: 12, fontWeight: "400", color: "#000" }}>
                for Tomorrow
              </Text>
            </View>
            <Image
              source={require("../../assets/images/calendarIcon.png")}
              style={{ height: 55, width: 55 }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 20,
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  location: {
    fontSize: 16,
    fontWeight: "bold",
  },
  orderSection: {
    backgroundColor: "#FDF4C6",
    padding: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "300",
    marginBottom: 10,
  },
  datePicker: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 20,
  },
  dateButton: {
    backgroundColor: "#fff",
    padding: Platform.OS === "android" ? 10 : 8,
    paddingTop: Platform.OS === "android" ? 4 : 8,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    // marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  dateText: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: Platform.OS === "android" ? 4 : 0,
  },
  toggleContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    alignSelf: "center",
    padding: 6,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  toggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  selectedToggle: {
    backgroundColor: "#000",
  },
  toggleText: {
    fontSize: 12,
    color: "#000",
  },
  flightInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  flightInput: {
    flex: 1,
    height: 50,
    padding: 10,
  },
  addButton: {
    backgroundColor: "#E8E8E880",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  addText: {
    fontSize: 14,
  },
  continueText: {
    color: "#000",
    fontWeight: "600",
    textAlign: "center",
    textDecorationLine: "underline",
    marginBottom: 10,
    marginTop: 10,
  },
  categoryHeader: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 15,
  },
  categoryItem: {
    flex: 1,
    alignItems: "center",
    marginVertical: 10,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  categoryText: {
    fontSize: 12,
    marginTop: 5,
  },
  viewAllButton: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "center",
    padding: 6,
    alignItems: "center",
    marginTop: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    marginHorizontal: 20,
  },
  viewAllText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Home;
