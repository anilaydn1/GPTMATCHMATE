import React from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, Button, Alert } from 'react-native';

// Ekran boyutunu al
const { width } = Dimensions.get('window');

const users = [
    { id: "1", name: 'Player 1' },
    { id: '2', name: 'Player 2' },
    { id: '3', name: 'Player 3' },
    { id: '4', name: 'Player 4' },
    { id: '5', name: 'Player 5' },
    { id: '6', name: 'Player 6' },
    { id: '7', name: 'Player 7' },
    { id: '8', name: 'Player 8' },
    { id: '9', name: 'Player 9' },
    { id: '10', name: 'Player 10' },
    { id: '11', name: 'Player 11' },
    { id: '12', name: 'Player 12' },
    { id: '13', name: 'Player 13' },
    { id: '14', name: 'Player 14' },
];

export default function TeamSelection() {
    const team1 = users.slice(0, 7); // Sol takım
    const team2 = users.slice(7, 14); // Sağ takım

    const handleFindPlayer = () => {
        Alert.alert('FindPlayer', 'Finding a player...');
    };

    return (
        <View style={styles.container}>
            <View style={styles.teamContainer}>
                <Text style={styles.teamTitle}>Team 1</Text>
                <FlatList
                    data={team1}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={[styles.playerItem, { width: width * 0.45 }]}>
                            <Text style={styles.playerName}>{item.name}</Text>
                        </View>
                    )}
                />
            </View>

            <View style={styles.divider} />

            <View style={styles.teamContainer}>
                <Text style={styles.teamTitle}>Team 2</Text>
                <FlatList
                    data={team2}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={[styles.playerItem, { width: width * 0.45 }]}>
                            <Text style={styles.playerName}>{item.name}</Text>
                        </View>
                    )}
                />
            </View>

            {/* Buton burada */}
            <View style={styles.findPlayerButtonContainer}>
                <Button title="Find Player" color="#004d00" onPress={handleFindPlayer} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#d6f5d6',
        paddingTop: 50,
    },
    teamContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 10,
    },
    teamTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    playerItem: {
        backgroundColor: '#ffd700',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        alignItems: 'center',
    },
    playerName: {
        fontSize: 16,
    },
    divider: {
        width: 1,
        backgroundColor: '#000',
    },
    findPlayerButtonContainer: {
        position: 'absolute',
        bottom: 20,
        left: width / 2 - 75, // Butonu ortalamak için
        width: 150,
    },
});
