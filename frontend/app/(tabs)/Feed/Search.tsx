import React, { useState } from 'react';
import { Modal, View, TextInput, TouchableOpacity, Text, StyleSheet, FlatList, StatusBar } from 'react-native'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import {Ionicons} from '@expo/vector-icons'

interface SearchModalComp {
  visible: boolean;
  onclose: () => void;
  onsearch: (query: string) => void;  
}

export default function SearchModal ({visible, onclose, onsearch}: SearchModalComp) {

const [searchQuery, setSearchQuery] = useState('');
const [recentSearches, setRecentSearches] = useState(['']);

//function to active search button
const handlesearch = () => {
  if (searchQuery.trim()){
    if (!recentSearches.includes(searchQuery.trim())){
      setRecentSearches([searchQuery.trim(), ...recentSearches]);
    }
  }
  onsearch(searchQuery);
  setSearchQuery('');
  onclose();
}
}