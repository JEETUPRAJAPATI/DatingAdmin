import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { ArrowLeft, Check } from 'lucide-react-native';

export default function LookingForScreen() {
  const [selected, setSelected] = useState<string | null>(null);

  const handleNext = () => {
    router.push('/upload-photos');
  };

  const options = [
    'A relationship',
    'Something casual',
    'I\'m not sure yet',
    'Prefer not to say'
  ];

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
        <Text style={styles.progressText}>3/3</Text>
      </View>

      <Animated.View entering={FadeInDown.delay(200)} style={styles.content}>
        <Text style={styles.title}>I am looking for</Text>
        <Text style={styles.description}>
          Provide us with further insights into your preferences
        </Text>

        <View style={styles.optionsContainer}>
          {options.map((option) => (
            <TouchableOpacity 
              key={option}
              style={[
                styles.option,
                selected === option && styles.optionSelected
              ]}
              onPress={() => setSelected(option)}
            >
              <Text style={[
                styles.optionText,
                selected === option && styles.optionTextSelected
              ]}>{option}</Text>
              {selected === option && (
                <Check size={24} color="#FF4B6A" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity 
          style={[
            styles.button,
            !selected && styles.buttonDisabled
          ]}
          onPress={handleNext}
          disabled={!selected}
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