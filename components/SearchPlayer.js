import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Button, TextInput, View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, Keyboard } from "react-native";

export const SearchPlayer = () => {
    const [player, setPlayer] = useState('');
    const navigation = useNavigation();

    const handleSubmit = () => {
        navigation.navigate('Player', { id: player });
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={styles.inner}>
                    <TextInput
                        style={styles.input}
                        placeholder="Player tag"
                        value={player}
                        onChangeText={setPlayer}
                        placeholderTextColor="#aaa"
                    />
                    <Button title="Envoyer" onPress={handleSubmit} color="#6200ee" />
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    inner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    input: {
        width: '80%',
        height: 50,
        borderColor: '#6200ee',
        borderWidth: 2,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        marginBottom: 15,
        backgroundColor: '#fff',
        color: '#000',
    },
});
