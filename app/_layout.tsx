import { Stack } from 'expo-router';
import { AuthProvider } from '../contexts/AuthContext';
import { LanguageProvider } from '../contexts/LanguageContext'; // Import
import { StatusBar } from 'expo-status-bar';
import '../global.css';

export default function RootLayout() {
    return (
        <AuthProvider>
            <LanguageProvider>
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
                            headerTitle: 'Nueva Transacción', // TODO: Translate this too if possible or remove if unused
                            headerStyle: { backgroundColor: '#1e293b' },
                            headerTintColor: '#f8fafc',
                        }}
                    />
                </Stack>
            </LanguageProvider>
        </AuthProvider>
    );
}
