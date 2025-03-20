import React, { useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import SearchHeader from '../components/SearchHeader';
import MangaItem from '../components/MangaItem';
import { useSearch } from '../hooks/useSearch';
import { Manga } from '../types/jikan';
import { SearchScreenProps } from '../types/navigation';

/**
 * Main search screen with search header and results list
 */
const SearchScreen: React.FC<SearchScreenProps> = ({ navigation }) => {
  const { searchQuery, results, loading, error, handleSearch, clearSearch } = useSearch();

  // Initial search on component mount
  useEffect(() => {
    handleSearch(''); // No initial search, wait for user input
  }, []);

  const handleMangaPress = (manga: Manga) => {
    navigation.navigate('Details', { mangaId: manga.mal_id, title: manga.title });
  };

  const navigateToHome = () => {
    navigation.navigate('Home');
  };

  const renderItem = ({ item }: { item: Manga }) => (
    <MangaItem item={item} onPress={handleMangaPress} />
  );

  const renderEmptyComponent = () => {
    if (loading) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#4A6572" />
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.homeButton} onPress={navigateToHome}>
            <Text style={styles.homeButtonText}>Volver al Inicio</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (searchQuery && !loading && results.length === 0) {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>No se encontraron resultados</Text>
          <TouchableOpacity style={styles.homeButton} onPress={navigateToHome}>
            <Text style={styles.homeButtonText}>Volver al Inicio</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (!searchQuery && !loading) {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>Escribe algo para buscar mangas</Text>
          <TouchableOpacity style={styles.homeButton} onPress={navigateToHome}>
            <Text style={styles.homeButtonText}>Volver al Inicio</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return null;
  };

  const renderFooter = () => {
    if (results.length > 0) {
      return (
        <TouchableOpacity style={styles.homeButtonFooter} onPress={navigateToHome}>
          <Text style={styles.homeButtonText}>Volver al Inicio</Text>
        </TouchableOpacity>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#4A6572" barStyle="light-content" />
      <SearchHeader
        searchQuery={searchQuery}
        onSearch={handleSearch}
        onClear={clearSearch}
      />
      <FlatList
        data={results}
        renderItem={renderItem}
        keyExtractor={(item) => item.mal_id.toString()}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyComponent}
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  listContent: {
    paddingVertical: 8,
    flexGrow: 1,
    paddingBottom: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  errorText: {
    fontSize: 16,
    color: '#e74c3c',
    textAlign: 'center',
    marginBottom: 16,
  },
  homeButton: {
    backgroundColor: '#4A6572',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 16,
  },
  homeButtonFooter: {
    backgroundColor: '#4A6572',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 16,
    alignSelf: 'center',
    marginBottom: 20,
  },
  homeButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default SearchScreen;
