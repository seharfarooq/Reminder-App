import React, { useState, useContext, useEffect } from "react";
import {
  useTheme,
  DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import Element from "../Components/Swipablelist";
import Model from "../Components/model";
import { Context } from "../Context/ReminderDataContext";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  LayoutAnimation,
  TouchableOpacity,
  Platform,
  UIManager,
} from "react-native";
const lighttheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#6c757d",
    accent: "#6096ba",
    background: "#eeeeee",
    tab: "#ffffff",
    elemprim: "rgb(220,120,120)",
    elemsec: "lightblue",
    text: "#777777",
  },
};
const darktheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#aaafaf",
    accent: "#6096ba",
    background: "#212529",
    tab: "#343a40",
    elemprim: "#777777",
    elemsec: "#777777",
    text: "#bbbbbb",
  },
};

import Header from "../Components/Header/Index";
import { getHeight, getWidth } from "../Utils/FuncsAndRespons";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

function My_List() {
  const { state, add_reminder, delete_reminder, edit } = useContext(Context);
  var currentTheme = state.Theme ? lighttheme : darktheme;
  const { colors } = useTheme();
  const [showmodel, setmodel] = useState(false);
  const [selecteditem, setselecteditem] = useState(null);

  let itemRefs = new Map();

  useEffect(() => {
    state.map((item) => {
      let ti = new Date(item.Date);
      if (ti.getTime() <= Date.now()) {
        delete_reminder(item);
      }
    });
    state.sort(function (a, b) {
      var keyA = new Date(a.Date).getTime(),
        keyB = new Date(b.Date).getTime();
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });
  }, [state]);

  const chnage_model = (item) => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        200,
        LayoutAnimation.Types.linear,
        LayoutAnimation.Properties.opacity
      )
    );
    setselecteditem(item);
    setmodel(!showmodel);
  };
  const hide_model = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        200,
        LayoutAnimation.Types.linear,
        LayoutAnimation.Properties.opacity
      )
    );
    setmodel(false);
    setselecteditem(null);
  };

  function emptylist() {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={[
            styles.text,
            { fontSize: 22, textAlign: "center", color: colors.text },
          ]}
        >
          "No Reminder Yet"
        </Text>
      </View>
    );
  }

  function footer() {
    return (
      <View
        style={{
          height: 60,
          width: 60,
          marginTop: getHeight(2),
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
          borderRadius: 30,
          backgroundColor: colors.text,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            add_reminder();
          }}
        >
          <AntDesign name="plus" size={34} color={colors.tab} />
        </TouchableOpacity>
      </View>
    );
  }
  if (showmodel) {
    return (
      <Model edit={edit} hide_model={hide_model} selecteditem={selecteditem} />
    );
  }
  function header() {
    // return (
    //   <View style={styles.TitleContainer}>
    //     <Text style={[styles.text, { fontSize: 45, color: colors.text }]}>
    //       Reminders
    //     </Text>
    //   </View>
    // );
  }

  const TodayHistory = () => {
    return (
      <FlatList
        ListHeaderComponent={() => (
          <View style={{ padding: getHeight(5) }}></View>
        )}
        ListEmptyComponent={emptylist}
        style={{ flex: 0.8 }}
        keyExtractor={(item) => item.key}
        data={state}
        renderItem={({ item, index }) => (
          <Element
            index={index}
            item={item}
            itemRefs={itemRefs}
            deleteItem={(item) => {
              delete_reminder(item);
            }}
            showmodel={chnage_model}
          />
        )}
        ListFooterComponent={footer}
        // onDragEnd={({ data }) => this.setState({ data })}
        // activationDistance={10}
      />
    );
  };
  const AllHistory = () => {
    return (
      <FlatList
        ListHeaderComponent={() => (
          <View style={{ padding: getHeight(5) }}></View>
        )}
        ListEmptyComponent={emptylist}
        style={{ flex: 0.8 }}
        keyExtractor={(item) => item.key}
        data={state}
        renderItem={({ item, index }) => (
          <Element
            index={index}
            item={item}
            itemRefs={itemRefs}
            deleteItem={(item) => {
              delete_reminder(item);
            }}
            showmodel={chnage_model}
          />
        )}
        ListFooterComponent={footer}
        // onDragEnd={({ data }) => this.setState({ data })}
        // activationDistance={10}
      />
    );
  };
  const Tab = createMaterialTopTabNavigator();
  return (
    <View style={styles.container}>
      <Header />
      <NavigationContainer independent={true}>
        <Tab.Navigator
          sceneContainerStyle={{ backgroundColor: colors.background }}
          tabBarOptions={{
            activeBackgroundColor: colors.tab,
            inactiveBackgroundColor: colors.tab,
            activeTintColor: colors.accent,

            inactiveTintColor: colors.primary,
            style: { backgroundColor: colors.background },
            indicatorStyle: {
              backgroundColor: colors.accent,
            },
            labelStyle: {
              fontSize: 16,
              textTransform: "none",
              textAlign: "center",
            },
          }}
        >
          <Tab.Screen
            name="Today History"
            component={TodayHistory}
            options={{ tabBarLabel: "Today" }}
          />
          <Tab.Screen
            name="All History"
            component={AllHistory}
            options={{ tabBarLabel: "All" }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

export default My_List;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  TitleContainer: {
    flex: 0.4,
    justifyContent: "center",
    marginHorizontal: 7,
    marginVertical: 20,
  },
  text: {
    fontWeight: "bold",
    color: "gray",
    fontSize: 24,
  },
});
