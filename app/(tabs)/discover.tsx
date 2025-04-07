import { View, Text, StyleSheet, Image, Platform } from 'react-native';
import { useState } from 'react';

const USERS = [
  {
    id: '1',
    name: 'Sarah',
    age: 24,
    distance: '1.2 km',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: '2',
    name: 'Emily',
    age: 26,
    distance: '2.5 km',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: '3',
    name: 'Jessica',
    age: 28,
    distance: '3.0 km',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop&q=60',
  },
];

export default function DiscoverScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Discover</Text>
      <View style={styles.userGrid}>
        {USERS.map((user) => (
          <View key={user.id} style={styles.userCard}>
            <Image
              source={{ uri: user.image }}
              style={styles.userImage}
            />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.name}, {user.age}</Text>
              <Text style={styles.userDistance}>{user.distance}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: '#333',
    marginTop: 60,
    marginBottom: 20,
  },
  userGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'space-between',
  },
  userCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  userInfo: {
    padding: 12,
  },
  userName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  userDistance: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666',
  },
});