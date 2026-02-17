import { Tabs, Redirect, Slot, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';
import { View, ActivityIndicator, Platform, Text, TouchableOpacity } from 'react-native';

export default function TabsLayout() {
    const { user, loading } = useAuth();
    const router = useRouter();

    if (loading) {
        return (
            <View className="flex-1 bg-slate-900 items-center justify-center">
                <ActivityIndicator size="large" color="#38bdf8" />
            </View>
        );
    }

    if (!user) {
        return <Redirect href="/(auth)/login" />;
    }

    if (Platform.OS === 'web') {
        return (
            <View className="flex-1 bg-slate-900">
                <View className="flex-1">
                    <Slot />
                </View>
                {/* Custom Web Tab Bar */}
                <View className="flex-row bg-slate-800 border-t border-slate-700 py-3 justify-around">
                    <TouchableOpacity onPress={() => router.push('/(tabs)/dashboard')} className="items-center">
                        <Ionicons name="home" size={24} color="#38bdf8" />
                        <Text className="text-slate-400 text-xs mt-1">Inicio</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.push('/(tabs)/stats')} className="items-center">
                        <Ionicons name="pie-chart" size={24} color="#94a3b8" />
                        <Text className="text-slate-400 text-xs mt-1">Estadísticas</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.push('/(tabs)/transactions')} className="items-center">
                        <Ionicons name="list" size={24} color="#94a3b8" />
                        <Text className="text-slate-400 text-xs mt-1">Lista</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.push('/(tabs)/profile')} className="items-center">
                        <Ionicons name="person" size={24} color="#94a3b8" />
                        <Text className="text-slate-400 text-xs mt-1">Perfil</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#1e293b',
                    borderTopColor: '#334155',
                    borderTopWidth: 1,
                },
                tabBarActiveTintColor: '#38bdf8',
                tabBarInactiveTintColor: '#94a3b8',
            }}
        >
            <Tabs.Screen
                name="dashboard"
                options={{
                    title: 'Inicio',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="stats"
                options={{
                    title: 'Estadísticas',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="pie-chart" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="transactions"
                options={{
                    title: 'Lista',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="list" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Perfil',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
