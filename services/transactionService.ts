import { supabase } from '../lib/supabase';
import {
    Transaction,
    TransactionWithCategory,
    CreateTransactionInput,
    BalanceData,
} from '../types/database';

export interface Category {
    id: string;
    name: string;
    icon: string;
    type: 'income' | 'expense';
    created_at?: string;
}

export async function fetchCategories(): Promise<{ data: Category[] | null; error: any }> {
    try {
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .order('name');

        if (error) throw error;
        return { data, error: null };
    } catch (error) {
        console.error('Error fetching categories:', error);
        return { data: null, error };
    }
}

/**
 * Fetch user transactions with category information
 * @param userId - The authenticated user's ID
 * @param limit - Optional limit on number of transactions to fetch
 */
export async function fetchTransactions(
    userId: string,
    limit?: number
): Promise<{ data: TransactionWithCategory[] | null; error: any }> {
    try {
        let query = supabase
            .from('transactions')
            .select('*, categories(*)')
            .eq('user_id', userId)
            .order('date', { ascending: false })
            .order('created_at', { ascending: false });

        if (limit) {
            query = query.limit(limit);
        }

        const { data, error } = await query;

        if (error) throw error;

        return { data, error: null };
    } catch (error) {
        console.error('Error fetching transactions:', error);
        return { data: null, error };
    }
}

/**
 * Create a new transaction
 */
export async function createTransaction(
    input: CreateTransactionInput
): Promise<{ data: Transaction | null; error: any }> {
    try {
        const { data, error } = await supabase
            .from('transactions')
            .insert([input])
            .select()
            .single();

        if (error) throw error;

        return { data, error: null };
    } catch (error) {
        console.error('Error creating transaction:', error);
        return { data: null, error };
    }
}

/**
 * Delete a transaction by ID
 */
export async function deleteTransaction(
    id: string
): Promise<{ error: any }> {
    try {
        const { error } = await supabase
            .from('transactions')
            .delete()
            .eq('id', id);

        if (error) throw error;

        return { error: null };
    } catch (error) {
        console.error('Error deleting transaction:', error);
        return { error };
    }
}

/**
 * Update an existing transaction
 */
export async function updateTransaction(
    id: string,
    updates: Partial<CreateTransactionInput>
): Promise<{ data: Transaction | null; error: any }> {
    try {
        const { data, error } = await supabase
            .from('transactions')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;

        return { data, error: null };
    } catch (error) {
        console.error('Error updating transaction:', error);
        return { data: null, error };
    }
}

/**
 * Calculate balance from transactions
 * @param transactions - Array of transactions with category information
 * @returns Balance data with total, income, and expense
 */
export function calculateBalance(
    transactions: TransactionWithCategory[]
): BalanceData {
    const income = transactions
        .filter((t) => t.categories.type === 'income')
        .reduce((sum, t) => sum + Number(t.amount), 0);

    const expense = transactions
        .filter((t) => t.categories.type === 'expense')
        .reduce((sum, t) => sum + Number(t.amount), 0);

    const total = income - expense;

    return {
        total,
        income,
        expense,
    };
}
