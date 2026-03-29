import EyePasswordIcon from '@/components/eye_password_icon';
import LoginButton from '@/components/login/login-button';
import SettingsButton from '@/components/settings/settings-buttons';
import SettingsTab from '@/components/settings/settings-tab';
import TabSeparator from '@/components/settings/tab-seperator';
import { ThemedSafeAreaView } from '@/components/themed/themed-safe-area-view';
import { ThemedText } from '@/components/themed/themed-text';
import { ThemedView } from '@/components/themed/themed-view';
import { UserContext } from '@/contexts/user-context';
import { useThemeColor } from '@/hooks/use-theme-color';
import { updateUserFields } from '@/requests/Users';
import React, { useContext, useState } from 'react';
import { ScrollView, StyleSheet, KeyboardAvoidingView, TextInput, Platform } from 'react-native';
import FilterHeader from '@/components/chevron-back';




export default function AccountSettings() {
  const userContext = useContext(UserContext);
  
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput1, setPasswordInput1] = useState("");
  const [hidePasswordInput1, setHidePasswordInput1] = useState(true);
  const [passwordInput2, setPasswordInput2] = useState("");
  const [hidePasswordInput2, setHidePasswordInput2] = useState(true);
  const [oldPasswordInput, setOldPasswordInput] = useState("");
  const [hideOldPasswordInput, setHideOldPasswordInput] = useState(true);


  const inputColor = useThemeColor({}, 'text');

  const handleUpdateUsername = async () => {
    const updatedUsername = await updateUserFields(userContext.user?.id, { username: usernameInput });
    userContext?.updateUserField('username', usernameInput)
    setUsernameInput('');
  }

  const handleUpdateName = async () => {
    const updatedName = await updateUserFields(userContext.user?.id, { name: nameInput });
    userContext?.updateUserField('name', nameInput)
    setNameInput('');
  }

  const handleUpdateEmail = async () => {
    const updatedEmail = await updateUserFields(userContext.user?.id, { email: emailInput });
    userContext?.updateUserField('email', emailInput)
    setEmailInput('');
  }

  const handleUpdatePassword = async () => {
    if ((userContext?.user?.password !== "") && (oldPasswordInput === "" || passwordInput1 === "" || passwordInput2 === "")) {
      alert("One or more fields is empty. Please complete all fields.")
    }
    if (passwordInput1 !== passwordInput2) {
      alert("Passwords do not match!")
    }
    if (oldPasswordInput != userContext?.user?.password) {
      alert("Incorrect current password. Please input the correct current password.")
    }
    else {
      const updatedPassword = await updateUserFields(userContext.user?.id, { password: passwordInput1 });
      userContext?.updateUserField('password', passwordInput1)
    }

    setPasswordInput1('');
    setPasswordInput2('');
    setOldPasswordInput('');

  }

  const handleLogout = async () => {
    userContext.setUser(null);
  }

  return (
    <ThemedSafeAreaView style={styles.safeAreaContainer}>
      <FilterHeader />
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Account Settings</ThemedText>
      </ThemedView>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView style={styles.scrollContainer} keyboardShouldPersistTaps='handled' contentContainerStyle={{ paddingBottom: 10 }}>
        

        <TabSeparator />

        <SettingsTab 
            icon='person'
            title='Personal Details'
            expand
            expandedByDefault={false}
        >
          <TabSeparator color='#e3e3e3ff'/>

          <SettingsTab 
            icon='person-outline' 
            iconColor='#969696ff'
            title='Name' subtext={userContext?.user?.name}
            expand
            expandedByDefault={false}
          >
            <TextInput 
              style={[styles.textInput, { color: inputColor }]}
              placeholder="Change Name"
              onChangeText={setNameInput}
              value={nameInput}>  
            </TextInput>
            
            <SettingsButton
              title="Save Changes"
              onPress={handleUpdateName}
            />

          </SettingsTab>

          <TabSeparator color='#e3e3e3ff'/>

          <SettingsTab 
            icon='mail-outline' 
            iconColor='#969696ff'
            title='Email' subtext={userContext?.user?.email}
            expand
            expandedByDefault={false}
          >
            <TextInput 
              style={[styles.textInput, { color: inputColor }]}
              placeholder="Change Email"
              onChangeText={setEmailInput}
              value={emailInput}>  
            </TextInput>
            
            <SettingsButton
              title="Save Changes"
              onPress={handleUpdateEmail}
            />

          </SettingsTab>
          
        </SettingsTab>

        <TabSeparator />
        
        <SettingsTab 
            icon='at' 
            title='Change Username' subtext={`@${userContext?.user?.username}`}
            expand
            expandedByDefault={false}
        >
          <TextInput 
            style={[styles.textInput, { color: inputColor }]}
            placeholder="Type new username..."
            onChangeText={setUsernameInput}
            value={usernameInput}>  
          </TextInput>

          <SettingsButton
              title="Save Changes"
              onPress={handleUpdateUsername}
          />


        </SettingsTab>


        <TabSeparator />

        <SettingsTab 
            icon='lock-closed' 
            title='Change Password'
            expand
            expandedByDefault={false}
        >
          <ThemedView style={styles.passwordContainer}>
            <TextInput 
              style={[styles.passwordInput, { color: inputColor }]}
              placeholder="Current Password"
              onChangeText={setOldPasswordInput}
              value={oldPasswordInput} 
              secureTextEntry={hideOldPasswordInput}>  
            </TextInput>
            <EyePasswordIcon onPress={() => setHideOldPasswordInput(prev => !prev)} hidePassword={hideOldPasswordInput}/>
          </ThemedView>

          <ThemedView style={styles.passwordContainer}>
            <TextInput 
              style={[styles.passwordInput, { color: inputColor }]}
              placeholder="New Password"
              onChangeText={setPasswordInput1}
              value={passwordInput1}
              secureTextEntry={hidePasswordInput1}>  
            </TextInput>
            <EyePasswordIcon onPress={() => setHidePasswordInput1(prev => !prev)} hidePassword={hidePasswordInput1}/>
          </ThemedView>

          <ThemedView style={styles.passwordContainer}>
            <TextInput 
              style={[styles.passwordInput, { color: inputColor }]}
              placeholder="Re-type New Password"
              onChangeText={setPasswordInput2}
              value={passwordInput2}
              secureTextEntry={hidePasswordInput2}>    
            </TextInput>
            <EyePasswordIcon onPress={() => setHidePasswordInput2(prev => !prev)} hidePassword={hidePasswordInput2}/>
          </ThemedView>

          
          <SettingsButton
              title="Save Changes"
              onPress={handleUpdatePassword}
          />

          {/* <ThemedText>Password: {userContext?.user?.password}</ThemedText> */}

        </SettingsTab>

        <TabSeparator style={{marginBottom: 30 }}/>

        <LoginButton
          title="Logout"
          onPress={handleLogout}
          color="#de2f2f"
        />

        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedSafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    height: 'auto',
  },
  textInput: {
    borderColor: '#bbbbbbff',
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    marginLeft: 46,
    padding: 10,
  },
  scrollContainer: {
    height: '100%',
    margin: 15
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 20,
    marginLeft: 15
  },
  stepContainer: {
    marginBottom: 8,
  },
  passwordContainer: {
    position: 'relative',
    justifyContent: 'center',
  },
  passwordInput: {
    borderColor: '#bbbbbbff',
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    paddingLeft: 10,
    paddingRight: 40,
    fontSize: 18  
  },
});