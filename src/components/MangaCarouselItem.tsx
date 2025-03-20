import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Manga } from '../types/jikan';

const { width } = Dimensions.get('window');

interface MangaCarouselItemProps {
  item: Manga;
  onPress: (manga: Manga) => void;
}

const MangaCarouselItem: React.FC<MangaCarouselItemProps> = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(item)}
      activeOpacity={0.9}
    >
      <Image
        source={{
          uri: item.images?.jpg?.large_image_url || item.images?.jpg?.image_url || 'https://via.placeholder.com/300x450',
        }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.overlay}>
        <View style={styles.infoContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>
          <View style={styles.statsRow}>
            <View style={styles.statContainer}>
              <Text style={styles.statValue}>{item.score ? item.score.toFixed(1) : 'N/A'}</Text>
              <Text style={styles.statLabel}>Score</Text>
            </View>
            <View style={styles.statContainer}>
              <Text style={styles.statValue}>{item.type || 'N/A'}</Text>
              <Text style={styles.statLabel}>Type</Text>
            </View>
            <View style={styles.statContainer}>
              <Text style={styles.statValue}>{item.status || 'N/A'}</Text>
              <Text style={styles.statLabel}>Status</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.85,
    height: 300,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  infoContainer: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statContainer: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#F0F0F0',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default MangaCarouselItem;
