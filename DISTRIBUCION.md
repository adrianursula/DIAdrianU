# 📦 Distribución de ZeroG Finance

Esta guía explica cómo generar y distribuir ZeroG Finance para Android, iOS y Web.

## 🚀 Inicio Rápido

### 1. Crear cuenta Expo (Gratis)

```bash
# Ir a https://expo.dev y crear cuenta
# Luego login desde terminal:
eas login
```

### 2. Generar APK para Android

```bash
# APK para testing directo en dispositivo
eas build --platform android --profile preview

# Espera 15-20 min, recibirás un link de descarga
# Transfiere el APK a tu móvil e instala
```

### 3. Deploy Web

```bash
# Exportar app para web
npx expo export:web

# Subir carpeta 'web-build' a Netlify/Vercel
```

## 📋 Opciones Disponibles

### Android

- **APK** (preview): Instalar directamente en dispositivo
- **AAB** (production): Para Google Play Store

### iOS

- **IPA** (preview/production): Para TestFlight o App Store
- Requiere: Cuenta Apple Developer ($99/año)

### Web

- Deploy en Netlify, Vercel, GitHub Pages
- Totalmente gratis

## 📝 Configuración

- **Package**: `com.zerog.finance`
- **Versión**: `1.0.0`
- **Build Config**: `eas.json`

## 🔗 Recursos

- [Documentación EAS Build](https://docs.expo.dev/build/introduction/)
- [Expo Dashboard](https://expo.dev/)
- [Play Console](https://play.google.com/console/)

---

**Nota**: Esta NO es una PWA tradicional. Es una app React Native que genera binarios nativos.
