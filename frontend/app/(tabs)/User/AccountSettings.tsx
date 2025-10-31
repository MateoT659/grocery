import { UserContext } from '@/app/_layout';
import SettingsButton from '@/components/settings/settings-buttons';
import SettingsTab from '@/components/settings/settings-tab';
import TabSeparator from '@/components/settings/tab-seperator';
import { ThemedSafeAreaView } from '@/components/themed/themed-safe-area-view';
import { ThemedText } from '@/components/themed/themed-text';
import { ThemedView } from '@/components/themed/themed-view';
import React, { useContext, useState } from 'react';
import { ScrollView, StyleSheet, TextInput } from 'react-native';




export default function AccountSettings() {
  const userContext = useContext(UserContext);
  
  const [username, setUsername] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [password, setPassword] = useState("");
  const [passwordInput1, setPasswordInput1] = useState("");
  const [passwordInput2, setPasswordInput2] = useState("");
  const [oldPasswordInput, setOldPasswordInput] = useState("");

  const [name, setName] = useState("Sam Smith"); // remove defaults later
  const [nameInput, setNameInput] = useState("");
  const [email, setEmail] = useState("samsmith@udel.edu"); // remove defaults later
  const [emailInput, setEmailInput] = useState("");


  function handleUpdatePassword() {
    if (passwordInput1 !== passwordInput2) {
      alert("Passwords do not match!")
    }
    setPassword(passwordInput1); 
    setPasswordInput1('');
    setPasswordInput2('');
    setOldPasswordInput('');

  }
  return (
    <ThemedSafeAreaView style={styles.safeAreaContainer}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Account Settings</ThemedText>
      </ThemedView>
      <ScrollView style={styles.scrollContainer}>
      

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
          title='Name' subtext={name}
          expand
          expandedByDefault={false}
        >
          <TextInput 
            style={styles.textInput}
            placeholder="Change Name"
            onChangeText={setNameInput}
            value={nameInput}>  
          </TextInput>
          
          <SettingsButton
            title="Save Changes"
            onPress={() => {setName(nameInput); setNameInput(''); userContext?.updateUserField('firstName', nameInput)}}
          />

          <ThemedText>First name: {userContext?.user?.firstName}</ThemedText>

        </SettingsTab>

        <TabSeparator color='#e3e3e3ff'/>

        <SettingsTab 
          icon='mail-outline' 
          iconColor='#969696ff'
          title='Email' subtext={email}
          expand
          expandedByDefault={false}
        >
          <TextInput 
            style={styles.textInput}
            placeholder="Change Email"
            onChangeText={setEmailInput}
            value={emailInput}>  
          </TextInput>
          
          <SettingsButton
            title="Save Changes"
            onPress={() => {setEmail(emailInput); setEmailInput('');}}
          />

        </SettingsTab>
        
      </SettingsTab>

      <TabSeparator />
      
      <SettingsTab 
          icon='at' 
          title='Change Username'
          expand
          expandedByDefault={false}
      >
        <TextInput 
          style={styles.textInput}
          placeholder="Type new username..."
          onChangeText={setUsernameInput}
          value={usernameInput}>  
        </TextInput>

        <SettingsButton
            title="Save Changes"
            onPress={() => {setUsername(usernameInput); setUsernameInput('');}}
        />

        {/* <ThemedText>Username: {username} </ThemedText> */}

      </SettingsTab>


      <TabSeparator />

      <SettingsTab 
          icon='lock-closed' 
          title='Change Password'
          expand
          expandedByDefault={false}
      >
        <TextInput 
          style={styles.passwordInput}
          placeholder="Current Password"
          onChangeText={setOldPasswordInput}
          value={oldPasswordInput}>  
        </TextInput>

        <TextInput 
          style={styles.passwordInput}
          placeholder="New Password"
          onChangeText={setPasswordInput1}
          value={passwordInput1}>  
        </TextInput>

        <TextInput 
          style={styles.passwordInput}
          placeholder="Re-type New Password"
          onChangeText={setPasswordInput2}
          value={passwordInput2}>  
        </TextInput>
        
        <SettingsButton
            title="Save Changes"
            onPress={handleUpdatePassword}
        />

        {/* <ThemedText>Password: {password}</ThemedText> */}
      </SettingsTab>

      <TabSeparator style={{marginBottom: 30 }}/>

      </ScrollView>
    </ThemedSafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    height: 'auto',
    backgroundColor: 'white',
  },
  textInput: {
    color: 'black',
    borderColor: '#bbbbbbff',
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    marginLeft: 46,
    padding: 10,
  },
  passwordInput: {
    color: 'black',
    borderColor: '#bbbbbbff',
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    marginLeft: 46,
    padding: 10,
    marginBottom: 10
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
});