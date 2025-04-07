import { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { FadeIn, SlideInUp } from 'react-native-reanimated';

export default function MatchScreen() {
  const [showMatch, setShowMatch] = useState(true);

  return (
    <View style={styles.container}>
      {showMatch ? (
        <Animated.View 
          entering={FadeIn}
          style={styles.matchContainer}
        >
          <Text style={styles.matchTitle}>It's a match, Jake!</Text>
          <View style={styles.matchImages}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60' }}
              style={styles.matchImage}
            />
            <View style={styles.heartContainer}>
              <Text style={styles.heart}>❤️</Text>
            </View>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=60' }}
              style={styles.matchImage}
            />
          </View>
          <TouchableOpacity style={styles.sayHelloButton}>
            <Text style={styles.sayHelloText}>Say hello</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.keepSwipingButton}
            onPress={() => setShowMatch(false)}
          >
            <Text style={styles.keepSwipingText}>Keep swiping</Text>
          </TouchableOpacity>
        </Animated.View>
      ) : (
        <Animated.View 
          entering={SlideInUp}
          style={styles.noMatchesContainer}
        >
          <Text style={styles.noMatchesTitle}>No matches yet</Text>
          <Text style={styles.noMatchesText}>Keep swiping to find your match!</Text>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF4B6A',
  },
  matchContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  matchTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: '#fff',
    marginBottom: 40,
  },
  matchImages: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  matchImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#fff',
  },
  heartContainer: {
    marginHorizontal: 20,
  },
  heart: {
    fontSize: 40,
  },
  sayHelloButton: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginBottom: 16,
    width: '100%',
  },
  sayHelloText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FF4B6A',
    textAlign: 'center',
  },
  keepSwipingButton: {
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#fff',
    width: '100%',
  },
  keepSwipingText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  noMatchesContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  noMatchesTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: '#fff',
    marginBottom: 8,
  },
  noMatchesText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});