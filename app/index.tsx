import { useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export default function Index() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const segments = useSegments();

    useEffect(() => {
        if (loading) return;

        const inAuthGroup = segments[0] === '(auth)';

        if (!user && !inAuthGroup) {
            // Redirect to login if not authenticated
            router.replace('/(auth)/login');
        } else if (user && inAuthGroup) {
            // Redirect to dashboard if authenticated
            router.replace('/(tabs)/dashboard');
        } else if (user) {
            // User is authenticated, redirect to dashboard
            router.replace('/(tabs)/dashboard');
        } else {
            // User is not authenticated, redirect to login
            router.replace('/(auth)/login');
        }
    }, [user, loading, segments]);

    // Show loading screen
    return (
        <View className="flex-1 bg-slate-900 items-center justify-center">
            <ActivityIndicator size="large" color="#38bdf8" />
        </View>
    );
}
