import React, { useState } from 'react';
import { Modal, View, TextInput, TouchableOpacity, Text, StyleSheet, FlatList, StatusBar } from 'react-native'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import {Ionicons} from '@expo/vector-icons'

interface SearchModalComp {
  Visible: boolean;
  OnClose: () => void;
  OnSearch: (query: string) => void;  
}

export default function SearchModal ({Visible, OnClose, OnSearch}: SearchModalComp) {

const [searchQuery, setSearchQuery] = useState('');
const [recentSearches, setRecentSearches] = useState(['']);

//function to active search button
const handleSearch = () => {
  if (searchQuery.trim()){
    if (!recentSearches.includes(searchQuery.trim())){
      setRecentSearches([searchQuery.trim(), ...recentSearches]);
    }
  }
  OnSearch(searchQuery);
  setSearchQuery('');
  OnClose();
}

//cancle option 
const handleclose = () => {
  setSearchQuery('');
  OnClose();
}

//removes recent search
const removesearch = (term : string) => {
  setRecentSearches(recentSearches.filter(item => item !== term));
}

//use recent search to search- history
const searchpress = (term: string) => {
  setSearchQuery(term);
}
}