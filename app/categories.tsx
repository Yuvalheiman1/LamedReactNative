import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../components/ui/Header'; // adjust if needed
import { useLanguage } from '../context/LanguageContext'; // adjust if needed

export default function CategoriesScreen() {
  const router = useRouter();
  const { t } = useLanguage();

  // For now, simple hardcoded categories
  const categories = [
    { id: 1, title: t('roadSigns'), icon: 'warning-outline' },
    { id: 2, title: t('trafficRules'), icon: 'car-sport-outline' },
    { id: 3, title: t('vehicleControl'), icon: 'speedometer-outline' },
    { id: 4, title: t('safety'), icon: 'shield-checkmark-outline' },
  ];

  const handleCategorySelect = (id: number) => {
    console.log('Selected category ID:', id);
    router.push(`/category/${id}`); // Navigate to questions page for this category (we'll build later)
  };

  return (
    <View style={tw`flex-1 bg-gray-100`}>
      <Header title={t('selectCategory')} showBackButton={true} />

      <ScrollView contentContainerStyle={tw`p-6`}>
        {categories.map((cat) => (
          <Pressable
            key={cat.id}
            onPress={() => handleCategorySelect(cat.id)}
            style={tw`bg-white rounded-xl p-6 mb-4 flex-row items-center gap-4 border border-gray-200`}
          >
            <Ionicons name={cat.icon as any} size={32} color="#3B82F6" />
            <Text style={tw`text-lg font-bold text-gray-700`}>{cat.title}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
