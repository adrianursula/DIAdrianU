import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { translations, Language } from '../constants/translations';
import { useAuth } from './AuthContext';
import { getProfile, updateProfile } from '../services/profileService';

type LanguageContextType = {
    locale: Language;
    setLocale: (lang: Language) => Promise<void>;
    t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType>({
    locale: 'es',
    setLocale: async () => { },
    t: (key: string) => key,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [locale, setLocaleState] = useState<Language>('es');
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    // Initial Load
    useEffect(() => {
        loadLanguagePreference();
    }, [user]);

    const loadLanguagePreference = async () => {
        try {
            // 1. Check User Profile (if logged in)
            if (user && user.id !== 'guest-user-id') {
                const { data } = await getProfile(user.id);
                if (data && data.language && (data.language === 'es' || data.language === 'en')) {
                    setLocaleState(data.language as Language);
                    setLoading(false);
                    return;
                }
            }

            // 2. Check Local Storage (AsyncStorage)
            const storedLang = await AsyncStorage.getItem('user_language');
            if (storedLang === 'es' || storedLang === 'en') {
                setLocaleState(storedLang as Language);
            }
        } catch (error) {
            console.error('Error loading language:', error);
        } finally {
            setLoading(false);
        }
    };

    const setLocale = async (lang: Language) => {
        setLocaleState(lang);

        try {
            // Persist locally
            await AsyncStorage.setItem('user_language', lang);

            // Persist to Profile if User
            if (user && user.id !== 'guest-user-id') {
                await updateProfile(user.id, { language: lang });
            }
        } catch (error) {
            console.error('Error saving language preference:', error);
        }
    };

    // Translation function (supports nested keys like 'auth.loginTitle')
    const t = (key: string): string => {
        const keys = key.split('.');
        let value: any = translations[locale];

        for (const k of keys) {
            value = value?.[k];
            if (!value) return key; // Fallback to key if not found
        }

        return value;
    };

    return (
        <LanguageContext.Provider value={{ locale, setLocale, t }}>
            {children}
        </LanguageContext.Provider>
    );
};
