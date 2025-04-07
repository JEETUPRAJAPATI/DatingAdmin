import { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, Dimensions } from 'react-native';
import { X, Heart, Star, Filter } from 'lucide-react-native';
import Animated, { 
  FadeIn,
  SlideInUp,
  SlideOutDown,
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  withTiming,
  runOnJS
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const DUMMY_PROFILES = [
  {
    id: '1',
    name: 'Sarah Chen',
    age: 24,
    occupation: 'Professional Photographer',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60',
    distance: '2 miles away'
  },
  {
    id: '2',
    name: 'Emily Parker',
    age: 26,
    occupation: 'Fashion Designer',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=60',
    distance: '5 miles away'
  },
  {
    id: '3',
    name: 'Jessica Williams',
    age: 23,
    occupation: 'Yoga Instructor',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop&q=60',
    distance: '3 miles away'
  }
];

export default function HomeScreen() {
  const [currentProfile, setCurrentProfile] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [showMatch, setShowMatch] = useState(false);
  
  const swipeX = useSharedValue(0);
  const swipeY = useSharedValue(0);
  const cardRotate = useSharedValue(0);
  const cardScale = useSharedValue(1);
  const filterOpacity = useSharedValue(0);

  const handleNextProfile = () => {
    if (currentProfile < DUMMY_PROFILES.length - 1) {
      setCurrentProfile(prev => prev + 1);
    }
  };

  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: swipeX.value },
      { translateY: swipeY.value },
      { rotate: `${cardRotate.value}deg` },
      { scale: cardScale.value }
    ]
  }));

  const filterStyle = useAnimatedStyle(() => ({
    opacity: filterOpacity.value,
    transform: [{ translateY: withSpring(filterOpacity.value * 20) }]
  }));

  const handleLike = () => {
    cardScale.value = withSpring(1.1);
    swipeX.value = withSpring(SCREEN_WIDTH, {}, () => {
      runOnJS(setShowMatch)(true);
      runOnJS(handleNextProfile)();
      swipeX.value = 0;
      swipeY.value = 0;
      cardRotate.value = 0;
      cardScale.value = withSpring(1);
    });
  };

  const handleDislike = () => {
    cardScale.value = withSpring(0.95);
    swipeX.value = withSpring(-SCREEN_WIDTH, {}, () => {
      runOnJS(handleNextProfile)();
      swipeX.value = 0;
      swipeY.value = 0;
      cardRotate.value = 0;
      cardScale.value = withSpring(1);
    });
  };

  const handleSuperLike = () => {
    cardScale.value = withSpring(1.1);
    swipeY.value = withSpring(-SCREEN_WIDTH, {}, () => {
      runOnJS(handleNextProfile)();
      swipeX.value = 0;
      swipeY.value = 0;
      cardRotate.value = 0;
      cardScale.value = withSpring(1);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>DATINGLUV</Text>
        <TouchableOpacity onPress={() => setShowFilters(true)}>
          <Filter size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.cardContainer}>
        {DUMMY_PROFILES.map((profile, index) => {
          if (index === currentProfile) {
            return (
              <Animated.View 
                key={profile.id}
                style={[styles.card, cardStyle]}
              >
                <Image source={{ uri: profile.image }} style={styles.cardImage} />
                <View style={styles.cardContent}>
                  <Text style={styles.name}>{profile.name}, {profile.age}</Text>
                  <Text style={styles.occupation}>{profile.occupation}</Text>
                  <Text style={styles.distance}>{profile.distance}</Text>
                </View>
              </Animated.View>
            );
          }
          return null;
        })}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={[styles.actionButton, styles.dislike]} onPress={handleDislike}>
          <X size={24} color="#FF4B6A" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.superLike]} onPress={handleSuperLike}>
          <Star size={24} color="#5B37B7" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.like]} onPress={handleLike}>
          <Heart size={24} color="#4CD964" />
        </TouchableOpacity>
      </View>

      <Modal
        visible={showFilters}
        transparent={true}
        animationType="none"
      >
        <Animated.View 
          entering={SlideInUp}
          exiting={SlideOutDown}
          style={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filters</Text>
              <TouchableOpacity onPress={() => setShowFilters(false)}>
                <X size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <Text style={styles.filterLabel}>Location</Text>
            <TouchableOpacity style={styles.locationInput}>
              <Text style={styles.locationText}>New York City</Text>
              <Filter size={20} color="#666" />
            </TouchableOpacity>

            <Text style={styles.filterLabel}>Distance</Text>
            <View style={styles.sliderContainer}>
              <View style={styles.slider}>
                <View style={styles.sliderFill} />
              </View>
              <Text style={styles.sliderValue}>25 miles</Text>
            </View>

            <Text style={styles.filterLabel}>Age Range</Text>
            <View style={styles.sliderContainer}>
              <View style={styles.slider}>
                <View style={[styles.sliderFill, { width: '60%' }]} />
              </View>
              <Text style={styles.sliderValue}>18-35</Text>
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={styles.resetButton}
                onPress={() => setShowFilters(false)}
              >
                <Text style={styles.resetButtonText}>Reset</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.applyButton}
                onPress={() => setShowFilters(false)}
              >
                <Text style={styles.applyButtonText}>Apply Filters</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </Modal>

      <Modal
        visible={showMatch}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.matchContainer}>
          <Text style={styles.matchTitle}>It's a Match!</Text>
          <View style={styles.matchPhotos}>
            <Image 
              source={{ uri: DUMMY_PROFILES[currentProfile]?.image }}
              style={styles.matchPhoto}
            />
            <View style={styles.matchHeart}>
              <Heart size={32} color="#FF4B6A" fill="#FF4B6A" />
            </View>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=60' }}
              style={styles.matchPhoto}
            />
          </View>
          <TouchableOpacity 
            style={styles.startChatButton}
            onPress={() => setShowMatch(false)}
          >
            <Text style={styles.startChatText}>Start Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.keepSwipingButton}
            onPress={() => setShowMatch(false)}
          >
            <Text style={styles.keepSwipingText}>Keep Swiping</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  logo: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#FF4B6A',
  },
  cardContainer: {
    flex: 1,
    padding: 20,
  },
  card: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  cardContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  name: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: '#fff',
    marginBottom: 4,
  },
  occupation: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#fff',
    marginBottom: 4,
  },
  distance: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#fff',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 20,
  },
  actionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dislike: {
    borderWidth: 2,
    borderColor: '#FF4B6A',
  },
  superLike: {
    borderWidth: 2,
    borderColor: '#5B37B7',
  },
  like: {
    borderWidth: 2,
    borderColor: '#4CD964',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#333',
  },
  filterLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  locationInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    marginBottom: 20,
  },
  locationText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#333',
  },
  sliderContainer: {
    marginBottom: 20,
  },
  slider: {
    height: 4,
    backgroundColor: '#f5f5f5',
    borderRadius: 2,
    marginBottom: 8,
  },
  sliderFill: {
    height: '100%',
    width: '50%',
    backgroundColor: '#FF4B6A',
    borderRadius: 2,
  },
  sliderValue: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
  },
  resetButton: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    alignItems: 'center',
  },
  resetButtonText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#666',
  },
  applyButton: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FF4B6A',
    borderRadius: 12,
    alignItems: 'center',
  },
  applyButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#fff',
  },
  matchContainer: {
    flex: 1,
    backgroundColor: '#FF4B6A',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  matchTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 32,
    color: '#fff',
    marginBottom: 40,
  },
  matchPhotos: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  matchPhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#fff',
  },
  matchHeart: {
    marginHorizontal: 20,
  },
  startChatButton: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginBottom: 16,
    width: '100%',
  },
  startChatText: {
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
});