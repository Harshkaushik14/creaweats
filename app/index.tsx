import { StyleSheet, View } from "react-native";
import React from "react";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import Login from "./(auth)/login";
const Welcome = () => {
  // const theme = useTheme()

  return (
    <View style={{ flex: 1, backgroundColor: "#EED489" }}>
      <StatusBar style="dark" />
      <Stack.Screen
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          headerShown: false,
          // https://reactnavigation.org/docs/headers#adjusting-header-styles
        }}
      />
      <Login />
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    marginHorizontal: 15,
  },
  sloganText: {
    paddingHorizontal: 27,
    textAlign: "center",
  },
  hyperLinktext: {
    fontSize: 10,
    //   color: theme.colors.primary,
    textDecorationLine: "underline",
    //   textDecorationColor: theme.colors.primary,
    marginHorizontal: 4,
  },
  termsAndPrivacyTextBox: {
    marginTop: 20,
    paddingHorizontal: 15,
    fontSize: 10,
    textAlign: "center",
    //   color: colors.black
  },
});
