import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { restaurants } from "@/src/utils/dummyData";
import CommonHeader from "@/src/components/CommonHeader";
import { useRouter } from "expo-router";
import { COLORS, FONT_SIZE } from "@/src/utils/styles";

interface Restaurant {
  id: string;
  name: string;
  location: string;
  rating: number;
  hours: string;
  priceRange: string;
  deliveryTime: string;
  image: string;
  favorite: boolean;
  available: boolean;
}

const RestaurantCard = ({ item }: { item: Restaurant }) => (
  <View
    style={{
      backgroundColor: item.available ? COLORS.white : "#f5f5f5",
      padding: 10,
      marginVertical: 5,
      borderRadius: 10,
      flexDirection: "row",
      alignItems: "center",
      shadowColor: "#000",
      shadowOpacity: 0.1,
      borderColor: COLORS.borderPrimary,
      borderWidth: 2,
      shadowRadius: 5,
      marginTop: 20,
      //   elevation: 2,
      marginHorizontal: 20,
    }}
  >
    <View style={{ flex: 1 }}>
      <Text
        style={{
          fontSize: FONT_SIZE.font16,
          fontWeight: "400",
          color: item.available ? COLORS.black : "#aaa",
          marginBottom: 6,
        }}
      >
        {item.name}
      </Text>
      <Text
        style={{ color: item.available ? "#666" : "#aaa", marginBottom: 6 }}
      >
        {item.location}
      </Text>
      <Text
        style={{ color: item.available ? "#008000" : "#aaa", marginBottom: 6 }}
      >
        ⭐ {item.rating}
      </Text>
      <Text
        style={{ color: item.available ? "#000" : "#aaa", marginBottom: 6 }}
      >
        {item.hours} • {item.priceRange}
      </Text>
      {item.available ? (
        <Text style={{ color: "green", fontWeight: "bold", marginBottom: 6 }}>
          {item.deliveryTime}
        </Text>
      ) : (
        <Text style={{ color: "red", marginBottom: 6 }}>Closed</Text>
      )}
    </View>
    <View style={{ alignItems: "flex-end" }}>
      <Image
        source={{ uri: item.image }}
        style={{ width: 80, height: 80, borderRadius: 10, marginBottom: 6 }}
      />
      <TouchableOpacity>
        <Ionicons
          name={item.favorite ? "heart" : "heart-outline"}
          size={24}
          color={item.favorite ? "#FF4081" : "black"}
        />
      </TouchableOpacity>
    </View>
  </View>
);

const RestaurantList: React.FC = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <CommonHeader title="" onBackPress={() => router.back()} />
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RestaurantCard item={item} />}
      />
    </SafeAreaView>
  );
};

export default RestaurantList;
