import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import { Text, View, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";

export default function Clans({ route, navigation }) {
    const [clans, setClans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id, name } = route.params;
    
    const query = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            axios.get(`https://api.clashroyale.com/v1/locations/${id}/rankings/clans?limit=20`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                setClans(response.data.items);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        query();
    }, []);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#007bff" />
                <Text style={styles.loadingText}>Chargement en cours...</Text>
            </View>
        );
    } else if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Erreur de serveur</Text>
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Top 20 des clans pour {name}</Text>
                <FlatList
                    data={clans}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                            style={styles.item} 
                            onPress={() => navigation.navigate('Clan', { id: item.tag.slice(1) })}>
                            <Text style={styles.itemText}>{item.rank}. {item.name}</Text>
                        </TouchableOpacity>
                    )}
                    contentContainerStyle={styles.list}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: 'black',
    },
    list: {
        width: '100%',
    },
    item: {
        backgroundColor: '#6200ee',
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 10,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    itemText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#6c757d',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        fontWeight: 'bold',
    },
});