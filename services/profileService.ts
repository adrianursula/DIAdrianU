import { supabase } from '../lib/supabase';

export interface Profile {
    id: string;
    email: string;
    full_name: string | null;
    avatar_url: string | null;
    currency: string;
    language: string;
    updated_at: string | null;
}

export async function getProfile(userId: string): Promise<{ data: Profile | null; error: any }> {
    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) {
            // If profile doesn't exist (e.g. old user), we might want to create one or return null
            // For now, return error
            throw error;
        }

        return { data, error: null };
    } catch (error) {
        console.error('Error fetching profile:', error);
        return { data: null, error };
    }
}

export async function updateProfile(
    userId: string,
    updates: Partial<Profile>
): Promise<{ data: Profile | null; error: any }> {
    try {
        const { data, error } = await supabase
            .from('profiles')
            .update(updates)
            .eq('id', userId)
            .select()
            .single();

        if (error) throw error;

        return { data, error: null };
    } catch (error) {
        console.error('Error updating profile:', error);
        return { data: null, error };
    }
}
