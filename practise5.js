import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  Modal,
} from 'react-native';

export default function App() {
  const [selectedPlace, setSelectedPlace] = useState(null);

  // Картадағы нысандар (Деректер базасы)
  const locations = [
    {
      id: 1,
      title: 'Мәшһүр Жүсіп мешіті',
      description:
        'Павлодар қаласының басты символы. Ерекше сәулет өнерінің үлгісі.',
      image: 'https://pavlodarnews.kz',
      top: '40%',
      left: '45%', // Картадағы орны (маркер)
    },
    {
      id: 2,
      title: 'Орталық жағалау',
      description: 'Ертіс өзенінің бойындағы демалыс аймағы.',
      image: 'https://kokshetau.asia',
      top: '60%',
      left: '20%',
    },
    {
      id: 3,
      title: 'City Center',
      description: 'Қаланың ең ірі сауда және ойын-сауық орталығы.',
      image: 'https://pavlodar.city',
      top: '30%',
      left: '70%',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* КАРТА КӨРІНІСІ (ФОНДАҒЫ СУРЕТ) */}
      <View style={styles.mapContainer}>
        <Image
          source={{
            uri: 'https://cdn.travelask.ru/uploads/embedded_map_attachments/files/000/001/325/original/%D0%9F%D0%B0%D0%B2%D0%BB%D0%BE%D0%B4%D0%B0%D1%80.jpg',
          }}
          style={styles.mapBackground}
        />

        {/* МАРКЕРЛЕР (Нүктелер) */}
        {locations.map((place) => (
          <TouchableOpacity
            key={place.id}
            style={[styles.marker, { top: place.top, left: place.left }]}
            onPress={() => setSelectedPlace(place)}>
            <View style={styles.markerPoint} />
            <View style={styles.markerLabel}>
              <Text style={styles.markerText}>
                {place.title.substring(0, 10)}...
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* НЫСАН ТУРАЛЫ АҚПАРАТ (MODAL) */}
      <Modal
        visible={selectedPlace !== null}
        transparent={true}
        animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedPlace && (
              <>
                <Image
                  source={{ uri: selectedPlace.image }}
                  style={styles.placeImage}
                />
                <Text style={styles.modalTitle}>{selectedPlace.title}</Text>
                <Text style={styles.modalDesc}>
                  {selectedPlace.description}
                </Text>

                <View style={styles.buttonGroup}>
                  <TouchableOpacity style={styles.routeBtn}>
                    <Text style={styles.btnText}>Маршрут салу</Text>
                    
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.closeBtn}
                    onPress={() => setSelectedPlace(null)}>
                    <Text style={styles.closeBtnText}>Жабу</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      <View style={styles.footer}>
        <Text style={styles.footerInfo}>📍 Картадағы маркерлерді басыңыз</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#eef' },
  mapContainer: { flex: 1, position: 'relative' },
  mapBackground: { width: '100%', height: '100%', opacity: 0.8 },

  // Маркер стильдері
  marker: { position: 'absolute', alignItems: 'center' },
  markerPoint: {
    width: 15,
    height: 15,
    backgroundColor: 'red',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fff',
  },
  markerLabel: {
    backgroundColor: '#fff',
    padding: 4,
    borderRadius: 5,
    marginTop: 4,
    elevation: 3,
  },
  markerText: { fontSize: 10, fontWeight: 'bold' },

  // Модаль стильдері
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 25,
    alignItems: 'center',
  },
  placeImage: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    marginBottom: 15,
  },
  modalTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  modalDesc: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },

  buttonGroup: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  routeBtn: {
    backgroundColor: '#27ae60',
    flex: 1,
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
    alignItems: 'center',
  },
  closeBtn: {
    backgroundColor: '#ddd',
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnText: { color: '#fff', fontWeight: 'bold' },
  closeBtnText: { color: '#333', fontWeight: 'bold' },

  footer: { padding: 15, backgroundColor: '#fff', alignItems: 'center' },
  footerInfo: { color: '#7f8c8d', fontWeight: '500' },
});
