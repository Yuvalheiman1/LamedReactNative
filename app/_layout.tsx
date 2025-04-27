import { LanguageProvider } from '../context/LanguageContext'; // adjust if needed
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <LanguageProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </LanguageProvider>
  );
}
