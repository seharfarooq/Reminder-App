//import liraries
import React, { Component } from "react";

import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useTheme } from "react-native-paper";
import { getHeight, getWidth } from "../../Utils/FuncsAndRespons";

// create a component
const Header = () => {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.bg,
        { backgroundColor: colors.background, borderColor: colors.text },
      ]}
    >
      <TouchableOpacity activeOpacity={0.8}>
        {/* <Ionicons name="menu" size={30} color={theme.primary} /> */}
      </TouchableOpacity>
      <Image source={require("../../assets/favicon.png")} style={styles.icon} />
      <Text style={[styles.text, { fontSize: 20, color: colors.text }]}>
        Reminder App
      </Text>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    height: getHeight(9),
    borderBottomWidth: 0.4,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: getWidth(4),
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: getWidth(3),
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

//make this component available to the app
export default Header;
