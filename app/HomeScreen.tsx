import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../context/LanguageContext'; // adjust path
import { Header } from '../components/ui/Header'; // adjust path
import { useSimulation } from '../context/SimulationContext'; // ✅ Import simulation context
import { useVehicle} from '../context/VehicleContext';


// export default function HomeScreen() {
//   const router = useRouter();
//   const { t, language } = useLanguage();

//   const handleStartSimulation = () => {
//     console.log('Start simulation clicked');
//     router.push('/simulation'); // Adjust path when screen ready
//   };


 
export default function HomeScreen() {
  const router = useRouter();
  const { t } = useLanguage();
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

  // rest of your HomeScreen (no change needed to Study Mode etc.)


  return (
    <View style={tw`flex-1 bg-gray-100`}>
      <Header title={t('mainTitle')} showBackButton={true} />

      <ScrollView contentContainerStyle={tw`p-6`}>
        {/* Study Mode Card */}
        <View style={tw`bg-white rounded-xl border-t-4 border-blue-500 p-6 mb-6 shadow`}>
          <View style={tw`flex-row items-center gap-2 mb-4`}>
            <Ionicons name="book-outline" size={24} color="#3B82F6" />
            <Text style={tw`text-xl font-bold text-blue-700`}>
              {t('studyMode')}
            </Text>
          </View>
          <Text style={tw`text-gray-600 mb-6`}>
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
          <View style={tw`flex-row items-center gap-2 mb-4`}>
            <Ionicons name="time-outline" size={24} color="#10B981" />
            <Text style={tw`text-xl font-bold text-green-700`}>
              {t('simulationMode')}
            </Text>
          </View>
          <Text style={tw`text-gray-600 mb-6`}>
            {t('simulationModeDescription')}
          </Text>
          <Pressable
            onPress={handleStartSimulation}
            style={tw`bg-green-500 py-4 rounded-lg items-center`}
          >
            <Text style={tw`text-white text-lg`}>{t('startSimulation')}</Text>
          </Pressable>
        </View>

        {/* Primum Course Card */}
        <View style={tw`bg-white rounded-xl border-t-4 border-yellow-500 p-6 mb-6 shadow`}>
          <View style={tw`flex-row items-center gap-2 mb-4`}>
            <Ionicons name="film-outline" size={24} color="#F59E0B" />
            <Text style={tw`text-xl font-bold text-yellow-500`}>
              {t('primumCourse')}
            </Text>
          </View>
          <Text style={tw`text-gray-600 mb-6`}>
            {t('primumCourseDescription')}
          </Text>
          <Pressable
            style={tw`bg-yellow-500 py-4 rounded-lg items-center`}
            onPress={() => console.log('Clicked Primum Course')}
          >
            <Text style={tw`text-white text-lg`}>{t('primumZone')}</Text>
          </Pressable>
        </View>

        {/* Learning Tip Section */}
        <View style={tw`bg-white rounded-xl p-6 shadow border border-gray-100 text-center`}>
          <View style={tw`flex-row items-center justify-center mb-4`}>
            <Ionicons name="information-circle-outline" size={24} color="#3B82F6" />
            <Text style={tw`text-lg font-semibold ml-2`}>
              {t('learningTip')}
            </Text>
          </View>
          <Text style={tw`text-gray-600 text-center`}>
            {t('learningTipContent')}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

