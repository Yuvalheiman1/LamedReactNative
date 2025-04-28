import React, { useState } from 'react';
import { View, Text, Pressable, Modal, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import { MaterialCommunityIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useLanguage } from '../../context/LanguageContext'; // adjust path if needed
import { SafeAreaView } from 'react-native';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  vehicleType?: 'B' | 'C';
}

export const Header: React.FC<HeaderProps> = ({ title, showBackButton = true, vehicleType = 'B' }) => {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { setLanguage } = useLanguage();  // <-- use context directly

  const getHeaderIcon = () => {
    if (vehicleType === 'B') {
      return <FontAwesome5 name="car" size={24} color="white" />;
    }
    if (vehicleType === 'C') {
      return <MaterialCommunityIcons name="truck" size={24} color="white" />;
    }
    return <Ionicons name="help-circle-outline" size={24} color="white" />;
  };

  const handleLanguageSelect = (lang: 'he' | 'en' | 'ar') => {
    setIsModalVisible(false);
    setLanguage(lang);  // <-- update LanguageContext directly
  };

  return (
    <SafeAreaView style={tw`bg-blue-500`}>
      <View style={tw`w-full py-3 px-4 bg-blue-500 flex-row items-center justify-between`}>
        <View style={tw`flex-row items-center gap-3`}>
          {showBackButton && (
            <Pressable 
              onPress={() => navigation.goBack()}
              style={tw`p-2 rounded-full bg-white/10`}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </Pressable>
          )}
  
          <View style={tw`flex-row items-center gap-2`}>
            <View style={tw`p-2 rounded-full bg-white/10`}>
              {getHeaderIcon()}
            </View>
            <Text style={tw`text-white text-xl font-bold`}>
              {title}
            </Text>
          </View>
        </View>
  
        <Pressable 
          onPress={() => setIsModalVisible(true)}
          style={tw`p-2 rounded-full bg-white/10`}
        >
          <Ionicons name="globe-outline" size={24} color="white" />
        </Pressable>
      </View>
  
      {/* Language Picker Modal */}
      <Modal
        animationType="slide"
        transparent
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={tw`flex-1 bg-black/50 items-center justify-center`}>
          <View style={tw`bg-white rounded-lg p-6 w-3/4`}>
            <Text style={tw`text-xl font-bold mb-4 text-center`}>Select Language</Text>
  
            <TouchableOpacity style={tw`py-2`} onPress={() => handleLanguageSelect('he')}>
              <Text style={tw`text-lg text-center text-blue-600`}>עברית</Text>
            </TouchableOpacity>
  
            <TouchableOpacity style={tw`py-2`} onPress={() => handleLanguageSelect('en')}>
              <Text style={tw`text-lg text-center text-blue-600`}>English</Text>
            </TouchableOpacity>
  
            <TouchableOpacity style={tw`py-2`} onPress={() => handleLanguageSelect('ar')}>
              <Text style={tw`text-lg text-center text-blue-600`}>العربية</Text>
            </TouchableOpacity>
  
            <TouchableOpacity
              style={tw`mt-4 p-2 rounded-md bg-gray-300`}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={tw`text-center text-gray-800`}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
};  