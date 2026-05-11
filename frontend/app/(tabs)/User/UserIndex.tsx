import { Dimensions, StyleSheet } from "react-native";

import SettingsTab from "@/components/settings/settings-tab";
import TabSeparator from "@/components/settings/tab-seperator";
import { ThemedSafeAreaView } from "@/components/themed/themed-safe-area-view";
import { ThemedScrollView } from "@/components/themed/themed-scroll-view";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { UserContext } from "@/contexts/user-context";
import { useContext } from "react";

// update to your api address! when you do npm run start, it'll show it under the qr code. Eventually this will be changed to the server's address when deployed.

export default function HomeScreen() {
  const userContext = useContext(UserContext);

  return (
    <ThemedSafeAreaView style={styles.safeAreaContainer}>
      <ThemedScrollView style={styles.scrollContainer}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">{userContext?.user?.name}</ThemedText>
        </ThemedView>

        <TabSeparator />

        <ThemedView style={styles.stepContainer}>
          <SettingsTab
            icon="add-circle"
            title="Create New Recipe"
            subtext={"Share your favorite recipes!"}
            route="/(tabs)/User/CreateNewRecipe"
          />

          <TabSeparator />

          <SettingsTab
            icon="heart"
            title="Favorite Recipes"
            subtext={"See recipes you have saved!"}
            route="/(tabs)/User/FavoritesPage"
          />

          <TabSeparator />

          <SettingsTab
            icon="nutrition"
            title="Allergies & Dietary Restrictions"
            subtext={"Set your allergies!"}
            route="/(tabs)/User/Allergies"
          />

          <TabSeparator />

          <SettingsTab
            icon="settings"
            title="Account Settings"
            subtext={"username, password, etc."}
            route="/(tabs)/User/AccountSettings"
          />

          <TabSeparator />

          {/* Can be added back later */}

          {/* <SettingsTab 
            icon='accessibility' 
            title='Accessibility' subtext={'Set your preferences!'}
            route='/(tabs)/User/Accessibility'
          />
          <TabSeparator /> */}
        </ThemedView>
      </ThemedScrollView>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    height: "auto",
  },
  scrollContainer: {
    height: Dimensions.get("window").height,
    margin: 15,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 12,
    marginTop: 20,
  },
  stepContainer: {
    marginBottom: 8,
  },
});
