import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Platform,
    KeyboardAvoidingView,
    Dimensions,
    ActivityIndicator,
    Modal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { createTransaction } from '../services/transactionService';

const { height } = Dimensions.get('window');

// Define colors (ZeroG Theme)
const COLORS = {
    background: '#0f172a', // Slate 900
    card: '#1e293b',       // Slate 800
    border: '#334155',     // Slate 700
    text: '#f8fafc',       // White
    subtext: '#94a3b8',    // Slate 400
    primary: '#06b6d4',    // Cyan 500
    expense: '#a855f7',    // Purple 500
    white: '#ffffff',
    danger: '#ef4444'
};

// Mock Categories for Guest Mode
const MOCK_CATEGORIES = [
    { id: 'cat1', name: 'Nómina', icon: 'cash-outline', type: 'income' },
    { id: 'cat2', name: 'Alimentación', icon: 'cart-outline', type: 'expense' },
    { id: 'cat3', name: 'Entretenimiento', icon: 'film-outline', type: 'expense' },
    { id: 'cat4', name: 'Transporte', icon: 'bus-outline', type: 'expense' },
    { id: 'cat5', name: 'Salud', icon: 'medical-outline', type: 'expense' },
    { id: 'cat6', name: 'Regalos', icon: 'gift-outline', type: 'expense' },
    { id: 'cat7', name: 'Otros', icon: 'apps-outline', type: 'expense' },
];

interface AddTransactionModalProps {
    visible: boolean;
    onClose: () => void;
    onSave?: (newTransaction?: any) => void;
    initialType?: 'income' | 'expense';
}

