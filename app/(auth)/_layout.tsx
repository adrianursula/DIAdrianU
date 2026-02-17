import { Slot, Stack } from 'expo-router';
import { Platform } from 'react-native';

export default function AuthLayout() {
    // Use Slot for Web to avoid Stack navigator issues (buildHref error)
    if (Platform.OS === 'web') {
        return (
            <Slot screenOptions={{ contentStyle: { backgroundColor: '#0f172a' } }} />
        );
    }

    // Use Stack for Mobile (Android/iOS)
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: '#0f172a' },
            }}
        >
            <Stack.Screen name="login" />
            <Stack.Screen name="register" />
        </Stack>
    );
}
