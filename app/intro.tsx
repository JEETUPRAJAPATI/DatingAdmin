import { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInRight,
  SlideOutLeft,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: 1,
    title: 'Make friends with the people like you',
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&auto=format&fit=crop&q=60',
    description: 'Connect with people who share your interests and passions.',
  },
  {
    id: 2,
    title: 'Find your Perfect match today',
    image: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=800&auto=format&fit=crop&q=60',
    description: 'Our smart matching system helps you find your ideal partner.',
  },
  {
    id: 3,
    title: 'Dating better than ever before',
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&auto=format&fit=crop&q=60',
    description: 'Experience dating in a whole new way with our modern approach.',
  },
];

export default function IntroScreen() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      router.replace('/auth');
    }
  };

  return (
    <View style={styles.container}>
      <Animated.Image
        key={slides[currentSlide].image}
        entering={FadeIn}
        exiting={FadeOut}
        source={{ uri: slides[currentSlide].image }}
        style={styles.image}
      />
      
      <View style={styles.content}>
        <Animated.Text
          entering={SlideInRight}
          exiting={SlideOutLeft}
          style={styles.title}
        >
          {slides[currentSlide].title}
        </Animated.Text>
        
        <Animated.Text
          entering={SlideInRight.delay(200)}
          exiting={SlideOutLeft}
          style={styles.description}
        >
          {slides[currentSlide].description}
        </Animated.Text>

        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentSlide && styles.activeDot,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleNext}
        >
          <Text style={styles.buttonText}>
            {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width,
    height: width,
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 30,
  },
  pagination: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ddd',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#FF4B6A',
    width: 20,
  },
  button: {
    backgroundColor: '#FF4B6A',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    textAlign: 'center',
  },
});