export default function AddTransactionModal({ visible, onClose, onSave, initialType = 'expense' }: AddTransactionModalProps) {
    const { user } = useAuth();

    // State
    const [type, setType] = useState<'income' | 'expense'>(initialType);
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [dbCategories, setDbCategories] = useState<any[]>([]);

    // Load categories on mount or when visible
    React.useEffect(() => {
        if (visible) {
            // Reset form
            setType(initialType);
            setAmount('');
            setDescription('');
            setSelectedCategory('');
            setError('');

            // Fetch categories if user is real
            if (user && user.id !== 'guest-user-id') {
                import('../services/transactionService').then(({ fetchCategories }) => {
                    fetchCategories().then(({ data, error }) => {
                        if (data && data.length > 0) {
                            setDbCategories(data);
                        } else {
                            console.warn('No categories found in DB');
                            setDbCategories([]);
                        }
                    });
                });
            }
        }
    }, [visible, initialType, user]);

    const handleSave = async () => {
        if (!amount || parseFloat(amount) <= 0) {
            setError('Por favor ingresa un monto válido');
            return;
        }
        if (!selectedCategory) {
            setError('Por favor selecciona una categoría');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const numericAmount = parseFloat(amount);

            // Determine active categories source
            const activeCategories = (user && user.id !== 'guest-user-id') ? dbCategories : MOCK_CATEGORIES;
            const categoryObj = activeCategories.find((c: any) => c.id === selectedCategory);

            // GUEST MODE SIMULATION
            if (user?.id === 'guest-user-id') {
                await new Promise(resolve => setTimeout(resolve, 500)); // Mock delay
                const mockTx = {
                    id: Math.random().toString(),
                    amount: numericAmount,
                    date: new Date().toISOString(),
                    description: description || categoryObj?.name || 'Gasto',
                    category_id: selectedCategory,
                    user_id: 'guest-user-id',
                    created_at: new Date().toISOString(),
                    categories: {
                        id: selectedCategory,
                        name: categoryObj?.name || 'Categoría',
                        icon: categoryObj?.icon || 'help',
                        type: type,
                        created_at: new Date().toISOString()
                    }
                };

                if (onSave) onSave(mockTx); // Pass back the new item
                onClose();
                return;
            }

            // REAL MODE (Supabase)
            if (user && user.id !== 'guest-user-id') {
                const { data, error } = await createTransaction({
                    amount: numericAmount,
                    description: description,
                    category_id: selectedCategory,
                    user_id: user.id,
                    date: new Date().toISOString()
                });

                if (error) throw error;

                if (onSave) onSave(); // Trigger reload
                onClose();
            } else {
                if (onSave) onSave();
                onClose();
            }

        } catch (e) {
            console.error(e);
            setError('Error al guardar la transacción');
        } finally {
            setLoading(false);
        }
    };

    const activeColor = type === 'income' ? COLORS.primary : COLORS.expense;

    // Derived state for rendering
    const activeCategories = (user && user.id !== 'guest-user-id') ? dbCategories : MOCK_CATEGORIES;
    const filteredCategories = activeCategories.filter((c: any) => c.type === type);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <Ionicons name="close" size={24} color={COLORS.text} />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Nueva Transacción</Text>
                        <View style={{ width: 40 }} />
                    </View>

                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                        style={{ flex: 1 }}
                    >
                        <ScrollView
                            contentContainerStyle={styles.scrollContent}
                            keyboardShouldPersistTaps="handled"
                        >
                            {/* Switch Type */}
                            <View style={styles.switchContainer}>
                                <TouchableOpacity
                                    style={[
                                        styles.switchButton,
                                        type === 'income' && { backgroundColor: COLORS.primary, borderColor: COLORS.primary }
                                    ]}
                                    onPress={() => setType('income')}
                                >
                                    <Ionicons name="arrow-up-circle-outline" size={20} color={type === 'income' ? COLORS.background : COLORS.subtext} />
                                    <Text style={[styles.switchText, type === 'income' ? { color: COLORS.background } : { color: COLORS.subtext }]}>Ingreso</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[
                                        styles.switchButton,
                                        type === 'expense' && { backgroundColor: COLORS.expense, borderColor: COLORS.expense }
                                    ]}
                                    onPress={() => setType('expense')}
                                >
                                    <Ionicons name="arrow-down-circle-outline" size={20} color={type === 'expense' ? COLORS.background : COLORS.subtext} />
                                    <Text style={[styles.switchText, type === 'expense' ? { color: COLORS.background } : { color: COLORS.subtext }]}>Gasto</Text>
                                </TouchableOpacity>
                            </View>

                            {/* Amount Input */}
                            <View style={styles.amountContainer}>
                                <Text style={[styles.currencySymbol, { color: activeColor }]}>$</Text>
                                <TextInput
                                    style={styles.amountInput}
                                    placeholder="0.00"
                                    placeholderTextColor={COLORS.subtext}
                                    keyboardType="numeric"
                                    value={amount}
                                    onChangeText={setAmount}
                                />
                            </View>

                            {/* Description Input */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Descripción</Text>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="¿En qué gastaste?"
                                    placeholderTextColor={COLORS.subtext}
                                    value={description}
                                    onChangeText={setDescription}
                                />
                            </View>

                            {/* Category Selector */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Categoría</Text>
                                <ScrollView
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={styles.categoriesContainer}
                                >
                                    {filteredCategories.map((cat: any) => (
                                        <TouchableOpacity
                                            key={cat.id}
                                            style={[
                                                styles.categoryItem,
                                                selectedCategory === cat.id && { backgroundColor: activeColor, borderColor: activeColor }
                                            ]}
                                            onPress={() => setSelectedCategory(cat.id)}
                                        >
                                            <Ionicons
                                                name={cat.icon as any || 'help'}
                                                size={24}
                                                color={selectedCategory === cat.id ? COLORS.background : COLORS.text}
                                            />
                                            <Text style={[
                                                styles.categoryText,
                                                selectedCategory === cat.id && { color: COLORS.background, fontWeight: 'bold' }
                                            ]}>{cat.name}</Text>
                                        </TouchableOpacity>
                                    ))}
                                    {filteredCategories.length === 0 && (
                                        <Text style={{ color: COLORS.subtext, padding: 10 }}>
                                            {loading ? 'Cargando...' : 'No hay categorías (Ejecuta SQL)'}
                                        </Text>
                                    )}
                                </ScrollView>
                            </View>

                            {error ? (
                                <Text style={styles.errorText}>{error}</Text>
                            ) : null}

                            {/* Save Button */}
                            <TouchableOpacity
                                style={[styles.saveButton, { backgroundColor: activeColor }]}
                                onPress={handleSave}
                                disabled={loading}
                            >
                                {loading ? (
                                    <ActivityIndicator color={COLORS.background} />
                                ) : (
                                    <Text style={styles.saveButtonText}>Guardar Transacción</Text>
                                )}
                            </TouchableOpacity>

                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)', // Dark overlay
        justifyContent: 'flex-end', // Bottom sheet style or center
    },
    modalView: {
        backgroundColor: COLORS.background,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        height: Platform.OS === 'web' ? '90%' : '95%', // Take most of screen
        width: '100%',
        maxWidth: 600, // Limit width on large screens
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    closeButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        backgroundColor: COLORS.card,
    },
    headerTitle: {
        color: COLORS.text,
        fontSize: 18,
        fontWeight: 'bold',
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingVertical: 24,
        paddingBottom: 40,
    },
    switchContainer: {
        flexDirection: 'row',
        backgroundColor: COLORS.card,
        padding: 4,
        borderRadius: 16,
        marginBottom: 32,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    switchButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    switchText: {
        marginLeft: 8,
        fontSize: 16,
        fontWeight: '500',
    },
    amountContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40,
    },
    currencySymbol: {
        fontSize: 40,
        fontWeight: 'bold',
        marginRight: 8,
    },
    amountInput: {
        fontSize: 48,
        fontWeight: 'bold',
        color: COLORS.white,
        minWidth: 100,
        textAlign: 'center',
        // Standard outline removal for web
        ...Platform.select({
            web: { outlineStyle: 'none' } as any
        })
    },
    inputGroup: {
        marginBottom: 24,
    },
    label: {
        color: COLORS.subtext,
        fontSize: 14,
        marginBottom: 12,
        marginLeft: 4,
    },
    textInput: {
        backgroundColor: COLORS.card,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 16,
        padding: 16,
        color: COLORS.white,
        fontSize: 16,
    },
    categoriesContainer: {
        paddingRight: 20,
    },
    categoryItem: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: COLORS.card,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 16,
        marginRight: 12,
        minWidth: 80,
    },
    categoryText: {
        color: COLORS.subtext,
        fontSize: 12,
        marginTop: 8,
    },
    errorText: {
        color: COLORS.danger,
        textAlign: 'center',
        marginBottom: 16,
    },
    saveButton: {
        width: '100%',
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
    },
    saveButtonText: {
        color: COLORS.background,
        fontSize: 18,
        fontWeight: 'bold',
    },
});
