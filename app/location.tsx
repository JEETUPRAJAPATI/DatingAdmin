import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { ArrowLeft, MapPin } from 'lucide-react-native';

export default function LocationScreen() {
  const handleAllow = () => {
    router.push('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => router.back()}
      >
        <ArrowLeft size={24} color="#333" />
      </TouchableOpacity>

      <View style={styles.progress}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '100%' }]} />
        </View>
        <Text style={styles.progressText}>6/6</Text>
      </View>

      <Animated.View entering={FadeInDown.delay(200)} style={styles.content}>
        <Text style={styles.title}>So, are you from around here?</Text>
        <Text style={styles.description}>
          Share your location to help us find potential matches in your area
        </Text>

        <View style={styles.locationCircle}>
          <MapPin size={48} color="#FF4B6A" />
        </View>

        <TouchableOpacity 
          style={styles.button}
          onPress={handleAllow}
        >
          <Text style={styles.buttonText}>Allow Location</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    marginTop: 40,
    marginLeft: 20,
    marginBottom: 20,
  },
  progress: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#f5f5f5',
    borderRadius: 2,
    marginRight: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF4B6A',
    borderRadius: 2,
  },
  progressText: {
    fontFamily: 'Poppins-Regular',
    color: '#666',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#666',
    marginBottom: 48,
    textAlign: 'center',
  },
  locationCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#FFE5EA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 48,
  },
  button: {
    backgroundColor: '#FF4B6A',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
});