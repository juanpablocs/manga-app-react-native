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

interface MangaItemProps {
  item: Manga;
  onPress: (manga: Manga) => void;
}

/**
 * Manga item component for the search results list
 */
const MangaItem: React.FC<MangaItemProps> = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(item)}>
      <Image
        source={{
          uri: item.images?.jpg?.image_url || 'https://via.placeholder.com/100x150',
        }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.synopsis} numberOfLines={3}>
          {item.synopsis || 'No synopsis available'}
        </Text>
        <View style={styles.metaContainer}>
          <Text style={styles.metaText}>
            Score: {item.score ? item.score.toFixed(1) : 'N/A'}
          </Text>
          <Text style={styles.metaText}>
            {item.type || 'Unknown'} • {item.status || 'Unknown'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 120,
    borderRadius: 4,
    backgroundColor: '#f0f0f0',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  synopsis: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    flex: 1,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    color: '#888',
  },
});

export default MangaItem;
