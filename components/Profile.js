import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, Text, TouchableOpacity, View, TextInput, StyleSheet } from "react-native";
import { useState } from "react";

export default function Profile() {
    const [token, setToken] = useState('');

    const handleSubmit = async () => {
        try {
            await AsyncStorage.setItem('token', token);
            Alert.alert('Clé API enregistrée');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenue sur la page de profil</Text>
            <Text style={styles.description}>
                Vous devez fournir une clé API que vous allez récupérer sur le site officiel :
            </Text>
            <TouchableOpacity onPress={() => Alert.alert("Lien", "Ouvrez ce lien dans votre navigateur : https://developer.clashroyale.com/")}>
                <Text style={styles.link}>https://developer.clashroyale.com/</Text>
            </TouchableOpacity>
            <Text style={styles.description}>
                Une fois votre clé API créée, entrez-la dans le champ ci-dessous :
            </Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Votre clé API"
                    placeholderTextColor="#aaa"
                    value={token}
                    onChangeText={setToken}
                />
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Enregistrer</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f4f4f4",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#333",
    },
    description: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 10,
        color: "#666",
    },
    link: {
        color: "#007AFF",
        textDecorationLine: "underline",
        fontSize: 16,
        marginBottom: 10,
    },
    inputContainer: {
        width: "100%",
        alignItems: "center",
        marginTop: 15,
    },
    input: {
        width: "90%",
        height: 45,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: "#fff",
        fontSize: 16,
    },
    button: {
        backgroundColor: "#6200ee",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 10,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
