import React, { useMemo } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import tw from 'twrnc';
import { useSimulation } from '../context/SimulationContext';
import { useLanguage } from '../context/LanguageContext';
import { Header } from '../components/ui/Header';

export default function SimulationResultsScreen() {
  const { questions, userAnswers, resetSimulation, startSimulation } = useSimulation();
  const { t, language, direction } = useLanguage();
  const router = useRouter();

  // Calculate results
  const { correctCount, incorrectQuestions, scorePercentage } = useMemo(() => {
    let correct = 0;
    const incorrect: typeof questions = [];

    userAnswers.forEach((answer, idx) => {
      if (answer === questions[idx].correctOptionIndex) {
        correct++;
      } else {
        incorrect.push(questions[idx]);
      }
    });

    const percentage = (correct / questions.length) * 100;
    return { correctCount: correct, incorrectQuestions: incorrect, scorePercentage: Math.round(percentage) };
  }, [userAnswers, questions]);

  const handleRetry = () => {
    resetSimulation();
    // Start a new simulation before navigating
    startSimulation();
    router.replace('/simulation');
  };

  const handleBackHome = () => {
    resetSimulation();
    router.back();
  };

  return (
    <View style={tw`flex-1 bg-gray-100`}>
      <Header title={t('testResults')} showBackButton = {false} />

    <ScrollView contentContainerStyle={tw`p-6 bg-gray-100 flex-grow`}>
      {/* Title */}
      <Text style={tw`text-3xl font-bold text-center text-gray-800 mb-6 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
        {t('testResults')}
      </Text>

      {/* Score Card */}
      <View style={tw`bg-white rounded-xl shadow p-6 mb-6`}>
        <Text style={tw`text-2xl font-bold text-center mb-4 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
          {correctCount} / {questions.length} ({scorePercentage}%)
        </Text>

        <Text style={tw`text-xl text-center ${scorePercentage >= 80 ? 'text-green-600' : 'text-red-500'} ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
          {scorePercentage >= 80 ? t('passed') : t('failed')}
        </Text>

        <View style={tw`h-3 rounded-full bg-gray-200 mt-6`}>
          <View
            style={[
              tw`h-3 rounded-full`,
              {
                backgroundColor: scorePercentage >= 80 ? '#10B981' : '#EF4444',
                width: `${scorePercentage}%`,
              },
            ]}
          />
        </View>

        <View style={tw`flex-row justify-around mt-6 ${direction === 'rtl' ? 'flex-row-reverse' : 'flex-row'}`}>
          <Pressable
            onPress={handleRetry}
            style={tw`bg-green-500 px-6 py-3 rounded-lg`}
          >
            <Text style={tw`text-white font-bold`}>{t('tryAgain')}</Text>
          </Pressable>

          <Pressable
            onPress={handleBackHome}
            style={tw`bg-blue-500 px-6 py-3 rounded-lg`}
          >
            <Text style={tw`text-white font-bold`}>{t('backToHome')}</Text>
          </Pressable>
        </View>
      </View>

      {/* Mistakes Section */}
      {incorrectQuestions.length > 0 && (
        <View style={tw`mt-8`}>
          <Text style={tw`text-xl font-bold text-gray-800 mb-4 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
            {t('incorrectAnswers')}
          </Text>

          {incorrectQuestions.map((question, qIndex) => {
            const userSelectedIndex = userAnswers.find(
              (ans, i) => questions[i].id === question.id && ans !== null
            );

            return (
              <View key={question.id} style={tw`bg-white p-4 mb-4 rounded-lg shadow`}>
                {/* Question Text */}
                <Text style={tw`text-lg font-bold text-gray-700 mb-4 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
                  {question.text[language]}
                </Text>

                {/* Options */}
                {question.options.map((option, index) => {
                  const isCorrect = index === question.correctOptionIndex;
                  const isSelected = index === userAnswers[qIndex];

                  let backgroundColor = 'bg-gray-100';
                  if (isSelected && isCorrect) {
                    backgroundColor = 'bg-green-300'; // Correct and selected
                  } else if (isSelected && !isCorrect) {
                    backgroundColor = 'bg-red-300'; // Wrong answer selected
                  } else if (!isSelected && isCorrect) {
                    backgroundColor = 'bg-green-100'; // Correct answer not selected
                  }

                  return (
                    <View
                      key={index}
                      style={tw`${backgroundColor} p-3 rounded-md mb-2 ${direction === 'rtl' ? 'items-end' : 'items-start'}`}
                    >
                      <Text style={tw`text-gray-800 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>{option[language]}</Text>
                    </View>
                  );
                })}

                {/* Explanation */}
                {question.explanation && (
                  <View style={tw`bg-blue-100 p-3 rounded-md mt-4`}>
                    <Text style={tw`text-gray-700 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
                      {t('explanation')} {question.explanation[language]}
                    </Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>
      )}
    </ScrollView>
  </View>
  );
}
