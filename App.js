import { Provider as SettingsProvider } from "./Context/SettingsContext";
import { Provider as ReminderProvider } from "./Context/ReminderDataContext";
import { Provider as BirthdayProvider } from "./Context/BirthdayDataContext";
import { FAB, Portal, Provider } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { StyleSheet, View } from "react-native";
import Main from "./Screens/main";
import { getHeight, getWidth } from "./Utils/FuncsAndRespons";
// import { useNavigation } from "@react-navigation/native";

export default function App() {
  const [state, setState] = React.useState({ open: false });
  // const navigation = useNavigation();
  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;
  return (
    <Provider style={styles.fab}>
      <SettingsProvider>
        <ReminderProvider>
          <BirthdayProvider>
            <Main />

            <Portal>
              <FAB.Group
                fabStyle={styles.fab}
                open={open}
                icon={open ? "calendar-today" : "plus"}
                actions={[
                  {
                    icon: "plus",
                    onPress: () => console.log("Pressed add"),
                  },
                  {
                    icon: "calendar-check",
                    label: "Event",
                    onPress: () => console.log("Pressed star"),
                  },
                  {
                    icon: "cake-variant",
                    label: "Birthday",
                    // onPress: () => navigation.navigate("Birthday_Screen"),
                  },
                  {
                    icon: "gift",
                    label: "Anniversary",
                    onPress: () => console.log("Pressed notifications"),
                    small: false,
                  },
                ]}
                onStateChange={onStateChange}
                onPress={() => {
                  if (open) {
                    // do something if the speed dial is open
                  }
                }}
              />
            </Portal>

            {/* <FAB
            style={styles.fab}
            icon="plus"
            onPress={() => console.log("Pressed")}
          /> */}
          </BirthdayProvider>
        </ReminderProvider>
      </SettingsProvider>
    </Provider>
  );
}
const styles = StyleSheet.create({
  fab: {
    marginBottom: getHeight(10),
    marginRight: getWidth(3),

    right: 0,
    bottom: 0,
  },
});
