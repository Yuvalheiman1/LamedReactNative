import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { } from '@expo/vector-icons'; // adjust path
import { useLanguage } from '../context/LanguageContext'; // adjust path
import { Header } from '../components/ui/Header'; // adjust path
import { useVehicle } from '../context/VehicleContext'; // adjust path

export default function VehicleSelectionScreen() {
  const router = useRouter();
  const { t, language, direction } = useLanguage();  // <-- Pull language as well (even if not using)
  const { setVehicleType } = useVehicle();
  const handleVehicleSelect = (type: 'B' | 'C') => {
    setVehicleType(type);
    console.log('Selected vehicle type:', type);
    router.push('/HomeScreen'); // Navigate to vehicle details screen
  };
  return (
    <View style={tw`flex-1 bg-gray-100`}>
      {/* No back button */}
      <Header title={t('selectVehicle')} showBackButton={false} />

      <View style={tw`flex-1 p-6 justify-center`}>
        <Text style={tw`text-2xl font-bold text-center text-gray-800 mb-2`}>
          {t('chooseVehicleType')}
        </Text>
        <Text style={tw`text-center text-gray-600 mb-8`}>
          {t('vehicleTypeDescription')}
        </Text>

        <View style={tw`gap-6`}>
          {/* Car License Card */}
          <Pressable 
            onPress={() => handleVehicleSelect('B')} 
            style={tw`bg-white p-6 rounded-xl border-2 border-blue-500`}
          >
            <View style={tw`flex-row items-center gap-4`}>
              <View style={tw`p-3 rounded-full bg-blue-100`}>
                <Ionicons name="car" size={24} color="#3B82F6" />
              </View>
              <View style={tw`flex-1`}>
                <Text style={tw`text-lg font-bold text-blue-700`}>{t('carLicense')}</Text>
                <Text style={tw`text-sm text-gray-500`}>{t('typeB')}</Text>
              </View>
            </View>
            <Text style={tw`text-gray-600 text-sm mt-4`}>{t('carDescription')}</Text>
          </Pressable>

          {/* Truck License Card */}
          <Pressable 
            onPress={() => handleVehicleSelect('C')} 
            style={tw`bg-white p-6 rounded-xl border-2 border-green-500`}
          >
            <View style={tw`flex-row items-center gap-4`}>
              <View style={tw`p-3 rounded-full bg-green-100`}>
                <Ionicons name="bus" size={24} color="#10B981" />
              </View>
              <View>
                <Text style={tw`text-lg font-bold text-green-700`}>{t('truckLicense')}</Text>
                <Text style={tw`text-sm text-gray-500`}>{t('typeC')}</Text>
              </View>
            </View>
            <Text style={tw`text-gray-600 text-sm mt-4`}>{t('truckDescription')}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
