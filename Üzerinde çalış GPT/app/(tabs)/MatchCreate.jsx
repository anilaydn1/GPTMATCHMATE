import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Modal,
    Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import MapView, { Marker } from 'react-native-maps';

const MatchCreate = () => {
    const navigation = useNavigation();

    const [matchName, setMatchName] = useState('');
    const [matchDate, setMatchDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const [matchLocation, setMatchLocation] = useState(null);
    const [mapModalVisible, setMapModalVisible] = useState(false);

    const [matchDescription, setMatchDescription] = useState('');

    const handleCreateMatch = () => {
        // Backend'e kaydetme işlemini burada yapabilirsiniz.
        console.log('Maç Oluşturuldu:', { matchName, matchDate, matchLocation, matchDescription });
        navigation.navigate('TeamSelection');
    };

    const onSelectDate = (event, selectedDate) => {
        if (Platform.OS === 'android') {
            // Android'de event.type "set" ise tarih seçilmiş demektir, "dismissed" ise iptal.
            if (event.type === 'set') {
                setMatchDate(selectedDate || matchDate);
            }
            setShowDatePicker(false);
        } else {
            // iOS'da her değişiklikte event gelir, isterseniz "Done" butonu ekleyerek kontrol edebilirsiniz.
            setMatchDate(selectedDate || matchDate);
        }
    };

    const openDatePicker = () => {
        setShowDatePicker(true);
    };

    const openMapModal = () => {
        setMapModalVisible(true);
    };

    const selectLocation = (e) => {
        const { coordinate } = e.nativeEvent;
        setMatchLocation(coordinate);
    };

    const saveLocation = () => {
        setMapModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>

                <Text style={styles.title}>Maç Oluştur</Text>

                {/* Maç Adı */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Maç Adı</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Maç Adını Giriniz"
                        placeholderTextColor="#6B8E6F"
                        value={matchName}
                        onChangeText={setMatchName}
                    />
                </View>

                {/* Maç Tarihi/Saati */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Maç Tarihi ve Saati</Text>
                    <TouchableOpacity onPress={openDatePicker} style={styles.input}>
                        <Text style={styles.inputText}>
                            {matchDate.toLocaleString('tr-TR', { dateStyle: 'short', timeStyle: 'short' })}
                        </Text>
                    </TouchableOpacity>
                </View>
                {showDatePicker && (
                    <DateTimePicker
                        value={matchDate}
                        mode="datetime"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={onSelectDate}
                    // iOS'da modal otomatik kapanmaz. Android'de Ok/Cancel ile kontrol edilir.
                    />
                )}

                {/* Konum Seçimi */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Konum</Text>
                    <TouchableOpacity onPress={openMapModal} style={styles.input}>
                        <Text style={styles.inputText}>
                            {matchLocation
                                ? `Lat: ${matchLocation.latitude.toFixed(5)}, Lng: ${matchLocation.longitude.toFixed(5)}`
                                : "Konum Seçiniz"
                            }
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Açıklama */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Açıklama</Text>
                    <TextInput
                        style={[styles.input, styles.multiLineInput]}
                        placeholder="Maç ile ilgili ek notlar..."
                        placeholderTextColor="#6B8E6F"
                        value={matchDescription}
                        onChangeText={setMatchDescription}
                        multiline={true}
                        numberOfLines={4}
                    />
                </View>

            </ScrollView>

            {/* Create Butonu */}
            <TouchableOpacity style={styles.createButton} onPress={handleCreateMatch}>
                <Text style={styles.createButtonText}>Create</Text>
            </TouchableOpacity>

            {/* Harita Modal'ı */}
            <Modal visible={mapModalVisible} animationType="slide">
                <View style={{ flex: 1 }}>
                    <MapView
                        style={{ flex: 1 }}
                        initialRegion={{
                            latitude: 41.015137, // İstanbul örneği
                            longitude: 28.979530,
                            latitudeDelta: 0.05,
                            longitudeDelta: 0.05
                        }}
                        onPress={selectLocation}
                    >
                        {matchLocation && (
                            <Marker coordinate={matchLocation} />
                        )}
                    </MapView>
                    <View style={styles.mapButtonsContainer}>
                        <TouchableOpacity onPress={() => setMapModalVisible(false)} style={styles.mapCancelButton}>
                            <Text style={styles.mapButtonText}>İptal</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={saveLocation} style={styles.mapSaveButton}>
                            <Text style={styles.mapButtonText}>Kaydet</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E5F7E5', // Açık yeşil arka plan
        flex: 1
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 100
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#2F4F2F',
        textAlign: 'center',
        marginBottom: 30
    },
    inputContainer: {
        marginBottom: 20
    },
    label: {
        fontSize: 16,
        color: '#2F4F2F',
        marginBottom: 8
    },
    input: {
        backgroundColor: '#D0E8D0', // Gri-yeşil arka plan
        borderRadius: 10,
        padding: 12,
        fontSize: 16,
        color: '#2F4F2F',
        justifyContent: 'center'
    },
    inputText: {
        color: '#2F4F2F'
    },
    multiLineInput: {
        height: 100,
        textAlignVertical: 'top'
    },
    createButton: {
        position: 'absolute',
        bottom: 30,
        alignSelf: 'center',
        backgroundColor: 'yellow',
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 25,
        elevation: 3
    },
    createButtonText: {
        color: '#2F4F2F',
        fontSize: 18,
        fontWeight: '600'
    },
    mapButtonsContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff'
    },
    mapCancelButton: {
        flex: 1,
        padding: 15,
        backgroundColor: '#ccc',
        alignItems: 'center'
    },
    mapSaveButton: {
        flex: 1,
        padding: 15,
        backgroundColor: '#4C9A4C',
        alignItems: 'center'
    },
    mapButtonText: {
        color: '#fff',
        fontSize: 16
    }
});

export default MatchCreate;
