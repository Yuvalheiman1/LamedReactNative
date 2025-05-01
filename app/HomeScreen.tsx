import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../context/LanguageContext'; // adjust path
import { Header } from '../components/ui/Header'; // adjust path
import { useSimulation } from '../context/SimulationContext'; // ✅ Import simulation context
import { useVehicle} from '../context/VehicleContext';

export default function HomeScreen() {
  const router = useRouter();
  const { t, direction } = useLanguage();
  const { startSimulation } = useSimulation(); // ✅ Get startSimulation
  const { vehicleType } = useVehicle(); // ✅ Get vehicleType from VehicleContext

  const handleStartSimulation = () => {
    if (!vehicleType) {
      console.error('Vehicle type not selected!');
      return;
    }
    startSimulation(); // pass it into startSimulation
    router.push('/simulation');
  };

  return (
    <View style={tw`flex-1 bg-gray-100`}>
      <Header title={t('mainTitle')} showBackButton={true} />

      <ScrollView contentContainerStyle={tw`p-6`}>
        {/* Study Mode Card */}
        <View style={tw`bg-white rounded-xl border-t-4 border-blue-500 p-6 mb-6 shadow`}>
          <View style={tw`flex-row items-center gap-2 mb-4 ${direction === 'ltr' ? 'flex-row' : 'flex-row-reverse'}`}>
            <Ionicons name="book-outline" size={24} color="#3B82F6" />
            <Text style={tw`text-xl font-bold text-blue-700 ${direction === 'ltr' ? 'text-left' : 'text-right'}`}>
              {t('studyMode')}
            </Text>
          </View>
          <Text style={tw`text-gray-600 mb-6 ${direction === 'ltr' ? 'text-left' : 'text-right'}`}>
            {t('studyModeDescription')}
          </Text>
          <Pressable
            onPress={() => router.push('/StudyCategoriesScreen')} // Adjust when ready
            style={tw`bg-blue-500 py-4 rounded-lg items-center`}
          >
            <Text style={tw`text-white text-lg`}>{t('startStudying')}</Text>
          </Pressable>
        </View>

        {/* Simulation Mode Card */}
        <View style={tw`bg-white rounded-xl border-t-4 border-green-500 p-6 mb-6 shadow`}>
          <View style={tw`flex-row items-center gap-2 mb-4 ${direction === 'ltr' ? 'flex-row' : 'flex-row-reverse'}`}>
            <Ionicons name="time-outline" size={24} color="#10B981" />
            <Text style={tw`text-xl font-bold text-green-700 ${direction === 'ltr' ? 'text-left' : 'text-right'}`}>
              {t('simulationMode')}
            </Text>
          </View>
          <Text style={tw`text-gray-600 mb-6 ${direction === 'ltr' ? 'text-left' : 'text-right'}`}>
            {t('simulationModeDescription')}
          </Text>
          <Pressable
            onPress={handleStartSimulation}
            style={tw`bg-green-500 py-4 rounded-lg items-center`}
          >
            <Text style={tw`text-white text-lg`}>{t('startSimulation')}</Text>
          </Pressable>
        </View>

        {/* Premium Course Card */}
        <View style={tw`bg-white rounded-xl border-t-4 border-yellow-500 p-6 mb-6 shadow`}>
          <View style={tw`flex-row items-center gap-2 mb-4 ${direction === 'ltr' ? 'flex-row' : 'flex-row-reverse'}`}>
            <Ionicons name="film-outline" size={24} color="#F59E0B" />
            <Text style={tw`text-xl font-bold text-yellow-500 ${direction === 'ltr' ? 'text-left' : 'text-right'}`}>
              {t('primumCourse')}
            </Text>
          </View>
          <Text style={tw`text-gray-600 mb-6 ${direction === 'ltr' ? 'text-left' : 'text-right'}`}>
            {t('primumCourseDescription')}
          </Text>
          <Pressable
            style={tw`bg-yellow-500 py-4 rounded-lg items-center`}
            onPress={() => console.log('Clicked Premium Course')}
          >
            <Text style={tw`text-white text-lg`}>{t('primumZone')}</Text>
          </Pressable>
        </View>

        {/* Learning Tip Section */}
        <View style={tw`bg-white rounded-xl p-6 shadow border border-gray-100 text-center`}>
          <View style={tw`flex-row items-center justify-center mb-4 ${direction === 'ltr' ? 'flex-row' : 'flex-row-reverse'}`}>
            <Ionicons name="information-circle-outline" size={24} color="#3B82F6" />
            <Text style={tw`text-lg font-semibold ml-2 ${direction === 'ltr' ? 'text-left' : 'text-right'}`}>
              {t('learningTip')}
            </Text>
          </View>
          <Text style={tw`text-gray-600 text-center ${direction === 'ltr' ? 'text-left' : 'text-right'}`}>
            {t('learningTipContent')}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

