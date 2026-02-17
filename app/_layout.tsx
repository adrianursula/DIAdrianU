import { Stack } from 'expo-router';
import { AuthProvider } from '../contexts/AuthContext';
import { StatusBar } from 'expo-status-bar';
import '../global.css';

export default function RootLayout() {
    return (
        <AuthProvider>
            <StatusBar style="light" />
            <Stack
                screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: '#0f172a' },
                }}
            >
                <Stack.Screen name="index" />
                <Stack.Screen name="(auth)" />
                <Stack.Screen name="(tabs)" />
                <Stack.Screen
                    name="add-transaction"
                    options={{
                        // presentation: 'modal', // Disabled to test Web compatibility
                        headerShown: true,
                        headerTitle: 'Nueva Transacción',
                        headerStyle: { backgroundColor: '#1e293b' },
                        headerTintColor: '#f8fafc',
                    }}
                />
            </Stack>
        </AuthProvider>
    );
}
