import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface HeaderProps {
  title: string;
  onBackPress?: () => void;
  onCartPress?: () => void;
}

const CommonHeader: React.FC<HeaderProps> = ({
  title,
  onBackPress,
  onCartPress,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBackPress}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity onPress={onCartPress}>
        <Ionicons name="cart-outline" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CommonHeader;
