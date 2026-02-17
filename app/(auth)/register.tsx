import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, Image } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { signUp } = useAuth();
    const router = useRouter();

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleRegister = async () => {
        // Validation
        if (!email || !password || !confirmPassword) {
            setError('Por favor completa todos los campos');
            return;
        }

        if (!validateEmail(email)) {
            setError('Por favor ingresa un email válido');
            return;
        }

        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        setError('');
        setLoading(true);

        const { error } = await signUp(email, password);

        if (error) {
            setError(error.message || 'Error al crear la cuenta');
            setLoading(false);
        } else {
            // Navigation is handled by the index.tsx redirect logic
            setLoading(false);
        }
    };

    // DEBUG LAYOUT
    return (
        <View style={{ flex: 1, backgroundColor: '#0f172a', alignItems: 'center', justifyContent: 'center' }}>
            <ScrollView
                style={{ width: '100%' }}
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}
            >
                <View style={{ width: '100%', maxWidth: 400, alignItems: 'center' }}>
                    <Image
                        source={require('../../assets/logo.png')}
                        style={{ width: 100, height: 100, marginBottom: 20 }}
                        resizeMode="contain"
                    />
                    <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 30 }}>
                        DEBUG MODE: Register
                    </Text>

                    {/* Error Message */}
                    {error ? (
                        <View style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', borderColor: '#ef4444', borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 20, width: '100%' }}>
                            <Text style={{ color: '#ef4444', textAlign: 'center' }}>{error}</Text>
                        </View>
                    ) : null}

                    {/* Email Input */}
                    <View style={{ width: '100%', marginBottom: 15 }}>
                        <Text style={{ color: '#cbd5e1', marginBottom: 5 }}>Email</Text>
                        <TextInput
                            style={{ backgroundColor: '#1e293b', color: 'white', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#334155', width: '100%' }}
                            placeholder="tu@email.com"
                            placeholderTextColor="#94a3b8"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>

                    {/* Password Input */}
                    <View style={{ width: '100%', marginBottom: 15 }}>
                        <Text style={{ color: '#cbd5e1', marginBottom: 5 }}>Contraseña</Text>
                        <TextInput
                            style={{ backgroundColor: '#1e293b', color: 'white', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#334155', width: '100%' }}
                            placeholder="Mínimo 6 caracteres"
                            placeholderTextColor="#94a3b8"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>

                    {/* Confirm Password Input */}
                    <View style={{ width: '100%', marginBottom: 25 }}>
                        <Text style={{ color: '#cbd5e1', marginBottom: 5 }}>Confirmar Contraseña</Text>
                        <TextInput
                            style={{ backgroundColor: '#1e293b', color: 'white', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#334155', width: '100%' }}
                            placeholder="Repite tu contraseña"
                            placeholderTextColor="#94a3b8"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry
                        />
                    </View>

                    <TouchableOpacity
                        style={{ backgroundColor: '#0ea5e9', padding: 15, borderRadius: 8, width: '100%', alignItems: 'center' }}
                        onPress={handleRegister}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>Crear Cuenta</Text>
                        )}
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <Text style={{ color: '#94a3b8' }}>¿Ya tienes cuenta? </Text>
                        <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
                            <Text style={{ color: '#38bdf8', fontWeight: 'bold' }}>Inicia Sesión</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </View>
    );
}
