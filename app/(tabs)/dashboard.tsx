import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, RefreshControl, ActivityIndicator, Alert, Image, Platform, Dimensions, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { fetchTransactions, calculateBalance, deleteTransaction } from '../../services/transactionService';
import { TransactionWithCategory, BalanceData } from '../../types/database';
import AddTransactionModal from '../../components/AddTransactionModal';

const { width, height } = Dimensions.get('window');

// Global cache to persist guest data during session
let guestTransactionsCache: TransactionWithCategory[] | null = null;

export default function Dashboard() {
    const { user, signOut } = useAuth();
    const router = useRouter();
    const [transactions, setTransactions] = useState<TransactionWithCategory[]>([]);
    const [balance, setBalance] = useState<BalanceData>({ total: 0, income: 0, expense: 0 });
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState<'income' | 'expense'>('expense');

    const loadTransactions = async () => {
        if (!user) return;

        // DEBUG MODE: Mock data for guest user to avoid Supabase connection issues
        if (user.id === 'guest-user-id') {
            if (!guestTransactionsCache) {
                guestTransactionsCache = [
                    {
                        id: '1',
                        amount: 1500.50,
                        date: new Date().toISOString(),
                        description: 'Salario Mensual',
                        category_id: 'cat1',
                        user_id: 'guest-user-id',
                        created_at: new Date().toISOString(),
                        categories: {
                            id: 'cat1',
                            name: 'Nómina',
                            icon: 'cash-outline',
                            type: 'income',
                            created_at: new Date().toISOString()
                        }
                    },
                    {
                        id: '2',
                        amount: 450.00,
                        date: new Date().toISOString(),
                        description: 'Compra Supermercado',
                        category_id: 'cat2',
                        user_id: 'guest-user-id',
                        created_at: new Date().toISOString(),
                        categories: {
                            id: 'cat2',
                            name: 'Alimentación',
                            icon: 'cart-outline',
                            type: 'expense',
                            created_at: new Date().toISOString()
                        }
                    },
                    {
                        id: '3',
                        amount: 120.00,
                        date: new Date().toISOString(),
                        description: 'Netflix',
                        category_id: 'cat3',
                        user_id: 'guest-user-id',
                        created_at: new Date().toISOString(),
                        categories: {
                            id: 'cat3',
                            name: 'Entretenimiento',
                            icon: 'film-outline',
                            type: 'expense',
                            created_at: new Date().toISOString()
                        }
                    }
                ];
            }

            setTransactions(guestTransactionsCache);
            setBalance(calculateBalance(guestTransactionsCache));
            setLoading(false);
            setRefreshing(false);
            return;
        }

        try {
            const { data, error } = await fetchTransactions(user.id);

            if (data) {
                setTransactions(data);
                const balanceData = calculateBalance(data);
                setBalance(balanceData);
            }

            if (error) {
                console.error('Error loading transactions:', error);
            }
        } catch (error) {
            console.error('Unexpected error:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        loadTransactions();
    }, [user]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        loadTransactions();
    }, []);

    const handleDeleteTransaction = async (id: string) => {
        Alert.alert(
            'Eliminar Transacción',
            '¿Estás seguro de eliminar esta transacción?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: async () => {
                        const { error } = await deleteTransaction(id);
                        if (error) {
                            Alert.alert('Error', 'No se pudo eliminar la transacción');
                        } else {
                            loadTransactions();
                        }
                    },
                },
            ]
        );
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN',
            minimumFractionDigits: 2
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('es-MX', {
            day: '2-digit',
            month: 'short',
        }).format(date);
    };

    const handleLogout = async () => {
        try {
            await signOut();
            router.replace('/(auth)/login');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                {/* Header Section */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.headerSubtitle}>Bienvenido de vuelta,</Text>
                        <Text style={styles.headerTitle}>{user?.email?.split('@')[0] || 'Usuario'}</Text>
                        {/* DEBUG: Show transaction count to verify updates */}
                        <Text style={{ color: 'yellow', fontSize: 10 }}>Debug: {transactions.length} items</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={handleLogout} style={{ marginRight: 16 }}>
                            <Ionicons name="log-out-outline" size={24} color="#fb7185" />
                        </TouchableOpacity>
                        <Image
                            source={require('../../assets/logo.png')}
                            style={styles.logo as any}
                            resizeMode="contain"
                        />
                    </View>
                </View>

                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#22d3ee" />
                    }
                >
                    {/* Hero Card - Balance */}
                    <View style={styles.heroCard}>
                        <Text style={styles.heroSubtitle}>Saldo Total</Text>
                        {loading ? (
                            <ActivityIndicator color="#22d3ee" style={{ paddingVertical: 20 }} />
                        ) : (
                            <View>
                                <Text style={styles.heroAmount}>
                                    {formatCurrency(balance.total)}
                                </Text>
                                <View style={styles.heroStatsRow}>
                                    <View>
                                        <View style={styles.statLabelRow}>
                                            <View style={[styles.dot, { backgroundColor: '#34d399' }]} />
                                            <Text style={styles.statLabel}>Ingresos</Text>
                                        </View>
                                        <Text style={[styles.statValue, { color: '#34d399' }]}>
                                            {formatCurrency(balance.income)}
                                        </Text>
                                    </View>
                                    <View>
                                        <View style={styles.statLabelRow}>
                                            <View style={[styles.dot, { backgroundColor: '#fb7185' }]} />
                                            <Text style={styles.statLabel}>Gastos</Text>
                                        </View>
                                        <Text style={[styles.statValue, { color: '#fb7185' }]}>
                                            {formatCurrency(balance.expense)}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        )}
                    </View>

                    {/* Actions Grid */}
                    <View style={styles.actionsGrid}>
                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={() => {
                                setModalType('income');
                                setModalVisible(true);
                            }}
                        >
                            <View style={[styles.actionIconBg, { backgroundColor: 'rgba(52, 211, 153, 0.2)' }]}>
                                <Ionicons name="arrow-up" size={20} color="#34d399" />
                            </View>
                            <Text style={styles.actionText}>Ingreso</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={() => {
                                setModalType('expense');
                                setModalVisible(true);
                            }}
                        >
                            <View style={[styles.actionIconBg, { backgroundColor: 'rgba(251, 113, 133, 0.2)' }]}>
                                <Ionicons name="arrow-down" size={20} color="#fb7185" />
                            </View>
                            <Text style={styles.actionText}>Gasto</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Transactions List */}
                    <View style={styles.transactionsSection}>
                        <Text style={styles.sectionTitle}>Movimientos Recientes</Text>

                        {loading ? (
                            <ActivityIndicator color="#22d3ee" style={{ marginTop: 40 }} />
                        ) : transactions.length === 0 ? (
                            <View style={styles.emptyState}>
                                <Ionicons name="documents-outline" size={48} color="#94a3b8" />
                                <Text style={styles.emptyText}>Sin movimientos</Text>
                            </View>
                        ) : (
                            transactions.map((t) => (
                                <View key={t.id} style={styles.transactionCard}>
                                    <View style={styles.transactionLeft}>
                                        <View style={styles.transactionIconBg}>
                                            <Ionicons
                                                name={t.categories?.icon as any || 'help'}
                                                size={20}
                                                color="#cbd5e1"
                                            />
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.transactionTitle} numberOfLines={1}>
                                                {t.categories?.name || 'Sin categoría'}
                                            </Text>
                                            <Text style={styles.transactionSubtitle}>
                                                {formatDate(t.date)} • {t.description || ''}
                                            </Text>
                                        </View>
                                    </View>
                                    <View>
                                        <Text style={[
                                            styles.transactionAmount,
                                            { color: t.categories?.type === 'income' ? '#34d399' : '#fb7185' }
                                        ]}>
                                            {t.categories?.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                                        </Text>
                                        <TouchableOpacity onPress={() => handleDeleteTransaction(t.id)}>
                                            <Text style={styles.deleteText}>Eliminar</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))
                        )}
                    </View>
                </ScrollView>

                {/* FAB (Floating Action Button) */}
                <TouchableOpacity
                    style={styles.fab}
                    onPress={() => {
                        setModalType('expense'); // Default call
                        setModalVisible(true);
                    }}
                >
                    <Ionicons name="add" size={32} color="#0f172a" />
                </TouchableOpacity>

                {/* Inline Modal */}
                <AddTransactionModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    initialType={modalType}
                    onSave={(newTransaction?: any) => {
                        // If we receive a new transaction object (Guest Mode simulation), add it manually
                        if (newTransaction) {
                            setTransactions(prev => [newTransaction, ...prev]);
                            // Update balance locally
                            const newBalance = { ...balance };
                            if (newTransaction.categories.type === 'income') {
                                newBalance.income += newTransaction.amount;
                                newBalance.total += newTransaction.amount;
                            } else {
                                newBalance.expense += newTransaction.amount;
                                newBalance.total -= newTransaction.amount;
                            }
                            setBalance(newBalance);
                        } else {
                            loadTransactions(); // Reload data (Real mode)
                        }
                    }}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f172a', // slate-900
        minHeight: Platform.OS === 'web' ? height : '100%',
    },
    content: {
        flex: 1,
        height: '100%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 8,
    },
    headerSubtitle: {
        color: '#94a3b8', // slate-400
        fontSize: 14,
    },
    headerTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    logo: {
        width: 40,
        height: 40,
    },
    scrollView: {
        flex: 1,
    },
    heroCard: {
        backgroundColor: '#1e293b', // slate-800
        borderRadius: 24,
        padding: 24,
        margin: 24,
        borderWidth: 1,
        borderColor: '#334155', // slate-700
        // Shadow (web style)
        ...Platform.select({
            web: {
                boxShadow: '0 10px 15px -3px rgba(6, 182, 212, 0.1), 0 4px 6px -2px rgba(6, 182, 212, 0.05)',
            },
            default: {
                elevation: 4,
                shadowColor: '#06b6d4',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
            }
        })
    },
    heroSubtitle: {
        color: '#94a3b8', // slate-400
        fontSize: 14,
        marginBottom: 4,
    },
    heroAmount: {
        color: 'white',
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    heroStatsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    statLabelRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 8,
    },
    statLabel: {
        color: '#cbd5e1', // slate-300
        fontSize: 12,
    },
    statValue: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    actionsGrid: {
        flexDirection: 'row',
        paddingHorizontal: 24,
        marginBottom: 32,
        gap: 16,
    },
    actionButton: {
        flex: 1,
        backgroundColor: 'rgba(30, 41, 59, 0.5)', // slate-800/50
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(51, 65, 85, 0.5)', // slate-700/50
        alignItems: 'center',
    },
    actionIconBg: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    actionText: {
        color: '#cbd5e1', // slate-300
        fontSize: 14,
        fontWeight: '500',
    },
    transactionsSection: {
        paddingHorizontal: 24,
    },
    sectionTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 40,
        opacity: 0.5,
    },
    emptyText: {
        color: '#94a3b8', // slate-400
        marginTop: 8,
    },
    transactionCard: {
        backgroundColor: 'rgba(30, 41, 59, 0.5)', // slate-800/50
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'rgba(51, 65, 85, 0.5)', // slate-700/50
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    transactionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginRight: 16,
    },
    transactionIconBg: {
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: '#334155', // slate-700
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    transactionTitle: {
        color: 'white',
        fontWeight: '500',
        fontSize: 14,
    },
    transactionSubtitle: {
        color: '#64748b', // slate-500
        fontSize: 12,
        marginTop: 2,
    },
    transactionAmount: {
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'right',
    },
    deleteText: {
        color: '#475569', // slate-600
        fontSize: 10,
        textAlign: 'right',
        marginTop: 4,
    },
    fab: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        height: 56,
        width: 56,
        borderRadius: 28,
        backgroundColor: '#06b6d4', // cyan-500
        alignItems: 'center',
        justifyContent: 'center',
        // Shadow
        ...Platform.select({
            web: {
                boxShadow: '0 10px 15px -3px rgba(6, 182, 212, 0.4)',
                position: 'fixed' as any, // Force fixed for web overlay
                bottom: 24,
                right: 24,
                zIndex: 50,
            },
            default: {
                elevation: 6,
                shadowColor: '#06b6d4',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
            }
        })
    },
});
