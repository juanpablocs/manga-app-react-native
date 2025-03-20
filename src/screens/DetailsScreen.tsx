import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { getMangaDetails } from '../api/jikanApi';
import { Manga } from '../types/jikan';
import { DetailsScreenProps } from '../types/navigation';

const { width } = Dimensions.get('window');

/**
 * Details screen to display full manga information
 */
const DetailsScreen: React.FC<DetailsScreenProps> = ({ route, navigation }) => {
  const { mangaId } = route.params;
  const [manga, setManga] = useState<Manga | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMangaDetails = async () => {
      try {
        setLoading(true);
        const response = await getMangaDetails(mangaId);
        setManga(response.data);
      } catch (err) {
        setError('Failed to load manga details');
        console.error('Error fetching manga details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMangaDetails();
  }, [mangaId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4A6572" />
      </View>
    );
  }

  if (error || !manga) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error || 'Something went wrong'}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.retryButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Image
          source={{
            uri: manga.images?.jpg?.large_image_url || manga.images?.jpg?.image_url || 'https://via.placeholder.com/350x500',
          }}
          style={styles.coverImage}
          resizeMode="cover"
        />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{manga.title}</Text>
          {manga.title_english && manga.title_english !== manga.title && (
            <Text style={styles.titleEnglish}>{manga.title_english}</Text>
          )}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Score</Text>
              <Text style={styles.statValue}>{manga.score ? manga.score.toFixed(1) : 'N/A'}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Rank</Text>
              <Text style={styles.statValue}>#{manga.rank || 'N/A'}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Popularity</Text>
              <Text style={styles.statValue}>#{manga.popularity || 'N/A'}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.infoSection}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Status:</Text>
          <Text style={styles.infoValue}>{manga.status || 'Unknown'}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Type:</Text>
          <Text style={styles.infoValue}>{manga.type || 'Unknown'}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Volumes:</Text>
          <Text style={styles.infoValue}>{manga.volumes || 'Unknown'}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Chapters:</Text>
          <Text style={styles.infoValue}>{manga.chapters || 'Unknown'}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Published:</Text>
          <Text style={styles.infoValue}>
            {manga.published?.string || 'Unknown'}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Synopsis</Text>
        <Text style={styles.synopsis}>
          {manga.synopsis || 'No synopsis available'}
        </Text>
      </View>

      {manga.genres && manga.genres.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Genres</Text>
          <View style={styles.genresContainer}>
            {manga.genres.map((genre) => (
              <View key={genre.mal_id} style={styles.genreTag}>
                <Text style={styles.genreText}>{genre.name}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {manga.authors && manga.authors.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Authors</Text>
          <Text style={styles.authorText}>
            {manga.authors.map((author) => author.name).join(', ')}
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  errorText: {
    fontSize: 16,
    color: '#e74c3c',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#4A6572',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  coverImage: {
    width: 120,
    height: 180,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
  },
  titleContainer: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  titleEnglish: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  statItem: {
    alignItems: 'center',
    marginRight: 16,
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  infoSection: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  infoLabel: {
    width: 100,
    fontSize: 14,
    color: '#888',
    fontWeight: '500',
  },
  infoValue: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  synopsis: {
    fontSize: 14,
    lineHeight: 22,
    color: '#333',
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  genreTag: {
    backgroundColor: '#F0F0F0',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  genreText: {
    fontSize: 12,
    color: '#666',
  },
  authorText: {
    fontSize: 14,
    color: '#333',
  },
});

export default DetailsScreen;
