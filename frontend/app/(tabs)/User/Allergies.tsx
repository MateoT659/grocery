import React from 'react'
import { ThemedView } from '@/components/themed-view'
import { ThemedText } from '@/components/themed-text'
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { Image } from 'expo-image';
import { Dimensions, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import TabSeparator from '@/components/tab-seperator';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFish, faBan, faLeaf, faBreadSlice, faEgg, faWheatAwn} from '@fortawesome/free-solid-svg-icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Nut, Milk, Wheat, Leaf, Egg, Fish } from 'lucide-react-native';
import AllergyButton from '@/components/allergy-buttons';


export default function Allergies() {

  function handleAllergy() {
    return;
  }
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView style={styles.scrollContainer}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Allergies & Dietary Restrictions</ThemedText>
        </ThemedView>

        <TabSeparator />

        <ThemedView>
          <ThemedText type="subtitle">Add an Allergy</ThemedText>
        </ThemedView>
        
        <TabSeparator />

        <ThemedView>
          <ThemedText type="subtitle">Add a Dietary Restriction</ThemedText>
          {/* <FontAwesomeIcon icon={faFish} size={32} color="blue" />
          <FontAwesomeIcon icon={faBan} size={32} color="red" />
          <FontAwesomeIcon icon={faLeaf} size={32} color="green" />
          <FontAwesomeIcon icon={faBreadSlice} size={32} color="brown" />
          <FontAwesomeIcon icon={faEgg} size={32} color="purple" />
          <FontAwesomeIcon icon={faWheatAwn} size={32} color="brown" /> */}
          <MaterialCommunityIcons name="peanut-outline" size={32} color="rgba(153, 79, 0, 1)" />

          {/* <MaterialCommunityIcons name="leaf" size={32} color="rgba(0, 145, 43, 1)" /> */}
          <Nut size={32} color="brown" />
          <Milk size={32} color="blue" />
          <Wheat size={32} color="brown" />
          <Leaf size={32} color="green" />
          <Egg size={32} color="brown" />
          <Fish size={32} color="blue" />

          <AllergyButton title='Halal' onPress={handleAllergy} image={require('./halal.png')}></AllergyButton>

          {/*
              SHELLFISH,
              
              
              PEANUTS,
              SOYBEANS,
              TREE_NUTS,
              SESAME_SEEDS,
              DAIRY,
              LACTOSE, 

              -----------------


              VEGETARIAN,
              VEGAN,
              PESCATARIAN,
              HALAL,
              KOSHER,
              GLUTEN_FREE,
          */}

        </ThemedView>
    
      </ScrollView>
    </SafeAreaView>
      

  )
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    height: 'auto',
    backgroundColor: 'white'
  },
  scrollContainer: {
    height: Dimensions.get('window').height,
    margin: 15
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 20
  },
  stepContainer: {
    marginBottom: 8,
  },
});

