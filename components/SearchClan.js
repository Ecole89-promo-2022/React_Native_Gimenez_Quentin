import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Button, TextInput, View, StyleSheet, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";

export const SearchClan = () => {
    const [clan, setClan] = useState('');
    const navigation = useNavigation();

    const handleSubmit = () => {
        navigation.navigate('Clan', { id: clan });
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    <TextInput
                        style={styles.input}
                        placeholder="Clan tag"
                        value={clan}
                        onChangeText={setClan}
                        placeholderTextColor="#aaa"
                    />
                    <Button title="Envoyer" onPress={handleSubmit} color="#6200ee" />
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f9fa",
        padding: 20,
    },
    inner: {
        width: "100%",
        alignItems: "center",
    },
    input: {
        width: "80%",
        height: 50,
        borderColor: "#6200ee",
        borderWidth: 2,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        marginBottom: 15,
        backgroundColor: "#fff",
        color: "#000",
    },
});
