import { RootStackParamList } from '../../App';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Navigation props for SplashScreen
export type SplashScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

export interface SplashScreenProps {
  navigation: SplashScreenNavigationProp;
}

// Navigation props for HomeScreen
export type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

// Navigation props for SearchScreen
export type SearchScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Search'>;

export interface SearchScreenProps {
  navigation: SearchScreenNavigationProp;
}

// Navigation props for DetailsScreen
export type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;
export type DetailsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Details'>;

export interface DetailsScreenProps {
  route: DetailsScreenRouteProp;
  navigation: DetailsScreenNavigationProp;
}
