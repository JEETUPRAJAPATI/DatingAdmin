import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { ArrowLeft, Check } from 'lucide-react-native';

const INTERESTS = [
  'Photography', 'Shopping', 'Karaoke', 'Yoga',
  'Cooking', 'Tennis', 'Art', 'Swimming',
  'Running', 'Music', 'Dance', 'Video games'
];

export default function InterestsScreen() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleNext = () => {
    router.push('/location');
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => router.back()}
      >
        <ArrowLeft size={24} color="#333" />
      </TouchableOpacity>

      <View style={styles.progress}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '60%' }]} />
        </View>
        <Text style={styles.progressText}>5/6</Text>
      </View>

      <Animated.View entering={FadeInDown.delay(200)} style={styles.content}>
        <Text style={styles.title}>Your interests</Text>
        <Text style={styles.description}>
          Select what you're passionate about
        </Text>

        <View style={styles.interestsGrid}>
          {INTERESTS.map((interest) => (
            <TouchableOpacity
              key={interest}
              style={[
                styles.interestButton,
                selectedInterests.includes(interest) && styles.interestSelected
              ]}
              onPress={() => toggleInterest(interest)}
            >
              <Text style={[
                styles.interestText,
                selectedInterests.includes(interest) && styles.interestTextSelected
              ]}>
                {interest}
              </Text>
              {selectedInterests.includes(interest) && (
                <Check size={16} color="#FF4B6A" style={styles.checkIcon} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity 
          style={[
            styles.button,
            selectedInterests.length === 0 && styles.buttonDisabled
          ]}
          onPress={handleNext}
          disabled={selectedInterests.length === 0}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </Animated.View>
    </ScrollView>
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
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 32,
    gap: 12,
  },
  interestButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  interestSelected: {
    backgroundColor: '#FFE5EA',
  },
  interestText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666',
  },
  interestTextSelected: {
    color: '#FF4B6A',
    fontFamily: 'Poppins-SemiBold',
  },
  checkIcon: {
    marginLeft: 6,
  },
  button: {
    backgroundColor: '#FF4B6A',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 20,
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