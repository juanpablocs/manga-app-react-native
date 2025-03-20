import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  RefreshControl,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { getTopManga, getMangaRecommendations } from '../api/jikanApi';
import { Manga } from '../types/jikan';
import Carousel from '../components/Carousel';
import MangaCarouselItem from '../components/MangaCarouselItem';
import MangaItem from '../components/MangaItem';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [topManga, setTopManga] = useState<Manga[]>([]);
  const [recommendedManga, setRecommendedManga] = useState<Manga[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Obtener mangas populares
      const topResponse = await getTopManga(1, 10);
      setTopManga(topResponse.data || []);

      // Obtener recomendaciones
      const recommendationsResponse = await getMangaRecommendations(6);
      setRecommendedManga(recommendationsResponse.data || []);
    } catch (err) {
      console.error('Error fetching manga data:', err);
      setError('No se pudieron cargar los datos. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const handleMangaPress = (manga: Manga) => {
    navigation.navigate('Details', { mangaId: manga.mal_id, title: manga.title });
  };

  const navigateToSearch = () => {
    navigation.navigate('Search');
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4A6572" />
        <Text style={styles.loadingText}>Cargando mangas populares...</Text>
      </View>
    );
  }

  if (error && !refreshing) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchData}>
          <Text style={styles.retryButtonText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#4A6572" barStyle="light-content" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={['#4A6572']} />
        }
      >
        <View style={styles.header}>
          <Text style={styles.appTitle}>Manga Explorer</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mangas Populares</Text>
          <View style={styles.carouselContainer}>
            {topManga.length > 0 ? (
              <Carousel
                data={topManga}
                renderItem={(item, index) => (
                  <MangaCarouselItem item={item} onPress={handleMangaPress} />
                )}
                autoplay={true}
                loop={true}
              />
            ) : (
              <Text style={styles.emptyText}>No hay mangas populares disponibles</Text>
            )}
          </View>
        </View>

        <TouchableOpacity style={styles.searchCard} onPress={navigateToSearch}>
          <View style={styles.searchCardContent}>
            <Text style={styles.searchCardTitle}>¿Buscas algo específico?</Text>
            <Text style={styles.searchCardText}>
              Explora nuestra extensa biblioteca de mangas y encuentra tu próxima lectura favorita.
            </Text>
            <View style={styles.searchButton}>
              <Text style={styles.searchButtonText}>Buscar Mangas</Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recomendados para ti</Text>
          <View style={styles.recommendationsContainer}>
            {recommendedManga.length > 0 ? (
              recommendedManga.map((manga) => (
                <MangaItem key={manga.mal_id} item={manga} onPress={handleMangaPress} />
              ))
            ) : (
              <Text style={styles.emptyText}>No hay recomendaciones disponibles</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
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
    backgroundColor: '#4A6572',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 16,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  carouselContainer: {
    marginBottom: 8,
  },
  searchCard: {
    marginHorizontal: 16,
    marginVertical: 16,
    backgroundColor: '#4A6572',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchCardContent: {
    padding: 20,
    alignItems: 'center',
  },
  searchCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  searchCardText: {
    fontSize: 14,
    color: '#F0F0F0',
    textAlign: 'center',
    marginBottom: 16,
  },
  searchButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  searchButtonText: {
    color: '#4A6572',
    fontWeight: 'bold',
    fontSize: 14,
  },
  recommendationsContainer: {
    paddingHorizontal: 8,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginVertical: 20,
  },
});

export default HomeScreen;
