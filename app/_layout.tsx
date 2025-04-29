import { LanguageProvider } from '../context/LanguageContext';
import { VehicleProvider } from '../context/VehicleContext';
import { SimulationProvider } from '../context/SimulationContext';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <LanguageProvider>
      <VehicleProvider>
        <SimulationProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              animation: 'slide_from_right', // Smooth screen transitions
              gestureEnabled: true, // Allow swipe back (iOS)
            }}
          />
        </SimulationProvider>
      </VehicleProvider>
    </LanguageProvider>
  );
}
