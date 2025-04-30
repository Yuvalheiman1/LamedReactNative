import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, Pressable, TextInput } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import tw from 'twrnc';
import { Header } from '../../../components/ui/Header';
import { useLanguage } from '../../../context/LanguageContext';
import { useVehicle } from '../../../context/VehicleContext';
import { QuestionCard } from '../../../components/ui/QuestionCard';
import { Animated } from 'react-native';
import { useRef, useEffect } from 'react';

import roadSigns from '../../../data/road-signs.json';
import trafficRules from '../../../data/traffic-rules.json';
import safetyProcedures from '../../../data/safety-procedures.json';
import vehicleControl from '../../../data/vehicle-control.json';
import truckRoadSigns from '../../../data/truck-road-signs.json';
import truckTrafficRules from '../../../data/truck-traffic-rules.json';
import truckSafetyProcedures from '../../../data/truck-safety-procedures.json';
import truckVehicleControl from '../../../data/truck-vehicle-control.json';



export default function StudyQuestionsScreen() {
  const { vehicleType, categoryId } = useLocalSearchParams<{ vehicleType: string; categoryId: string }>();
  const { t, language } = useLanguage();
  const router = useRouter();
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([null]);


  const [currentIndex, setCurrentIndex] = useState(0);

  const questions = useMemo(() => {
    let allQuestions: any[] = [];

    if (vehicleType === 'B') {
      if (categoryId === '0') allQuestions = [...roadSigns, ...trafficRules, ...vehicleControl, ...safetyProcedures];
      if (categoryId === '1') allQuestions = roadSigns;
      if (categoryId === '2') allQuestions = trafficRules;
      if (categoryId === '3') allQuestions = vehicleControl;
      if (categoryId === '4') allQuestions = safetyProcedures;
    } else if (vehicleType === 'C') {
      if (categoryId === '0') allQuestions = [...roadSigns, ...trafficRules, ...vehicleControl, ...safetyProcedures, ...truckRoadSigns, ...truckTrafficRules, ...truckVehicleControl, ...truckSafetyProcedures];
      if (categoryId === '1') allQuestions = [...truckRoadSigns , ...roadSigns];
      if (categoryId === '2') allQuestions = [...truckTrafficRules , ...trafficRules];
      if (categoryId === '3') allQuestions = [...truckVehicleControl , ...vehicleControl];
      if (categoryId === '4') allQuestions = [...truckSafetyProcedures , ...safetyProcedures];
    }

    return allQuestions;
  }, [categoryId, vehicleType]);

  const currentQuestion = questions[currentIndex];

  const handleSelectOption = (optionIndex: number) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentIndex] = optionIndex;
    setUserAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      // Reset the selected option for the next question
      const updatedAnswers = [...userAnswers];
      updatedAnswers[currentIndex + 1] = null;
      setUserAnswers(updatedAnswers);

    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      // Reset the selected option for the previous question
      const updatedAnswers = [...userAnswers];
      updatedAnswers[currentIndex - 1] = null;
      setUserAnswers(updatedAnswers);
    }
  };

  if (!currentQuestion) {
    return (
      <View style={tw`flex-1 items-center justify-center`}>
        <Text style={tw`text-gray-700 text-lg`}>No questions available.</Text>
      </View>
    );
  }

  const fadeAnim = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    // Fade out
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [currentIndex]);
  return (
    <View style={tw`flex-1 bg-gray-100`}>
      <Header title={t('studyMode')} showBackButton={true} />

      <ScrollView contentContainerStyle={tw`p-6`}>
        <View style={tw`bg-blue-100 rounded-xl p-4 mb-6`}>
          <View style={tw`flex-row justify-center items-center mb-4`}>
            {/* Editable Input for Current Question Number */}
            <TextInput
              value={(currentIndex + 1).toString()}
              onChangeText={(text) => {
                let num = parseInt(text);
                if (!isNaN(num) && num >= 1 && num <= questions.length) {
                  setCurrentIndex(num - 1);
                }
              }}
              keyboardType="numeric"
              style={tw`bg-white rounded-md px-4 py-2 mx-2 text-center text-lg font-bold text-blue-600 w-16`}
            />

            {/* "of X" Text */}
            <Text style={tw`text-lg font-semibold text-gray-700`}>
              {`${t('of')} ${questions.length}`}
            </Text>
          </View>

        {/* Shuffle Button */}
        <Pressable
          onPress={() => {
            const shuffled = [...questions].sort(() => 0.5 - Math.random());
            setCurrentIndex(0); // Go back to first after shuffle
            // Because 'questions' is a const inside useMemo, you need to add a setQuestions state to support real shuffle. (I'll explain below)
          }}
          style={tw`bg-blue-500 px-4 py-2 rounded-lg items-center`}
        >
          <Text style={tw`text-white font-bold`}>{t('shuffleQuestions')}</Text>
        </Pressable>
      </View>

        <Animated.View style={{ opacity: fadeAnim }}>
          <QuestionCard
            question={currentQuestion.text[language]}
            options={currentQuestion.options.map((opt: any) => opt[language])}
            correctOptionIndex={currentQuestion.correctOptionIndex}
            imageSource={currentQuestion.imageSource ? { uri: currentQuestion.imageSource } : undefined}
            onSelectOption={handleSelectOption}
            selectedOptionIndex={userAnswers[currentIndex]}
          />
        </Animated.View>

        <View style={tw`flex-row justify-between mt-6`}>
          <Pressable
            onPress={handlePrevious}
            disabled={currentIndex === 0}
            style={tw`${currentIndex === 0 ? 'bg-gray-300' : 'bg-blue-500'} px-6 py-3 rounded-lg`}
          >
            <Text style={tw`text-white font-bold`}>{t('previous')}</Text>
          </Pressable>

          <Pressable
            onPress={handleNext}
            disabled={currentIndex >= questions.length - 1}
            style={tw`${currentIndex >= questions.length - 1 ? 'bg-gray-300' : 'bg-blue-500'} px-6 py-3 rounded-lg`}
          >
            <Text style={tw`text-white font-bold`}>{t('next')}</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
