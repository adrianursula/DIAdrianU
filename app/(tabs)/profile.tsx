import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Alert, ActivityIndicator, Image, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';
import { router, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { getProfile, updateProfile, Profile } from '../../services/profileService';

export default function ProfileScreen() {
    const { user, signOut } = useAuth();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [profile, setProfile] = useState<Profile | null>(null);

    // Form State
    const [fullName, setFullName] = useState('');
    const [currency, setCurrency] = useState('USD');
    const [avatarUrl, setAvatarUrl] = useState('');

    const loadProfile = async () => {
        if (!user) return;

        // Guest Mode
        if (user.id === 'guest-user-id') {
            setProfile({
                id: 'guest-user-id',
                email: 'guest@zerog.finance',
                full_name: 'Invitado Especial',
                avatar_url: 'https://i.pravatar.cc/150?img=12',
                currency: 'MXN',
                language: 'es',
                updated_at: new Date().toISOString()
            });
            setFullName('Invitado Especial');
            setCurrency('MXN');
            setAvatarUrl('https://i.pravatar.cc/150?img=12');
            setLoading(false);
            return;
        }

        try {
            const { data, error } = await getProfile(user.id);
            if (data) {
                setProfile(data);
                setFullName(data.full_name || '');
                setCurrency(data.currency || 'USD');
                setAvatarUrl(data.avatar_url || '');
            } else {
                // Initial load might fail if trigger didn't run or manual insert needed based on Auth
                // For now, just set defaults
                setFullName('');
                setCurrency('USD');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadProfile();
        }, [user])
    );

    const handleSave = async () => {
        if (!user) return;

        setSaving(true);
        try {
            if (user.id === 'guest-user-id') {
                Alert.alert('Modo Invitado', 'Los cambios no se guardan permanentemente en modo invitado.');
                setSaving(false);
                return;
            }

            const updates = {
                full_name: fullName,
                currency,
                avatar_url: avatarUrl,
                updated_at: new Date().toISOString(),
            };

            const { error } = await updateProfile(user.id, updates);

            if (error) throw error;

            Alert.alert('Éxito', 'Perfil actualizado correctamente');
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'No se pudo actualizar el perfil');
        } finally {
            setSaving(false);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut();
            router.replace('/(auth)/login');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="#38bdf8" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.content}>
                    <Text style={styles.headerTitle}>Tu Perfil</Text>

                    {/* Avatar Section */}
                    <View style={styles.avatarSection}>
                        <View style={styles.avatarContainer}>
                            {avatarUrl ? (
                                <Image source={{ uri: avatarUrl }} style={styles.avatar} />
                            ) : (
                                <View style={[styles.avatar, styles.avatarPlaceholder]}>
                                    <Text style={styles.avatarInitials}>
                                        {fullName ? fullName.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase()}
                                    </Text>
                                </View>
                            )}
                            <View style={styles.editBadge}>
                                <Ionicons name="pencil" size={12} color="white" />
                            </View>
                        </View>
                        <Text style={styles.emailText}>{user?.email}</Text>
                    </View>

                    {/* Form Section */}
                    <View style={styles.formSection}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Nombre Completo</Text>
                            <View style={styles.inputContainer}>
                                <Ionicons name="person-outline" size={20} color="#94a3b8" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    value={fullName}
                                    onChangeText={setFullName}
                                    placeholder="Tu nombre"
                                    placeholderTextColor="#64748b"
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Moneda Principal</Text>
                            <View style={styles.inputContainer}>
                                <Ionicons name="cash-outline" size={20} color="#94a3b8" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    value={currency}
                                    onChangeText={setCurrency}
                                    placeholder="Ej. USD, MXN, EUR"
                                    placeholderTextColor="#64748b"
                                    maxLength={3}
                                    autoCapitalize="characters"
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>URL de Avatar</Text>
                            <View style={styles.inputContainer}>
                                <Ionicons name="image-outline" size={20} color="#94a3b8" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    value={avatarUrl}
                                    onChangeText={setAvatarUrl}
                                    placeholder="https://..."
                                    placeholderTextColor="#64748b"
                                    autoCapitalize="none"
                                />
                            </View>
                        </View>

                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={handleSave}
                            disabled={saving}
                        >
                            {saving ? (
                                <ActivityIndicator color="white" />
                            ) : (
                                <Text style={styles.saveButtonText}>Guardar Cambios</Text>
                            )}
                        </TouchableOpacity>
                    </View>

                    {/* Danger Zone */}
                    <View style={styles.dangerZone}>
                        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                            <Ionicons name="log-out-outline" size={20} color="#fb7185" style={{ marginRight: 8 }} />
                            <Text style={styles.logoutText}>Cerrar Sesión</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.versionText}>Versión 1.0.0 (Build {Platform.OS === 'web' ? 'Web' : 'APK'})</Text>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f172a',
    },
    content: {
        padding: 24,
    },
    headerTitle: {
        color: 'white',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 32,
    },
    avatarSection: {
        alignItems: 'center',
        marginBottom: 40,
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 16,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#38bdf8',
    },
    avatarPlaceholder: {
        backgroundColor: '#1e293b',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarInitials: {
        color: '#38bdf8',
        fontSize: 36,
        fontWeight: 'bold',
    },
    editBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#0ea5e9',
        width: 28,
        height: 28,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#0f172a',
    },
    emailText: {
        color: '#94a3b8',
        fontSize: 16,
    },
    formSection: {
        marginBottom: 40,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        color: '#cbd5e1', // slate-300
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 8,
        marginLeft: 4,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1e293b', // slate-800
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#334155', // slate-700
        paddingHorizontal: 12,
        height: 56,
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        color: 'white',
        fontSize: 16,
        height: '100%',
    },
    saveButton: {
        backgroundColor: '#38bdf8', // sky-400
        borderRadius: 12,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12,
        // Shadow
        ...Platform.select({
            web: {
                boxShadow: '0 4px 6px -1px rgba(56, 189, 248, 0.3)',
            },
            default: {
                elevation: 4,
                shadowColor: '#38bdf8',
            }
        })
    },
    saveButtonText: {
        color: '#0f172a', // slate-900
        fontSize: 16,
        fontWeight: 'bold',
    },
    dangerZone: {
        borderTopWidth: 1,
        borderTopColor: '#334155',
        paddingTop: 32,
        alignItems: 'center',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        backgroundColor: 'rgba(251, 113, 133, 0.1)', // rose-400/10
        borderWidth: 1,
        borderColor: 'rgba(251, 113, 133, 0.2)',
        width: '100%',
        justifyContent: 'center',
    },
    logoutText: {
        color: '#fb7185', // rose-400
        fontSize: 16,
        fontWeight: '600',
    },
    versionText: {
        color: '#475569', // slate-600
        fontSize: 12,
        textAlign: 'center',
        marginTop: 24,
    },
});
