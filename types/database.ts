// Database type definitions for ZeroG Finance

export type TransactionType = 'income' | 'expense';

export interface Category {
    id: string;
    name: string;
    icon: string; // Ionicons icon name
    type: TransactionType;
    created_at: string;
}

export interface Transaction {
    id: string;
    user_id: string;
    category_id: string;
    amount: number;
    description: string | null;
    date: string; // ISO date string (YYYY-MM-DD)
    created_at: string;
}

export interface TransactionWithCategory extends Transaction {
    categories: Category;
}

export interface CreateTransactionInput {
    user_id: string;
    category_id: string;
    amount: number;
    description?: string;
    date: string; // ISO date string (YYYY-MM-DD)
}

export interface BalanceData {
    total: number;
    income: number;
    expense: number;
}
