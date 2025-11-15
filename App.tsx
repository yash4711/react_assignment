import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ErrorBoundary from './src/components/ErrorBoundary';
import ProfileScreen from './src/screens/ProfileScreen';

export default function App() {
  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <ProfileScreen />
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}
