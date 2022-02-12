import React, { useState } from "react";
import SwipeableItem, { UnderlayParams } from "react-native-swipeable-item";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import moment from "moment";
const { multiply, sub } = Animated;
import Animated from "react-native-reanimated";
import { useTheme } from "react-native-paper";
import { getHeight } from "../Utils/FuncsAndRespons";

export default function renderItem({
  item,
  index,
  itemRefs,
  deleteItem,
  showmodel,
}) {
  const { colors } = useTheme();

  // const renderUnderlayLeft = ({ item, percentOpen }) => (
  //   <Animated.View
  //     style={[
  //       styles.row,
  //       styles.underlayLeft,
  //       { opacity: percentOpen, backgroundColor: colors.elemprim },
  //     ]} // Fade in on open
  //   >
  //     <TouchableOpacity onPressOut={() => deleteItem(item)}>
  //       <FontAwesome name="trash-o" size={35} color={colors.text} />
  //     </TouchableOpacity>
  //   </Animated.View>
  // );

  // const renderUnderlayRight = ({ item, percentOpen, open, close }) => (
  //   <Animated.View
  //     style={[
  //       styles.row,
  //       styles.underlayRight,
  //       {
  //         backgroundColor: colors.elemsec,
  //         transform: [{ translateX: multiply(sub(1, percentOpen), -400) }], // Translate from left on open
  //       },
  //     ]}
  //   >
  //     <TouchableOpacity onPressOut={close}>
  //       <Text style={[styles.text, { color: colors.text }]}>CLOSE</Text>
  //     </TouchableOpacity>
  //   </Animated.View>
  // );

  return (
    // <SwipeableItem
    //   key={item.key}
    //   item={item}
    //   ref={(ref) => {
    //     if (ref && !itemRefs.get(item.key)) {
    //       itemRefs.set(item.key, ref);
    //     }
    //   }}
    //   onChange={({ open }) => {
    //     if (open) {
    //       // Close all other open items
    //       [...itemRefs.entries()].forEach(([key, ref]) => {
    //         if (key !== item.key && ref) ref.close();
    //       });
    //     }
    //   }}
    //   overSwipe={30}
    //   renderUnderlayLeft={renderUnderlayLeft}
    //   renderUnderlayRight={renderUnderlayRight}
    //   snapPointsLeft={[150]}
    //   snapPointsRight={[175]}
    // >
    <View style={[styles.row, { flex: 1, backgroundColor: colors.background }]}>
      {/* <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          <View style={{ flex: 1, marginVertical: 10, marginHorizontal: 5 }}>
            <TouchableOpacity onPress={() => showmodel(item)}>
              <Text style={[styles.text, { color: colors.text, flex: 1 }]}>
                {item.text}
              </Text>
            </TouchableOpacity>
          </View> */}

      {/* <View style={styles.sep} /> */}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text
          style={[
            styles.text,
            {
              color: colors.text,
              fontSize: 12,
            },
          ]}
        >
          <Text
            style={[
              styles.text,
              {
                color: colors.text,
                fontSize: 32,

                textAlign: "center",
              },
            ]}
          >
            {moment(item.Date).format("hh:mm a")}
          </Text>
          {`\n${
            moment(item.Date).format("Do ") +
            "," +
            moment(item.Date).format("MMM")
          }`}
        </Text>
        <Text
          style={[
            styles.text,
            {
              color: colors.accent,
              fontSize: 18,

              textAlign: "center",
            },
          ]}
        >
          Edited
          <MaterialCommunityIcons
            name="square-edit-outline"
            size={25}
            onPress={() => showmodel(item)}
          />
        </Text>
      </View>
      <Text
        style={[
          styles.text,
          {
            color: colors.text,
            fontSize: 12,

            lineHeight: 22,
          },
        ]}
      >
        Yoga Time
      </Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text
          style={[
            styles.des,
            {
              color: colors.text,
              fontSize: 11,

              lineHeight: 22,
            },
          ]}
        >
          Don't forget to call Andrea about yoga
        </Text>
        <TouchableOpacity onPressOut={() => deleteItem(item)}>
          <FontAwesome name="trash-o" size={25} color={colors.text} />
        </TouchableOpacity>
      </View>
      {/* <TouchableOpacity onPress={() => showmodel(item)}>
          <Text style={[styles.text, { color: colors.text, flex: 1 }]}>
            {item.text}
          </Text>
        </TouchableOpacity> */}
    </View>

    // </SwipeableItem>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  // TitleContainer: {
  //   flex: 0.2,
  //   justifyContent: "center",
  //   marginHorizontal: 7,
  // },
  row: {
    padding: 10,
    margin: 5,
    height: getHeight(18),
    borderRadius: 10,

    justifyContent: "space-between",
    borderWidth: 2,
    borderColor: "gray",
  },
  text: {
    fontWeight: "bold",
    fontSize: 24,
  },
  des: {
    fontSize: 24,
  },
  underlayRight: {
    flex: 1,
    justifyContent: "flex-start",
    borderWidth: 0,
  },
  underlayLeft: {
    flex: 1,
    justifyContent: "flex-end",
    borderWidth: 0,
  },
  // sep: {
  //   borderWidth: 1,
  //   borderColor: "gray",
  //   marginHorizontal: 10,
  //   opacity: 0.5,
  //   alignSelf: "stretch",
  //   marginVertical: 10,
  // },
});
//   <View style={{ flex: 1, marginVertical: 10, marginHorizontal: 5 }}>
//     <TouchableOpacity onPress={() => seteditable(!editable)}>
//       <TextInput
//         maxLength={150}
//         multiline
//         onBlur={() => seteditable(false)}
//         editable={editable}
//         onChangeText={(text) => change_text({ item, text })}
//         value={item.text}
//         style={[styles.text, { flex: 1 }]}
//       />
//     </TouchableOpacity>
//   </View>;
