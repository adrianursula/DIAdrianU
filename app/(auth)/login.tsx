import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, Image, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('window');

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { signIn, signInAsGuest } = useAuth();
    const router = useRouter();

    const handleLogin = async () => {
        if (!email || !password) {
            setError('Por favor completa todos los campos');
            return;
        }

        setError('');
        setLoading(true);

        const { error } = await signIn(email, password);

        if (error) {
            setError(error.message || 'Error al iniciar sesión');
            setLoading(false);
        } else {
            setLoading(false);
            router.replace('/(tabs)/dashboard');
        }
    };

    const handleGuestLogin = async () => {
        try {
            await signInAsGuest();
            router.replace('/(tabs)/dashboard');
        } catch (e) {
            console.error(e);
            setError('Error al iniciar como invitado');
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    style={styles.scrollView}
                >
                    <View style={styles.card}>
                        {/* Logo */}
                        <Image
                            source={require('../../assets/logo.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />

                        <Text style={styles.title}>Bienvenido</Text>
                        <Text style={styles.subtitle}>Gestiona tus finanzas inteligentes</Text>

                        {/* Error Message */}
                        {error ? (
                            <View style={styles.errorContainer}>
                                <Text style={styles.errorText}>{error}</Text>
                            </View>
                        ) : null}

                        {/* Form */}
                        <View style={styles.form}>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Email</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="tu@email.com"
                                    placeholderTextColor="#64748b"
                                    value={email}
                                    onChangeText={setEmail}
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Contraseña</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="••••••••"
                                    placeholderTextColor="#64748b"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry
                                />
                            </View>

                            {/* Login Button */}
                            <TouchableOpacity
                                style={[styles.loginButton, loading && styles.disabledButton]}
                                onPress={handleLogin}
                                disabled={loading}
                            >
                                {loading ? (
                                    <ActivityIndicator color="#0f172a" />
                                ) : (
                                    <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
                                )}
                            </TouchableOpacity>

                            {/* Divider */}
                            <View style={styles.dividerContainer}>
                                <View style={styles.divider} />
                                <Text style={styles.dividerText}>o continuar con</Text>
                                <View style={styles.divider} />
                            </View>

                            {/* Guest Button */}
                            <TouchableOpacity
                                style={styles.guestButton}
                                onPress={handleGuestLogin}
                            >
                                <Text style={styles.guestButtonText}>Entrar como Invitado</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Sign Up Link */}
                        <View style={styles.footer}>
                            <Text style={styles.footerText}>¿No tienes cuenta? </Text>
                            <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
                                <Text style={styles.linkText}>Regístrate</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f172a', // slate-900
        minHeight: height, // Force min height for web
    },
    keyboardView: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    card: {
        width: '100%',
        maxWidth: 450,
        padding: 30,
        borderRadius: 20,
        backgroundColor: 'rgba(30, 41, 59, 0.5)', // slate-800 with opacity (Glassmorphism)
        borderColor: '#334155', // slate-700
        borderWidth: 1,
        alignItems: 'center',
        // Shadow (web style)
        ...Platform.select({
            web: {
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            },
            default: {
                elevation: 5,
            }
        })
    },
    logo: {
        width: 80,
        height: 80,
        marginBottom: 24,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 14,
        color: '#94a3b8', // slate-400
        marginBottom: 32,
        textAlign: 'center',
    },
    errorContainer: {
        width: '100%',
        backgroundColor: 'rgba(239, 68, 68, 0.1)', // red-500/10
        borderColor: 'rgba(239, 68, 68, 0.5)', // red-500/50
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
    },
    errorText: {
        color: '#f87171', // red-400
        textAlign: 'center',
        fontWeight: '500',
    },
    form: {
        width: '100%',
    },
    inputContainer: {
        marginBottom: 16,
    },
    label: {
        color: '#cbd5e1', // slate-300
        marginBottom: 8,
        fontWeight: '500',
        marginLeft: 4,
    },
    input: {
        width: '100%',
        backgroundColor: 'rgba(15, 23, 42, 0.5)', // slate-900/50
        borderColor: '#475569', // slate-600
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 48,
        color: 'white',
        fontSize: 16,
    },
    loginButton: {
        width: '100%',
        backgroundColor: '#06b6d4', // cyan-500
        height: 48,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
        // Shadow
        shadowColor: '#06b6d4',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    disabledButton: {
        opacity: 0.7,
    },
    loginButtonText: {
        color: '#0f172a', // slate-900
        fontWeight: 'bold',
        fontSize: 16,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 24,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: '#334155', // slate-700
    },
    dividerText: {
        marginHorizontal: 16,
        color: '#64748b', // slate-500
        fontSize: 14,
    },
    guestButton: {
        width: '100%',
        backgroundColor: 'transparent',
        borderColor: 'rgba(6, 182, 212, 0.3)', // cyan-500/30
        borderWidth: 1,
        height: 48,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    guestButtonText: {
        color: '#22d3ee', // cyan-400
        fontWeight: 'bold',
        fontSize: 16,
    },
    footer: {
        flexDirection: 'row',
        marginTop: 32,
    },
    footerText: {
        color: '#94a3b8', // slate-400
    },
    linkText: {
        color: '#22d3ee', // cyan-400
        fontWeight: 'bold',
    },
});
