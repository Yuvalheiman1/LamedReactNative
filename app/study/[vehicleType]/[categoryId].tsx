import React, { useMemo, useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import tw from 'twrnc';
import { Header } from '../../../components/ui/Header';
import { useLanguage } from '../../../context/LanguageContext';
import { useVehicle } from '../../../context/VehicleContext';
import { QuestionCard } from '../../../components/ui/QuestionCard';
import { Animated } from 'react-native';
import { imageMap } from '@/utils/images';
import QuestionNavigatorInput from '../../../components/QuestionNavigatorInput';

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
  const { t, language, direction } = useLanguage();
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const fadeAnim = useRef(new Animated.Value(1)).current;

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

  // Initialize userAnswers array when questions change
  useEffect(() => {
    setUserAnswers(new Array(questions.length).fill(null));
  }, [questions]);

  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [currentIndex]);

  const handleSelectOption = (optionIndex: number) => {
    setUserAnswers(prev => {
      const updated = [...prev];
      updated[currentIndex] = optionIndex;
      return updated;
    });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  // Updated setCurrentIndex wrapper to maintain userAnswers state
  const handleIndexChange = (newIndex: number) => {
    setCurrentIndex(newIndex);
  };

  if (!currentQuestion) {
    return (
      <View style={tw`flex-1 items-center justify-center`}>
        <Text style={tw`text-gray-700 text-lg`}>{t('noQuestionsAvailable')}</Text>
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-gray-100`}>
      <Header title={t('studyMode')} showBackButton={true} />

      <ScrollView contentContainerStyle={tw`p-6`}>
        <View style={tw`bg-blue-100 rounded-xl p-4 mb-6`}>
          <QuestionNavigatorInput
            currentIndex={currentIndex}
            setCurrentIndex={handleIndexChange}
            questions={questions}
          />

          <Pressable
            onPress={() => {
              const shuffled = [...questions].sort(() => 0.5 - Math.random());
              setCurrentIndex(0);
            }}
            style={tw`bg-blue-500 px-4 py-2 rounded-lg items-center`}
          >
            <Text style={tw`text-white font-bold`}>{t('shuffleQuestions')}</Text>
          </Pressable>
        </View>

        <Animated.View style={{ opacity: fadeAnim }}>
          <QuestionCard
            id={currentQuestion.id.toString()}
            question={currentQuestion.text[language]}
            options={currentQuestion.options.map((opt: any) => opt[language])}
            correctOptionIndex={currentQuestion.correctOptionIndex}
            imageSource={currentQuestion.id && imageMap[currentQuestion.id] ? imageMap[currentQuestion.id] : undefined}
            onSelectOption={handleSelectOption}
            selectedOptionIndex={userAnswers[currentIndex]}
          />
        </Animated.View>

        <View style={tw`flex-row justify-between mt-6 ${direction === 'rtl' ? 'flex-row-reverse' : 'flex-row'}`}>
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
