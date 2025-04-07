import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { ArrowLeft, Check } from 'lucide-react-native';

export default function GenderScreen() {
  const [selectedGender, setSelectedGender] = useState<string | null>(null);

  const handleNext = () => {
    router.push('/looking-for');
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
          <View style={[styles.progressFill, { width: '70%' }]} />
        </View>
        <Text style={styles.progressText}>2/3</Text>
      </View>

      <Animated.View entering={FadeInDown.delay(200)} style={styles.content}>
        <Text style={styles.title}>What's your gender</Text>
        <Text style={styles.description}>Tell us about your gender</Text>

        <View style={styles.optionsContainer}>
          <TouchableOpacity 
            style={[
              styles.option,
              selectedGender === 'man' && styles.optionSelected
            ]}
            onPress={() => setSelectedGender('man')}
          >
            <Text style={[
              styles.optionText,
              selectedGender === 'man' && styles.optionTextSelected
            ]}>Man</Text>
            {selectedGender === 'man' && (
              <Check size={24} color="#FF4B6A" />
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.option,
              selectedGender === 'woman' && styles.optionSelected
            ]}
            onPress={() => setSelectedGender('woman')}
          >
            <Text style={[
              styles.optionText,
              selectedGender === 'woman' && styles.optionTextSelected
            ]}>Woman</Text>
            {selectedGender === 'woman' && (
              <Check size={24} color="#FF4B6A" />
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.option,
              selectedGender === 'other' && styles.optionSelected
            ]}
            onPress={() => setSelectedGender('other')}
          >
            <Text style={[
              styles.optionText,
              selectedGender === 'other' && styles.optionTextSelected
            ]}>Choose another</Text>
            {selectedGender === 'other' && (
              <Check size={24} color="#FF4B6A" />
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={[
            styles.button,
            !selectedGender && styles.buttonDisabled
          ]}
          onPress={handleNext}
          disabled={!selectedGender}
        >
          <Text style={styles.buttonText}>Next Step</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  backButton: {
    marginTop: 40,
    marginBottom: 20,
  },
  progress: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
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
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  optionsContainer: {
    marginBottom: 32,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    marginBottom: 16,
  },
  optionSelected: {
    backgroundColor: '#FFE5EA',
  },
  optionText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#333',
  },
  optionTextSelected: {
    color: '#FF4B6A',
    fontFamily: 'Poppins-SemiBold',
  },
  button: {
    backgroundColor: '#FF4B6A',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ffb3c1',
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
});