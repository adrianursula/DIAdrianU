import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
    user: User | null;
    session: Session | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<{ error: any }>;
    signUp: (email: string, password: string) => Promise<{ error: any }>;
    signOut: () => Promise<void>;
    signInAsGuest: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        // Timeout to ensure loading state is cleared even if Supabase fails
        const timeoutId = setTimeout(() => {
            if (isMounted) {
                console.warn('Auth session check timed out, proceeding without authentication');
                setLoading(false);
            }
        }, 5000); // 5 second timeout

        // Get initial session with error handling
        supabase.auth.getSession()
            .then(({ data: { session }, error }) => {
                if (isMounted) {
                    clearTimeout(timeoutId);
                    if (error) {
                        console.error('Error getting session:', error);
                    }
                    setSession(session);
                    setUser(session?.user ?? null);
                    setLoading(false);
                }
            })
            .catch((error) => {
                if (isMounted) {
                    clearTimeout(timeoutId);
                    console.error('Failed to get session:', error);
                    setSession(null);
                    setUser(null);
                    setLoading(false);
                }
            });

        // Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            if (isMounted) {
                setSession(session);
                setUser(session?.user ?? null);
                setLoading(false);
            }
        });

        return () => {
            isMounted = false;
            clearTimeout(timeoutId);
            subscription.unsubscribe();
        };
    }, []);

    const signIn = async (email: string, password: string) => {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        return { error };
    };

    const signUp = async (email: string, password: string) => {
        const { error } = await supabase.auth.signUp({
            email,
            password,
        });
        return { error };
    };

    const signOut = async () => {
        await supabase.auth.signOut();
        // Clear manual mock session if any
        setUser(null);
        setSession(null);
    };

    const signInAsGuest = async () => {
        // Mock session for debugging
        const mockUser: User = {
            id: 'guest-user-id',
            aud: 'authenticated',
            role: 'authenticated',
            email: 'invitado@zerog.finance',
            email_confirmed_at: new Date().toISOString(),
            phone: '',
            confirmed_at: new Date().toISOString(),
            last_sign_in_at: new Date().toISOString(),
            app_metadata: { provider: 'email', providers: ['email'] },
            user_metadata: {},
            identities: [],
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        };

        const mockSession: Session = {
            access_token: 'mock-access-token',
            token_type: 'bearer',
            expires_in: 3600,
            refresh_token: 'mock-refresh-token',
            user: mockUser,
        };

        setSession(mockSession);
        setUser(mockUser);
    };

    const value = {
        user,
        session,
        loading,
        signIn,
        signUp,
        signOut,
        signInAsGuest,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
