import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import { Text, View, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";

export default function Clan({ route, navigation }) {
    const [clan, setClan] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = route.params;

    const query = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            axios.get(`https://api.clashroyale.com/v1/clans/%23${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                const sortedMembers = response.data.memberList.sort((a, b) => {
                    if (a.role === 'leader') return -1;
                    if (b.role === 'leader') return 1;
                    return a.role.localeCompare(b.role);
                });
                setClan({ ...response.data, memberList: sortedMembers });
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
                <Text style={styles.title}>{clan.name}</Text>
                <View style={styles.description}>
                    <Text style={styles.text}>{clan.description}</Text>
                    <Text style={styles.text}>Score: {clan.clanScore}</Text>
                    <Text style={styles.text}>Trophées: {clan.clanWarTrophies}</Text>
                </View>
                <FlatList
                    data={clan.memberList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.memberItem}>
                            <Text style={styles.memberRole}>{item.role.toUpperCase()}</Text>
                            <Text style={styles.memberText}>{item.name}</Text>
                        </View>
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
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15,
        color: '#6200ee',
    },
    description: {
        alignItems: 'center',
        marginBottom: 15,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        width: '90%',
    },
    text: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        marginBottom: 5,
    },
    list: {
        width: '100%',
        alignItems: 'center',
    },
    memberItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#6200ee',
        padding: 10,
        marginVertical: 4,
        width: '90%',
        borderRadius: 10,
        alignItems: 'center',
    },
    memberRole: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'left',
        width: '30%',
    },
    memberText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'right',
        width: '70%',
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
