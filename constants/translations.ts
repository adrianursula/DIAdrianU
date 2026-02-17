export const translations = {
    es: {
        common: {
            loading: 'Cargando...',
            save: 'Guardar',
            cancel: 'Cancelar',
            delete: 'Eliminar',
            edit: 'Editar',
            error: 'Error',
            success: 'Éxito',
            back: 'Volver'
        },
        auth: {
            loginTitle: 'Bienvenido de vuelta',
            loginSubtitle: 'Ingresa a tu cuenta',
            registerTitle: 'Crear Cuenta',
            registerSubtitle: 'Regístrate para comenzar',
            emailPlaceholder: 'Correo electrónico',
            passwordPlaceholder: 'Contraseña',
            loginButton: 'Iniciar Sesión',
            registerButton: 'Registrarse',
            guestButton: 'Continuar como Invitado',
            haveAccount: '¿Ya tienes cuenta?',
            noAccount: '¿No tienes cuenta?',
            forgotPassword: '¿Olvidaste tu contraseña?'
        },
        dashboard: {
            welcome: 'Bienvenido de vuelta,',
            balanceTotal: 'Saldo Total',
            income: 'Ingresos',
            expense: 'Gastos',
            recentTransactions: 'Movimientos Recientes',
            noTransactions: 'Sin movimientos',
            newIncome: 'Ingreso',
            newExpense: 'Gasto'
        },
        transactions: {
            title: 'Mis Transacciones',
            addTitle: 'Nueva Transacción',
            editTitle: 'Editar Transacción',
            amountPlaceholder: 'Monto',
            descPlaceholder: 'Descripción (Opcional)',
            selectCategory: 'Seleccionar Categoría',
            date: 'Fecha',
            saveButton: 'Guardar',
            updateButton: 'Actualizar',
            confirmDeleteTitle: 'Eliminar Transacción',
            confirmDeleteMsg: '¿Estás seguro de eliminar esta transacción?',
        },
        stats: {
            title: 'Estadísticas',
            topSpending: 'Mayor Gasto',
            topSpendingDesc: 'Estás gastando más en',
            breakdown: 'Desglose por Categoría',
            noData: 'No hay gastos registrados este mes.',
            totalExpenses: 'Total Gastos'
        },
        profile: {
            title: 'Perfil',
            fullName: 'Nombre Completo',
            currency: 'Moneda Principal',
            avatarUrl: 'URL de Avatar',
            language: 'Idioma',
            saveChanges: 'Guardar Cambios',
            logout: 'Cerrar Sesión',
            guestModeWarning: 'Modo Invitado: Los cambios no se guardan.',
            updateSuccess: 'Perfil actualizado correctamente',
            updateError: 'No se pudo actualizar el perfil'
        },
        tabs: {
            home: 'Inicio',
            stats: 'Estadísticas',
            list: 'Lista',
            profile: 'Perfil'
        }
    },
    en: {
        common: {
            loading: 'Loading...',
            save: 'Save',
            cancel: 'Cancel',
            delete: 'Delete',
            edit: 'Edit',
            error: 'Error',
            success: 'Success',
            back: 'Back'
        },
        auth: {
            loginTitle: 'Welcome Back',
            loginSubtitle: 'Sign in to your account',
            registerTitle: 'Create Account',
            registerSubtitle: 'Sign up to get started',
            emailPlaceholder: 'Email address',
            passwordPlaceholder: 'Password',
            loginButton: 'Sign In',
            registerButton: 'Sign Up',
            guestButton: 'Continue as Guest',
            haveAccount: 'Already have an account?',
            noAccount: 'Don\'t have an account?',
            forgotPassword: 'Forgot password?'
        },
        dashboard: {
            welcome: 'Welcome back,',
            balanceTotal: 'Total Balance',
            income: 'Income',
            expense: 'Expenses',
            recentTransactions: 'Recent Transactions',
            noTransactions: 'No transactions',
            newIncome: 'Income',
            newExpense: 'Expense'
        },
        transactions: {
            title: 'My Transactions',
            addTitle: 'New Transaction',
            editTitle: 'Edit Transaction',
            amountPlaceholder: 'Amount',
            descPlaceholder: 'Description (Optional)',
            selectCategory: 'Select Category',
            date: 'Date',
            saveButton: 'Save',
            updateButton: 'Update',
            confirmDeleteTitle: 'Delete Transaction',
            confirmDeleteMsg: 'Are you sure you want to delete this transaction?',
        },
        stats: {
            title: 'Statistics',
            topSpending: 'Top Spending',
            topSpendingDesc: 'You are spending most on',
            breakdown: 'Category Breakdown',
            noData: 'No expenses recorded this month.',
            totalExpenses: 'Total Expenses'
        },
        profile: {
            title: 'Profile',
            fullName: 'Full Name',
            currency: 'Main Currency',
            avatarUrl: 'Avatar URL',
            language: 'Language',
            saveChanges: 'Save Changes',
            logout: 'Log Out',
            guestModeWarning: 'Guest Mode: Changes are not saved.',
            updateSuccess: 'Profile updated successfully',
            updateError: 'Could not update profile'
        },
        tabs: {
            home: 'Home',
            stats: 'Stats',
            list: 'List',
            profile: 'Profile'
        }
    }
};

export type Language = 'es' | 'en';
