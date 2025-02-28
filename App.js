import { StatusBar } from 'expo-status-bar';
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Home from './components/Home';
import Profile from './components/Profile';
import CardDetails from './components/CardDetails';
import Countries from './components/Countries';
import Clans from './components/Clans';
import Clan from './components/Clan';
import Player from './components/Player';
import { SearchPlayer } from './components/SearchPlayer';
import { SearchClan } from './components/SearchClan';

const Stack = createNativeStackNavigator();
const logo = require('./assets/logo.png');

const CustomHeader = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => setMenuVisible(true)}>
        <Text style={styles.headerTitle}>Menu</Text>
      </TouchableOpacity>
      <Image source={logo} style={{ width: 150, height: 50 }} resizeMode='contain' />

      {/* MENU MODAL */}
      <Modal animationType="fade" transparent={true} visible={menuVisible}>
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setMenuVisible(false)}>
              <Ionicons name="close" size={30} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => { navigation.navigate('Home'); setMenuVisible(false); }}>
              <Text style={styles.menuText}>🏠 Accueil</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => { navigation.navigate('Profile'); setMenuVisible(false); }}>
              <Text style={styles.menuText}>👤 Profil</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => { navigation.navigate('SearchPlayer'); setMenuVisible(false); }}>
              <Text style={styles.menuText}>🔍 Search Player</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => { navigation.navigate('SearchClan'); setMenuVisible(false); }}>
              <Text style={styles.menuText}>🏆 Search Clan</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => { navigation.navigate('Countries'); setMenuVisible(false); }}>
              <Text style={styles.menuText}>🌍 Countries</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: (props) => <CustomHeader {...props} />
        }}
      >
        <Stack.Screen name="Home" component={Home} options={{ title: 'Home' }} />
        <Stack.Screen name="Profile" component={Profile} options={{ title: 'Profile' }} />
        <Stack.Screen name="CardDetails" component={CardDetails} options={{ title: 'Détails de la carte' }} />
        <Stack.Screen name="Countries" component={Countries} options={{ title: 'Pays Disponibles' }} />
        <Stack.Screen name="Clans" component={Clans} options={{ title: 'Clans' }} />
        <Stack.Screen name="Clan" component={Clan} options={{ title: 'Clan' }} />
        <Stack.Screen name="Player" component={Player} options={{ title: 'Player' }} />
        <Stack.Screen name="SearchPlayer" component={SearchPlayer} options={{title: 'SearchPlayer'}} />
        <Stack.Screen name="SearchClan" component={SearchClan} options={{title: 'SearchClan'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: '#6200ee',
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 280,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 8,
  },
  menuItem: {
    width: '100%',
    paddingVertical: 12,
    marginVertical: 5,
    borderRadius: 8,
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
});
