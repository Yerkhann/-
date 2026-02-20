import React, { useState, useEffect } from 'react';
import { 
  Text, 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  StatusBar, 
  Platform,
  ActivityIndicator,
  BackHandler
} from 'react-native';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PDF_URL = "https://cdn.bookey.app/pdf/book/en/can't-hurt-me.pdf";
// Прослойка для Android, чтобы PDF открылся в браузере
const ANDROID_PDF_VIEWER = `https://docs.google.com/gview?embedded=true&url=${PDF_URL}`;

export default function App() {
  const [viewingBook, setViewingBook] = useState(false);
  const [loading, setLoading] = useState(false);

  // 1. Сохранение и загрузка состояния
  useEffect(() => {
    const checkLastSession = async () => {
      const saved = await AsyncStorage.getItem('@is_reading');
      if (saved === 'true') setViewingBook(true);
    };
    checkLastSession();

    // Обработка кнопки "Назад" на Android
    const backAction = () => {
      if (viewingBook) {
        closeBook();
        return true;
      }
      return false;
    };
    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => backHandler.remove();
  }, [viewingBook]);

  const openBook = async () => {
    setViewingBook(true);
    await AsyncStorage.setItem('@is_reading', 'true');
  };

  const closeBook = async () => {
    setViewingBook(false);
    await AsyncStorage.setItem('@is_reading', 'false');
  };

  // --- Экран списка ---
  if (!viewingBook) {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#F5F7FA" barStyle="dark-content" />
        <View style={styles.androidTopSpace} />
        
        <Text style={styles.mainTitle}>Моя Библиотека</Text>
        
        <View style={styles.listContainer}>
          <TouchableOpacity style={styles.card} onPress={openBook}>
            <View style={styles.iconCircle}>
              <Text style={styles.cardIcon}>📕</Text>
            </View>
            <View>
              <Text style={styles.cardTitle}>Can't Hurt Me</Text>
              <Text style={styles.cardSubtitle}>David Goggins (PDF)</Text>
            </View>
          </TouchableOpacity>
        </View>

        <AdBanner />
      </View>
    );
  }

  // --- Экран чтения (Android Optimized) ---
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <View style={styles.androidTopSpace} />
      
      <View style={styles.topBar}>
        <TouchableOpacity onPress={closeBook} style={styles.backButton}>
          <Text style={styles.backText}>✕ Закрыть книгу</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <WebView 
          source={{ uri: ANDROID_PDF_VIEWER }} 
          style={styles.webview}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          // Настройки для Android
          domStorageEnabled={true}
          javaScriptEnabled={true}
          scalesPageToFit={true}
          startInLoadingState={true}
        />
        {loading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={{marginTop: 10, color: '#666'}}>Загрузка страниц...</Text>
          </View>
        )}
      </View>

      <AdBanner />
    </View>
  );
}

// Рекламный блок
const AdBanner = () => (
  <View style={styles.adWrapper}>
    <View style={styles.adBox}>
      <Text style={styles.adLabel}>РЕКЛАМА</Text>
      <Text style={styles.adMainText}>Хочешь читать без рекламы? Купи Pro!</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA' },
  // Отступ специально для Android камер
  androidTopSpace: { height: StatusBar.currentHeight || 40 },
  
  mainTitle: { 
    fontSize: 28, fontWeight: 'bold', color: '#1A1A1A', 
    paddingHorizontal: 25, marginVertical: 20 
  },
  listContainer: { flex: 1, paddingHorizontal: 20 },
  card: { 
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', 
    padding: 15, borderRadius: 20, elevation: 4 
  },
  iconCircle: { 
    width: 50, height: 50, borderRadius: 25, backgroundColor: '#F0F7FF', 
    justifyContent: 'center', alignItems: 'center', marginRight: 15 
  },
  cardIcon: { fontSize: 24 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  cardSubtitle: { fontSize: 14, color: '#888' },

  topBar: { 
    height: 60, backgroundColor: '#FFF', flexDirection: 'row', 
    alignItems: 'center', paddingHorizontal: 15, borderBottomWidth: 1, borderBottomColor: '#EEE' 
  },
  backButton: { padding: 10 },
  backText: { color: '#FF3B30', fontWeight: 'bold' },
  
  content: { flex: 1 },
  webview: { flex: 1 },
  
  loaderContainer: { 
    ...StyleSheet.absoluteFillObject, 
    justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F7FA' 
  },

  adWrapper: { padding: 10, backgroundColor: '#FFF' },
  adBox: { 
    backgroundColor: '#F8F8F8', borderRadius: 12, padding: 15, 
    alignItems: 'center', borderWidth: 1, borderColor: '#DDD', borderStyle: 'dashed' 
  },
  adLabel: { fontSize: 10, color: '#999', marginBottom: 5 },
  adMainText: { fontSize: 13, fontWeight: '600', color: '#444' }
});
