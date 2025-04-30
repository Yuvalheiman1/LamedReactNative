import React, { useEffect } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import tw from 'twrnc';
import { Header } from '../components/ui/Header';
import { useSimulation } from '../context/SimulationContext';
import { useLanguage } from '../context/LanguageContext';
import { useDirectionStyle } from '@/hooks/useDirectionStyle';
import { QuestionCard } from '../components/ui/QuestionCard';

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
  const dirStyle = useDirectionStyle();

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
      <View style={[tw`flex-row justify-between items-center px-4 py-2 bg-blue-500`, { flexDirection: dirStyle.flexDirection }]}>
        <Text style={tw`text-white font-bold text-xl`}>
          {t('question')} {currentQuestionIndex + 1} {t('of')} {questions.length}
        </Text>
        <Text style={tw`text-white text-lg`}>{formatTime(timer)}</Text>
      </View>

      <ScrollView contentContainerStyle={tw`p-6`}>
        <View style={tw`bg-white p-6 rounded-lg mb-6 shadow`}>
          <QuestionCard
            question={currentQuestion.text[language]}
            options={currentQuestion.options.map(opt => opt[language])}
            correctOptionIndex={currentQuestion.correctOptionIndex}
            imageSource={currentQuestion.imageSource ? { uri: currentQuestion.imageSource } : undefined}
            onSelectOption={handleSelectOption}
            selectedOptionIndex={userAnswers[currentQuestionIndex]}
          />
        </View>

        <View style={[tw`flex-row justify-between items-center`, { flexDirection: dirStyle.flexDirection }]}>
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
