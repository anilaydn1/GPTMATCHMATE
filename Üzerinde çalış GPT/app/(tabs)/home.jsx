import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import Header from '../../components/Home/Header'; // Header entegrasyonu
import { Link } from 'expo-router';

export default function Home() {
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Header />
      </View>

      {/* Background Image */}
      <ImageBackground
        source={require('./../../assets/images/welcome_page_.jpg')} // Halı saha arka planı
        style={styles.backgroundImage}
      >
        {/* Buttons Section */}
        <View style={styles.buttonContainer}>
          <Link href="/MatchCreate" asChild>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Create Match</Text>
            </TouchableOpacity>
          </Link>
          <Link href="PlayerSearch" asChild>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Search Match</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 15,
    marginTop: 20,
    zIndex: 2, // Header'ı arka plandan öne taşır
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end', // Butonları alt kısma hizalar
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  button: {
    backgroundColor: '#FFD700', // Sarı renk
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
}); 
