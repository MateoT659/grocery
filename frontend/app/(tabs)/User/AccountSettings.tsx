import LoginButton from "@/components/login/login-button";
import SettingsButton from "@/components/settings/settings-buttons";
import SettingsTab from "@/components/settings/settings-tab";
import TabSeparator from "@/components/settings/tab-seperator";
import { ThemedSafeAreaView } from "@/components/themed/themed-safe-area-view";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { UserContext } from "@/contexts/user-context";
import { useThemeColor } from "@/hooks/use-theme-color";

import { deleteUser, updateUserFields } from "@/requests/Users";
import React, { useContext, useState } from "react";
import { Alert, ScrollView, StyleSheet, TextInput } from "react-native";

export default function AccountSettings() {
  const userContext = useContext(UserContext);

  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput1, setPasswordInput1] = useState("");
  const [passwordInput2, setPasswordInput2] = useState("");
  const [oldPasswordInput, setOldPasswordInput] = useState("");

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

  const handleLogout = async () => {
    userContext.setUser(null);
  };

  /*const handleDelete = async () => {
    // Check if user exists first
    const userId = userContext?.user?.id;
    if (!userId) return;

    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const response = await fetch(
                `http://localhost:8081/user-api/users/${userId}`,
                {
                  method: "DELETE",
                },
              );

              const result = await response.json();

              if (result.success) {
                // Clear user context like logout
                userContext.setUser(null);
                console.log("User deleted:", result.message);
              } else {
                console.error("Delete failed:", result.message);
              }
            } catch (error) {
              console.error("Delete error:", error);
            }
          },
        },
      ],
    );
  }; */
  const handleDelete = async () => {
    const userId = userContext?.user?.id;
    if (!userId) return;

    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const result = await deleteUser(userId);

              if (result.success) {
                userContext.setUser(null);
                Alert.alert("Success", result.message);
              } else {
                Alert.alert("Delete failed", result.message);
              }
            } catch (error) {
              console.error("Delete error:", error);
              Alert.alert("Error", "Failed to delete account.");
            }
          },
        },
      ],
    );
  };

  return (
    <ThemedSafeAreaView style={styles.safeAreaContainer}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Account Settings</ThemedText>
      </ThemedView>
      <ScrollView style={styles.scrollContainer}>
        <TabSeparator />

        <SettingsTab
          icon="person"
          title="Personal Details"
          expand
          expandedByDefault={false}
        >
          <TabSeparator color="#e3e3e3ff" />

          <SettingsTab
            icon="person-outline"
            iconColor="#969696ff"
            title="Name"
            subtext={userContext?.user?.name}
            expand
            expandedByDefault={false}
          >
            <TextInput
              style={[styles.textInput, { color: inputColor }]}
              placeholder="Change Name"
              onChangeText={setNameInput}
              value={nameInput}
            ></TextInput>

            <SettingsButton title="Save Changes" onPress={handleUpdateName} />
          </SettingsTab>

          <TabSeparator color="#e3e3e3ff" />

          <SettingsTab
            icon="mail-outline"
            iconColor="#969696ff"
            title="Email"
            subtext={userContext?.user?.email}
            expand
            expandedByDefault={false}
          >
            <TextInput
              style={[styles.textInput, { color: inputColor }]}
              placeholder="Change Email"
              onChangeText={setEmailInput}
              value={emailInput}
            ></TextInput>

            <SettingsButton title="Save Changes" onPress={handleUpdateEmail} />
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
          <TextInput
            style={[styles.textInput, { color: inputColor }]}
            placeholder="Type new username..."
            onChangeText={setUsernameInput}
            value={usernameInput}
          ></TextInput>

          <SettingsButton title="Save Changes" onPress={handleUpdateUsername} />
        </SettingsTab>

        <TabSeparator />

        <SettingsTab
          icon="lock-closed"
          title="Change Password"
          expand
          expandedByDefault={false}
        >
          <TextInput
            style={[styles.passwordInput, { color: inputColor }]}
            placeholder="Current Password"
            onChangeText={setOldPasswordInput}
            value={oldPasswordInput}
          ></TextInput>

          <TextInput
            style={[styles.passwordInput, { color: inputColor }]}
            placeholder="New Password"
            onChangeText={setPasswordInput1}
            value={passwordInput1}
          ></TextInput>

          <TextInput
            style={[styles.passwordInput, { color: inputColor }]}
            placeholder="Re-type New Password"
            onChangeText={setPasswordInput2}
            value={passwordInput2}
          ></TextInput>

          <SettingsButton title="Save Changes" onPress={handleUpdatePassword} />

          {/* <ThemedText>Password: {userContext?.user?.password}</ThemedText> */}
        </SettingsTab>

        <TabSeparator style={{ marginBottom: 30 }} />

        <LoginButton title="Logout" onPress={handleLogout} color="#de2f2f" />

        <LoginButton
          title="Delete Account"
          onPress={handleDelete}
          color="#ff3b30"
        />
      </ScrollView>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    height: "auto",
  },
  textInput: {
    borderColor: "#bbbbbbff",
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    marginLeft: 46,
    padding: 10,
  },
  passwordInput: {
    borderColor: "#bbbbbbff",
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    marginLeft: 46,
    padding: 10,
    marginBottom: 10,
  },
  scrollContainer: {
    height: "100%",
    margin: 15,
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
});
