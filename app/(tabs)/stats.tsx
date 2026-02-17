import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet, Platform, Dimensions, TouchableOpacity, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import { fetchTransactions } from '../../services/transactionService';
import { TransactionWithCategory } from '../../types/database';
import { Ionicons } from '@expo/vector-icons';
import DonutChart from '../../components/DonutChart';

const { width } = Dimensions.get('window');

// Colors for chart segments
const CHART_COLORS = [
    '#06b6d4', // Cyan 500
    '#3b82f6', // Blue 500
    '#8b5cf6', // Violet 500
    '#ec4899', // Pink 500
    '#f43f5e', // Rose 500
    '#f59e0b', // Amber 500
    '#10b981', // Emerald 500
];

export default function StatsScreen() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [transactions, setTransactions] = useState<TransactionWithCategory[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const [chartData, setChartData] = useState<any[]>([]);
    const [topCategory, setTopCategory] = useState<any>(null);

    const loadData = async () => {
        if (!user) return;

        // If guest, we might need to read from global cache or similar, but for now let's assume real data fetch
        // or re-use the global cache check if we want guest support here too.
        // For production, we fetch real data.

        try {
            const { data, error } = await fetchTransactions(user.id);
            if (data) {
                processData(data);
                setTransactions(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [user])
    );

    const onRefresh = () => {
        setRefreshing(true);
        loadData();
    };

    const processData = (txs: TransactionWithCategory[]) => {
        // Filter expenses only
        const expenses = txs.filter(t => t.categories?.type === 'expense');
        const totalExpense = expenses.reduce((sum, t) => sum + Number(t.amount), 0);

        // Group by category
        const groups: Record<string, number> = {};
        const categoriesInfo: Record<string, any> = {};

        expenses.forEach(t => {
            const catId = t.category_id || 'unknown';
            const amount = Number(t.amount);
            groups[catId] = (groups[catId] || 0) + amount;

            if (!categoriesInfo[catId] && t.categories) {
                categoriesInfo[catId] = t.categories;
            }
        });

        // Convert to array
        const result = Object.keys(groups).map((catId, index) => {
            const value = groups[catId];
            return {
                key: catId,
                value: value,
                color: CHART_COLORS[index % CHART_COLORS.length],
                percentage: value / totalExpense,
                category: categoriesInfo[catId]
            };
        }).sort((a, b) => b.value - a.value);

        setChartData(result);
        setTopCategory(result.length > 0 ? result[0] : null);
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN',
            minimumFractionDigits: 0
        }).format(amount);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Estadísticas</Text>
            </View>

            <ScrollView
                contentContainerStyle={styles.content}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#22d3ee" />}
            >
                {loading ? (
                    <ActivityIndicator color="#22d3ee" style={{ marginTop: 40 }} />
                ) : (
                    <>
                        {/* Chart Section */}
                        <View style={styles.chartContainer}>
                            <DonutChart data={chartData} size={width * 0.6} />
                        </View>

                        {/* Top Spending Insight */}
                        {topCategory && (
                            <View style={styles.insightCard}>
                                <Ionicons name="trending-down" size={24} color="#fb7185" />
                                <View style={{ flex: 1, marginLeft: 12 }}>
                                    <Text style={styles.insightTitle}>Mayor Gasto</Text>
                                    <Text style={styles.insightText}>
                                        Estás gastando más en <Text style={{ fontWeight: 'bold', color: 'white' }}>{topCategory.category?.name}</Text>
                                    </Text>
                                </View>
                            </View>
                        )}

                        {/* Breakdown List */}
                        <View style={styles.listContainer}>
                            <Text style={styles.sectionTitle}>Desglose por Categoría</Text>

                            {chartData.map((item) => (
                                <View key={item.key} style={styles.listItem}>
                                    <View style={styles.itemLeft}>
                                        <View style={[styles.iconBg, { backgroundColor: `${item.color}20` }]}>
                                            <Ionicons
                                                name={item.category?.icon || 'help'}
                                                size={20}
                                                color={item.color}
                                            />
                                        </View>
                                        <View>
                                            <Text style={styles.itemTitle}>{item.category?.name || 'Desconocido'}</Text>
                                            <Text style={styles.itemSubtitle}>{Math.round(item.percentage * 100)}% del total</Text>
                                        </View>
                                    </View>
                                    <Text style={styles.itemAmount}>{formatCurrency(item.value)}</Text>
                                </View>
                            ))}

                            {chartData.length === 0 && (
                                <Text style={{ color: '#94a3b8', textAlign: 'center', marginTop: 20 }}>
                                    No hay gastos registrados este mes.
                                </Text>
                            )}
                        </View>
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f172a',
    },
    header: {
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 8,
    },
    headerTitle: {
        color: 'white',
        fontSize: 24, // Bigger title for stats
        fontWeight: 'bold',
    },
    content: {
        paddingBottom: 100,
    },
    chartContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 32,
    },
    insightCard: {
        backgroundColor: 'rgba(30, 41, 59, 0.5)',
        marginHorizontal: 24,
        padding: 16,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(251, 113, 133, 0.3)', // Red/Pink border
        marginBottom: 32,
    },
    insightTitle: {
        color: '#fb7185',
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: 4,
    },
    insightText: {
        color: '#cbd5e1',
        fontSize: 14,
    },
    listContainer: {
        paddingHorizontal: 24,
    },
    sectionTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#1e293b',
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconBg: {
        width: 40,
        height: 40,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    itemTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
    },
    itemSubtitle: {
        color: '#94a3b8',
        fontSize: 12,
    },
    itemAmount: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
