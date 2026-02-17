import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styled } from 'nativewind';
import { useAuth } from '../../contexts/AuthContext';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledSafeAreaView = styled(SafeAreaView);

export default function Profile() {
    const { user } = useAuth();

    return (
        <StyledSafeAreaView className="flex-1 bg-slate-900">
            <ScrollView className="flex-1">
                <StyledView className="px-6 py-8">
                    <StyledText className="text-3xl font-bold text-slate-50 mb-6">
                        Perfil
                    </StyledText>

                    <StyledView className="bg-slate-800 rounded-xl p-6 mb-4">
                        <StyledText className="text-slate-400 text-sm mb-1">
                            Email
                        </StyledText>
                        <StyledText className="text-slate-50 text-lg">
                            {user?.email}
                        </StyledText>
                    </StyledView>

                    <StyledView className="bg-slate-800 rounded-xl p-8">
                        <StyledText className="text-slate-400 text-center">
                            Configuración adicional se implementará en la siguiente fase
                        </StyledText>
                    </StyledView>
                </StyledView>
            </ScrollView>
        </StyledSafeAreaView>
    );
}
