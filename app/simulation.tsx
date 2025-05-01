import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import tw from 'twrnc';
import { Header } from '../components/ui/Header';
import { useSimulation } from '../context/SimulationContext';
import { useLanguage } from '../context/LanguageContext';
import { imageMap } from '../utils/images';

export default function SimulationScreen() {
  const {
    questions,
    currentQuestionIndex,
    userAnswers,
    simulationStarted,
    simulationFinished,
    timer,
    answerQuestion,
    goToNextQuestion,
    goToPreviousQuestion,
    finishSimulation,
  } = useSimulation();
  const { t, language } = useLanguage();
  const router = useRouter();
  const [imageError, setImageError] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (!simulationStarted) {
      // If user somehow comes here without starting simulation
      router.replace('/');
    }
  }, [simulationStarted]);

  useEffect(() => {
    if (simulationFinished) {
      // Redirect to results screen after finishing
      router.replace('/SimulationResultsScreen');
    }
  }, [simulationFinished]);

  const handleSelectOption = (index: number) => {
    answerQuestion(index);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (!currentQuestion) {
    return (
      <View style={tw`flex-1 items-center justify-center bg-gray-100`}>
        <Text style={tw`text-lg text-gray-600`}>{t('noQuestionsAvailable')}</Text>
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-gray-100`}>
      <Header title={t('mainTitle')} showBackButton={true} />
      <View style={tw`flex-row justify-between items-center px-4 py-2 bg-blue-500`}>
        <Text style={tw`text-white font-bold text-xl`}>
          {t('question')} {currentQuestionIndex + 1} {t('of')} {questions.length}
        </Text>
        <Text style={tw`text-white text-lg`}>{formatTime(timer)}</Text>
      </View>

      <ScrollView contentContainerStyle={tw`p-6`}>
        <View style={tw`bg-white p-6 rounded-lg mb-6 shadow`}>
          <Text style={tw`text-xl font-bold text-gray-800 mb-4`}>
            {currentQuestion.text[language]}
          </Text>

          {currentQuestion.id && imageMap[(currentQuestion.id.toString())] && (
            <View style={tw`w-full mb-4`}>
              {imageError ? (
                <View style={tw`h-48 rounded-lg bg-gray-200 items-center justify-center`}>
                  <Text style={tw`text-gray-500`}>Image unavailable</Text>
                </View>
              ) : (
                <Image
                  source={imageMap[(currentQuestion.id.toString())]}
                  style={tw`h-48 w-full rounded-lg`}
                  resizeMode="contain"
                  onError={() => setImageError(true)}
                />
              )}
            </View>
          )}

          {Array.isArray(currentQuestion.options) && currentQuestion.options.map((option, index) => (
            <Pressable
              key={index}
              onPress={() => handleSelectOption(index)}
              style={tw`${userAnswers[currentQuestionIndex] === index ? 'bg-blue-500' : 'bg-gray-200'} p-4 rounded-lg mb-4`}
            >
              <Text style={tw`${userAnswers[currentQuestionIndex] === index ? 'text-white' : 'text-gray-700'} text-lg`}>
                {option[language]}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={tw`flex-row justify-between items-center`}>
          <Pressable
            onPress={goToPreviousQuestion}
            disabled={currentQuestionIndex === 0}
            style={tw`${currentQuestionIndex === 0 ? 'bg-gray-300' : 'bg-blue-500'} px-6 py-3 rounded-lg`}
          >
            <Text style={tw`text-white font-bold`}>
              {t('previous')}
            </Text>
          </Pressable>

          {currentQuestionIndex < questions.length - 1 ? (
            <Pressable
              onPress={goToNextQuestion}
              style={tw`bg-blue-500 px-6 py-3 rounded-lg`}
            >
              <Text style={tw`text-white font-bold`}>
                {t('next')}
              </Text>
            </Pressable>
          ) : (
            <Pressable
              onPress={finishSimulation}
              style={tw`bg-green-500 px-6 py-3 rounded-lg`}
            >
              <Text style={tw`text-white font-bold`}>
                {t('finish')}
              </Text>
            </Pressable>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
