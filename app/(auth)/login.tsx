import React, { useState } from "react";
import {
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

import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const Login = () => {
  const [email, setEmail] = useState<string>("");

  const handleLogin = () => {
    if (!email.includes("@")) {
      alert("Please enter a valid work email");
      return;
    }
    console.log("Verification code sent to:", email);
    router.navigate({ pathname: "/home" });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#EED489",
      alignItems: "center",
      // paddingVertical: 50,
    },
    logo: {
      width: 50,
      height: 50,
      resizeMode: "contain",
      marginBottom: 10,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#000",
    },
    image: {
      width: 280,
      height: 280,
      resizeMode: "contain",
      marginVertical: 20,
    },
    description: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#000",
      marginTop: 20,
    },
    subText: {
      fontSize: 14,
      marginTop: 16,
      color: "#555",
      marginBottom: 20,
    },
    input: {
      width: "80%",
      height: 45,
      backgroundColor: "#fff",
      borderRadius: 25,
      paddingHorizontal: 15,
      fontSize: 14,
      color: "#000",
      marginBottom: 42,
      elevation: 3, // Shadow effect for Android
      shadowColor: "#000", // Shadow effect for iOS
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
    button: {
      backgroundColor: "#A68A58",
      paddingVertical: 12,
      paddingHorizontal: 40,
      borderRadius: 25,
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
  });
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <Stack.Screen
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: "Login",
          // https://reactnavigation.org/docs/headers#adjusting-header-styles
          headerStyle: { backgroundColor: "#5E4DEE" },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <ScrollView
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="on-drag"
        automaticallyAdjustKeyboardInsets
        contentContainerStyle={{
          flex: 1,
        }}
      >
        <View style={styles.container}>
          {/* Logo */}
          {/* <Image source={require("../assets/logo.png")} style={styles.logo} /> */}

          <View style={{ height: Platform.OS === "android" ? 60 : 20 }} />
          <Text style={styles.title}>CrewEats</Text>

          <Image
            source={require("../../assets/images/loginImage.png")}
            style={styles.image}
          />

          <View style={{ marginHorizontal: 20 }}>
            <Text style={styles.description}>
              FREE Delivery Service for Crew & Airport employees
            </Text>
            <Text style={styles.subText}>
              Sign Up / Login using official email ID
            </Text>
          </View>

          {/* Input Field */}
          <TextInput
            style={styles.input}
            placeholder="Enter your work email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          {/* Button */}
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Send Verification Code</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
