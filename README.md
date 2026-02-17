# ZeroG Finance

A modern personal finance application built with Expo, React Native, and Supabase.

## Tech Stack

- **Framework:** Expo SDK 51 + Expo Router
- **Styling:** NativeWind (TailwindCSS for React Native)
- **Backend:** Supabase (Authentication & Database)
- **Language:** TypeScript

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo Go app (for testing on physical device) or an emulator

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Copy `.env` and add your Supabase credentials:
     - `EXPO_PUBLIC_SUPABASE_URL`
     - `EXPO_PUBLIC_SUPABASE_ANON_KEY`

4. Start the development server:
```bash
npm start
```

## Project Structure

```
app/
├── (auth)/          # Authentication screens (no tabs)
│   ├── login.tsx
│   └── register.tsx
├── (tabs)/          # Protected screens with tab navigation
│   ├── dashboard.tsx
│   ├── transactions.tsx
│   └── profile.tsx
├── _layout.tsx      # Root layout with AuthProvider
└── index.tsx        # Entry point with auth-based routing

contexts/
└── AuthContext.tsx  # Authentication state management

lib/
└── supabase.ts      # Supabase client configuration
```

## Features

- ✅ Secure authentication with Supabase
- ✅ Persistent sessions using SecureStore
- ✅ Protected routes with automatic redirects
- ✅ Dark theme by default
- ✅ Tab-based navigation for main app sections

## Development Journal

See `DEV_JOURNAL.md` for detailed development notes and decisions.

## License

Private project
