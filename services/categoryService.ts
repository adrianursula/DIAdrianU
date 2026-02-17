import { supabase } from '../lib/supabase';
import { Category, TransactionType } from '../types/database';

/**
 * Fetch all categories from the database
 */
export async function fetchCategories(): Promise<{ data: Category[] | null; error: any }> {
    try {
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .order('name', { ascending: true });

        if (error) throw error;

        return { data, error: null };
    } catch (error) {
        console.error('Error fetching categories:', error);
        return { data: null, error };
    }
}

/**
 * Fetch categories filtered by type (income or expense)
 */
export async function fetchCategoriesByType(
    type: TransactionType
): Promise<{ data: Category[] | null; error: any }> {
    try {
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .eq('type', type)
            .order('name', { ascending: true });

        if (error) throw error;

        return { data, error: null };
    } catch (error) {
        console.error(`Error fetching ${type} categories:`, error);
        return { data: null, error };
    }
}
