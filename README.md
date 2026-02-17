# ZeroG Finance 🚀

Una aplicación de finanzas personales moderna, segura y elegante construida con **Expo** y **Supabase**.

![ZeroG Finance Banner](https://images.unsplash.com/photo-1639322537228-ad714dd474f5?q=80&w=1000&auto=format&fit=crop)

## 🌟 Características

- **Autenticación Segura**: Registro e inicio de sesión con Supabase Auth.
- **Modo Invitado**: Prueba la app sin necesidad de registrarte.
- **Dashboard en Tiempo Real**: Visualiza tu saldo, ingresos y gastos al instante.
- **Gestión de Transacciones**: Crea, edita y elimina movimientos con facilidad.
- **Estadísticas Visuales**: Gráficos de anillo (Donut Charts) para entender tus gastos por categoría.
- **Multi-idioma**: Soporte nativo para Español 🇪🇸 e Inglés 🇺🇸.
- **Perfil Personalizable**: Edita tu nombre, avatar y moneda preferida.
- **Diseño Premium**: Interfaz oscura moderna usando NativeWind (Tailwind CSS).
- **Multi-Plataforma**: Funciona en Web, Android e iOS.

## 🛠️ Tech Stack

- **Framework**: Expo SDK 52
- **Lenguaje**: TypeScript
- **Estilos**: NativeWind (TailwindCSS)
- **Backend & BD**: Supabase (PostgreSQL + RLS)
- **Gráficos**: React Native SVG
- **Navegación**: Expo Router

## 📚 Documentación

Hemos generado una web de documentación detallada que incluye la arquitectura, guía de usuario y bitácora de desarrollo.
Puedes verla abriendo el archivo local:
`docs/index.html`

## 🚀 Instalación y Uso

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/zerog-finance.git
   cd zerog-finance
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Configurar Variables de Entorno**:
   Crea un archivo `.env` en la raíz (puedes copiar `.env.example` si existe, o usar tus propias credenciales de Supabase):
   ```env
   EXPO_PUBLIC_SUPABASE_URL=tu_url_de_supabase
   EXPO_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_de_supabase
   ```

4. **Ejecutar**:
   - Web: `npm run web`
   - Móvil: `npx expo start` (Escanear QR con Expo Go)

## 📱 Build APK (Android)

Para generar el ejecutable de Android usado en nuestro desarrollo:

```bash
npm install -g eas-cli
eas build -p android --profile preview
```

## 📄 Licencia

Este proyecto es para fines educativos y de demostración.
