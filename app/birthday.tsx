import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { ArrowLeft } from 'lucide-react-native';

export default function BirthdayScreen() {
  const [date, setDate] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const handleNext = () => {
    router.push('/gender');
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
          <View style={[styles.progressFill, { width: '40%' }]} />
        </View>
        <Text style={styles.progressText}>1/3</Text>
      </View>

      <Animated.View entering={FadeInDown.delay(200)} style={styles.content}>
        <Text style={styles.title}>Your Birthday?</Text>
        <Text style={styles.description}>This helps us to find your match</Text>

        <View style={styles.dateContainer}>
          <View style={styles.dateInputContainer}>
            <TextInput
              style={styles.dateInput}
              placeholder="D D"
              maxLength={2}
              keyboardType="number-pad"
              value={date}
              onChangeText={setDate}
            />
            <Text style={styles.dateSeparator}>/</Text>
            <TextInput
              style={styles.dateInput}
              placeholder="M M"
              maxLength={2}
              keyboardType="number-pad"
              value={month}
              onChangeText={setMonth}
            />
            <Text style={styles.dateSeparator}>/</Text>
            <TextInput
              style={styles.dateInput}
              placeholder="Y Y Y Y"
              maxLength={4}
              keyboardType="number-pad"
              value={year}
              onChangeText={setYear}
            />
          </View>
          <Text style={styles.dateHint}>
            Your profile shows your age, not your date of birth
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.button}
          onPress={handleNext}
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
  dateContainer: {
    marginBottom: 32,
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dateInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 15,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    textAlign: 'center',
    minWidth: 70,
  },
  dateSeparator: {
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
    color: '#666',
    marginHorizontal: 8,
  },
  dateHint: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666',
  },
  button: {
    backgroundColor: '#FF4B6A',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
});