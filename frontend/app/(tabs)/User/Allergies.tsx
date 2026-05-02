import {
  Allergies,
  AllergiesValues,
  Diets,
  DietsValues,
} from "@/build/api_types";
import FilterHeader from "@/components/chevron-back";
import SelectableChip from "@/components/settings/selectable-chip";
import SelectableChipListHolder from "@/components/settings/selectable-chip-list";
import TabSeparator from "@/components/settings/tab-seperator";
import { ThemedSafeAreaView } from "@/components/themed/themed-safe-area-view";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { UserContext } from "@/contexts/user-context";
import { updateUserFields } from "@/requests/Users";
import { toDisplayCase } from "@/utils/ToDisplayCase";
import React, { useContext } from "react";
import { Dimensions, ScrollView, StyleSheet } from "react-native";

export default function AllergiesDiet() {
  const userContext = useContext(UserContext);

  const handleAllergy = async (allergy: Allergies) => {
    // update allergies list appropriately
    const currentAllergies = userContext?.user?.allergiesList ?? [];

    let updatedAllergies: Allergies[];

    if (currentAllergies.includes(allergy)) {
      updatedAllergies = currentAllergies.filter((a) => a !== allergy);
    } else {
      updatedAllergies = [...currentAllergies, allergy];
    }

    const updatedAllergiesBackend = await updateUserFields(
      userContext.user?.id,
      { allergiesList: updatedAllergies },
    );
    userContext?.updateUserField("allergiesList", updatedAllergies);
  };

  const handleDiet = async (diet: Diets) => {
    // update diets list appropriately

    const currentDiets = userContext?.user?.dietsList ?? [];

    let updatedDiets: Diets[];

    if (currentDiets.includes(diet)) {
      updatedDiets = currentDiets.filter((d) => d !== diet);
    } else {
      updatedDiets = [...currentDiets, diet];
    }

    const updatedDietsBackend = await updateUserFields(userContext.user?.id, {
      dietsList: updatedDiets,
    });
    userContext?.updateUserField("dietsList", updatedDiets);
  };

  return (
    <ThemedSafeAreaView style={styles.safeAreaContainer}>
      <FilterHeader />
      <ScrollView style={styles.scrollContainer}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Allergies & Dietary Restrictions</ThemedText>
        </ThemedView>

        <TabSeparator />

        <ThemedView style={styles.allergySection}>
          <ThemedText style={styles.subtitle} type="subtitle">
            Add an Allergy
          </ThemedText>
          <SelectableChipListHolder nCols={0}>
            {AllergiesValues.map((value) => (
              <SelectableChip
                key={value}
                title={toDisplayCase(value)}
                isPressed={userContext?.user?.allergiesList.includes(value)}
                onPress={() => handleAllergy(value)}
              ></SelectableChip>
            ))}
          </SelectableChipListHolder>
        </ThemedView>

        <ThemedView style={styles.allergySection}>
          <ThemedText style={styles.subtitle} type="subtitle">
            Add a Dietary Restriction
          </ThemedText>
          <SelectableChipListHolder nCols={0}>
            {DietsValues.map((value) => (
              <SelectableChip
                key={value}
                title={toDisplayCase(value)}
                isPressed={userContext?.user?.dietsList.includes(value)}
                onPress={() => handleDiet(value)}
              ></SelectableChip>
            ))}
          </SelectableChipListHolder>
        </ThemedView>
      </ScrollView>
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
    marginTop: 20,
  },
  stepContainer: {
    marginBottom: 8,
  },
  allergySection: {
    marginTop: 15,
  },
  buttonGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  subtitle: {
    paddingVertical: 10,
  },
});
