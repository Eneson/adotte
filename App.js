import 'intl'
import 'intl/locale-data/jsonp/pt-BR'
import React from 'react'
import Routes from './src/routes'
import { ClerkProvider,useAuth } from '@clerk/clerk-expo'

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY


export default function App() {
  return (
    <ClerkProvider frontendApi={publishableKey}>
      <Routes />
    </ClerkProvider>
  );
}
