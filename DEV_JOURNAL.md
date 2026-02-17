# ZeroG Finance - Development Journal

## [2026-02-17] Inicio del Proyecto ZeroG

**Stack Definido:**
- **Frontend Framework:** Expo SDK 51 + Expo Router (File-based routing)
- **Styling:** NativeWind v2 (TailwindCSS para React Native)
- **Backend/Auth:** Supabase (PostgreSQL + Authentication)
- **State Management:** React Context API para autenticación
- **Storage:** SecureStore (mobile) / AsyncStorage (web) para persistencia de sesión

**Estructura de Navegación Creada:**
```
app/
├── (auth)/          # Grupo sin tabs - Login y Registro
│   ├── login.tsx
│   └── register.tsx
├── (tabs)/          # Grupo protegido con tabs
│   ├── _layout.tsx
│   ├── dashboard.tsx
│   ├── transactions.tsx
│   └── profile.tsx
├── _layout.tsx      # Root layout con AuthProvider
└── index.tsx        # Entry point con redirección
```

**Reto Principal:** 
Configuración de Auth persistente usando SecureStore para garantizar que el usuario no tenga que loguearse constantemente. Implementación de un sistema robusto de route guards que prevenga acceso no autorizado al dashboard.

**Decisiones de Diseño:**
- Color base de la app: `#0f172a` (Slate 900) - Fondo oscuro premium
- Esquema de color: Dark mode por defecto
- Textos: Slate-50 (blanco suave) y Slate-300 (gris claro)
- Inputs: Slate-800 con bordes Slate-700

**Próximos Pasos:**
1. Implementar AuthContext con gestión de sesión
2. Crear pantallas de Login y Registro con validación
3. Configurar route protection en el layout raíz
4. Establecer redirecciones automáticas basadas en estado de autenticación

---

## [2026-02-17] Fase 2: El Cerebro de Datos

**Database Schema Implementado:**
Creamos dos tablas principales en Supabase:
- **categories:** Almacena categorías de ingresos y gastos con iconos de Ionicons
- **transactions:** Almacena las transacciones del usuario con referencia a categorías

**Row Level Security (RLS):**
- Políticas implementadas para que usuarios solo vean sus propias transacciones
- Categorías son públicas (lectura para todos)

**Capa de Servicios:**
- `categoryService.ts`: Fetch de categorías con filtrado por tipo
- `transactionService.ts`: CRUD completo de transacciones + cálculo de balance
  - `fetchTransactions()`: Incluye JOIN con categorías para traer icono y nombre
  - `createTransaction()`: Inserción con validación
  - `deleteTransaction()`: Eliminación segura
  - `calculateBalance()`: Suma de ingresos menos gastos

**Integración UI:**
- Dashboard ahora muestra datos reales desde Supabase
- Balance calculado dinámicamente (total, ingresos, gastos)
- Últimas 5 transacciones con:
  - Glassmorphism: `bg-slate-800/50` con bordes sutiles
  - Color coding: Cyan (#38bdf8) para ingresos, Purple (#c084fc) para gastos
  - Iconos de categoría desde la BD
  - Función de eliminar transacción
- RefreshControl implementado (pull-to-refresh)

**Modal de Nueva Transacción:**
- Toggle entre Ingreso/Gasto
- Input de monto (teclado numérico)
- Selector de categoría (filtrado por tipo seleccionado)
- Campo de descripción opcional
- Input de fecha con formato YYYY-MM-DD
- Validación completa antes de guardar
- Feedback de éxito y cierre automático

**Desafíos Resueltos:**
1. Join de tablas en Supabase: Usar sintaxis `select('*, categories(*)')`
2. Formato de fechas: Usar ISO string (YYYY-MM-DD) para compatibilidad
3. Tipado TypeScript estricto para prevenir errores en runtime
4. Recarga automática del dashboard después de crear transacción

**Próximos Pasos (Fase 3):**
1. Pantalla completa de Transacciones con paginación
2. Filtros por categoría y rango de fechas
3. Gráficas de gastos mensuales
4. Exportación de datos
