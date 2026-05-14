import FilterHeader from "@/components/chevron-back";
import SettingsButton from "@/components/settings/settings-buttons";
import SettingsTab from "@/components/settings/settings-tab";
import TabSeparator from "@/components/settings/tab-seperator";
import ThemedButton from "@/components/themed/themed-button";
import { ThemedSafeAreaView } from "@/components/themed/themed-safe-area-view";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { UserContext } from "@/contexts/user-context";
import { useThemeColor } from "@/hooks/use-theme-color";
import { updateUserFields } from "@/requests/Users";
import React, { useContext, useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import EyePasswordIcon from "@/components/eye_password_icon";
import { ThemedTextInput } from "@/components/themed/themed-text-input";
import { useThemePalette } from "@/hooks/get-theme-color";
import { deleteUser } from "@/requests/Users";

export default function AccountSettings() {
  const userContext = useContext(UserContext);
  const theme = useThemePalette();

  // use states to store user info
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput1, setPasswordInput1] = useState("");
  const [hidePasswordInput1, setHidePasswordInput1] = useState(true);
  const [passwordInput2, setPasswordInput2] = useState("");
  const [hidePasswordInput2, setHidePasswordInput2] = useState(true);
  const [oldPasswordInput, setOldPasswordInput] = useState("");
  const [hideOldPasswordInput, setHideOldPasswordInput] = useState(true);

  const inputColor = useThemeColor({}, "text");

  const handleUpdateUsername = async () => {
    const updatedUsername = await updateUserFields(userContext.user?.id, {
      username: usernameInput,
    });
    userContext?.updateUserField("username", usernameInput);
    setUsernameInput("");
  };

  const handleUpdateName = async () => {
    const updatedName = await updateUserFields(userContext.user?.id, {
      name: nameInput,
    });
    userContext?.updateUserField("name", nameInput);
    setNameInput("");
  };

  const handleUpdateEmail = async () => {
    const updatedEmail = await updateUserFields(userContext.user?.id, {
      email: emailInput,
    });
    userContext?.updateUserField("email", emailInput);
    setEmailInput("");
  };

  const handleUpdatePassword = async () => {
    if (
      userContext?.user?.password !== "" &&
      (oldPasswordInput === "" ||
        passwordInput1 === "" ||
        passwordInput2 === "")
    ) {
      alert("One or more fields is empty. Please complete all fields.");
    }
    if (passwordInput1 !== passwordInput2) {
      alert("Passwords do not match!");
    }
    if (oldPasswordInput != userContext?.user?.password) {
      alert(
        "Incorrect current password. Please input the correct current password.",
      );
    } else {
      const updatedPassword = await updateUserFields(userContext.user?.id, {
        password: passwordInput1,
      });
      userContext?.updateUserField("password", passwordInput1);
    }

    setPasswordInput1("");
    setPasswordInput2("");
    setOldPasswordInput("");
  };

  // Handles deleting the current user's account
  const handleDelete = async () => {
    const userId = userContext?.user?.id;

    // Check if user ID exists
    if (!userId) {
      if (Platform.OS === "web") {
        window.alert("User ID not found.");
      } else {
        Alert.alert("Error", "User ID not found.");
      }
      return;
    }

    // Ask user for confirmation before deleting account
    const confirmed =
      Platform.OS === "web"
        ? window.confirm("Are you sure you want to delete your account?")
        : await new Promise<boolean>((resolve) => {
            Alert.alert(
              "Delete Account",
              "Are you sure you want to delete your account?",
              [
                {
                  text: "Cancel",
                  style: "cancel",
                  onPress: () => resolve(false),
                },
                {
                  text: "Delete",
                  style: "destructive",
                  onPress: () => resolve(true),
                },
              ],
            );
          });

    // Stop if user cancels deletion
    if (!confirmed) return;
    try {
      // Call delete user API
      const result = await deleteUser(userId);
      console.log("Delete result:", result);

      // Handle successful deletion
      if (result && result.success) {
        userContext.setUser(null);
        if (Platform.OS === "web") {
          window.alert(result.message || "Account deleted successfully.");
        } else {
          Alert.alert(
            "Success",
            result.message || "Account deleted successfully.",
          );
        }
      } else {
        // Handle failed deletion
        if (Platform.OS === "web") {
          window.alert(result?.message || "Delete failed.");
        } else {
          Alert.alert("Delete failed", result?.message || "Unknown error");
        }
      }
    } catch (error) {
      // Handle unexpected errors
      console.error("Delete error:", error);
      if (Platform.OS === "web") {
        window.alert("Failed to delete account.");
      } else {
        Alert.alert("Error", "Failed to delete account.");
      }
    }
  };

  const handleLogout = async () => {
    userContext.setUser(null);
  };

  return (
    <ThemedSafeAreaView style={styles.safeAreaContainer}>
      <FilterHeader />
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Account Settings</ThemedText>
      </ThemedView>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          <TabSeparator />

          <SettingsTab
            icon="person"
            title="Personal Details"
            expand
            expandedByDefault={false}
          >
            <TabSeparator color={theme.text} />

            <SettingsTab
              icon="person-outline"
              title="Name"
              subtext={userContext?.user?.name}
              expand
              expandedByDefault={false}
            >
              <ThemedView style={styles.nestedContainer}>
                <ThemedTextInput
                  style={[{ color: inputColor }]}
                  placeholder="Change Name"
                  onChangeText={setNameInput}
                  value={nameInput}
                ></ThemedTextInput>

                <SettingsButton
                  title="Save Changes"
                  onPress={handleUpdateName}
                />
              </ThemedView>
            </SettingsTab>

            <TabSeparator />

            <SettingsTab
              icon="mail-outline"
              title="Email"
              subtext={userContext?.user?.email}
              expand
              expandedByDefault={false}
            >
              <ThemedView style={styles.nestedContainer}>
                <ThemedTextInput
                  style={[{ color: inputColor }]}
                  placeholder="Change Email"
                  onChangeText={setEmailInput}
                  value={emailInput}
                ></ThemedTextInput>

                <SettingsButton
                  title="Save Changes"
                  onPress={handleUpdateEmail}
                />
              </ThemedView>
            </SettingsTab>
          </SettingsTab>

          <TabSeparator />

          <SettingsTab
            icon="at"
            title="Change Username"
            subtext={`@${userContext?.user?.username}`}
            expand
            expandedByDefault={false}
          >
            <ThemedView style={styles.nestedContainer}>
              <ThemedTextInput
                style={[{ color: inputColor }]}
                placeholder="Type new username..."
                onChangeText={setUsernameInput}
                value={usernameInput}
              ></ThemedTextInput>

              <SettingsButton
                title="Save Changes"
                onPress={handleUpdateUsername}
              />
            </ThemedView>
          </SettingsTab>

          <TabSeparator />

          <SettingsTab
            icon="lock-closed"
            title="Change Password"
            expand
            expandedByDefault={false}
          >
            <ThemedView style={styles.nestedContainer}>
              <ThemedView style={styles.passwordContainer}>
                <ThemedTextInput
                  style={[styles.passwordInput, { color: inputColor }]}
                  placeholder="Current Password"
                  onChangeText={setOldPasswordInput}
                  value={oldPasswordInput}
                  secureTextEntry={hideOldPasswordInput}
                ></ThemedTextInput>
                <EyePasswordIcon
                  onPress={() => setHideOldPasswordInput((prev) => !prev)}
                  showPassword={!hideOldPasswordInput}
                />
              </ThemedView>

              <ThemedView style={styles.passwordContainer}>
                <ThemedTextInput
                  style={[styles.passwordInput, { color: inputColor }]}
                  placeholder="New Password"
                  onChangeText={setPasswordInput1}
                  value={passwordInput1}
                  secureTextEntry={hidePasswordInput1}
                ></ThemedTextInput>
                <EyePasswordIcon
                  onPress={() => setHidePasswordInput1((prev) => !prev)}
                  showPassword={!hidePasswordInput1}
                />
              </ThemedView>

              <ThemedView style={styles.passwordContainer}>
                <ThemedTextInput
                  style={[styles.passwordInput, { color: inputColor }]}
                  placeholder="Re-type New Password"
                  onChangeText={setPasswordInput2}
                  value={passwordInput2}
                  secureTextEntry={hidePasswordInput2}
                ></ThemedTextInput>
                <EyePasswordIcon
                  onPress={() => setHidePasswordInput2((prev) => !prev)}
                  showPassword={!hidePasswordInput2}
                />
              </ThemedView>

              <SettingsButton
                title="Save Changes"
                onPress={handleUpdatePassword}
              />
            </ThemedView>
          </SettingsTab>

          <TabSeparator style={{ marginBottom: 30 }} />

          <View
            style={{ gap: 25, flexDirection: "column", alignSelf: "center" }}
          >
            <ThemedButton
              onPress={handleLogout}
              color={theme.negativeButton}
              style={{ alignSelf: "center" }}
            >
              Logout
            </ThemedButton>

            <ThemedButton
              onPress={handleDelete}
              color={theme.negativeButton}
              style={{ alignSelf: "center" }}
            >
              Delete Account
            </ThemedButton>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  scrollContainer: {
    height: "100%",
    margin: 15,
    flex: 1,
  },
  keyboardContainer: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 20,
    marginLeft: 15,
  },
  stepContainer: {
    marginBottom: 8,
  },
  passwordContainer: {
    position: "relative",
    justifyContent: "center",
  },
  passwordInput: {
    borderRadius: 5,
    height: 40,
    paddingLeft: 10,
    paddingRight: 40,
  },
  nestedContainer: {
    paddingLeft: 24,
    gap: 10,
  },
});
