import { LanguageProvider } from './context/LanguageContext'; // Adjust the path
import { Slot } from 'expo-router';

export default function App() {
  return (
    <LanguageProvider>
      <Slot />
    </LanguageProvider>
  );
}
