import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import tw from 'twrnc';
import { Header } from '../components/ui/Header';
import { useSimulation } from '../context/SimulationContext';
import { useLanguage } from '../context/LanguageContext';
import { Ionicons } from '@expo/vector-icons';

export default function SimulationScreen() {
  const { questions, currentQuestionIndex, userAnswers, answerQuestion, goToNextQuestion, goToPreviousQuestion, finishSimulation } = useSimulation();
  const { t } = useLanguage(); 
  const router = useRouter();

  const [timer, setTimer] = useState(1800); // 10 minutes simulation (600 seconds)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const currentQuestion = questions[currentQuestionIndex];

  const handleSelectOption = (index: number) => {
    answerQuestion(index);
  };

  const handleFinish = () => {
    finishSimulation();
    router.push('/'); // (Create Results page soon!)
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (!currentQuestion) {
    return (
      <View style={tw`flex-1 items-center justify-center bg-gray-100`}>
        <Text style={tw`text-lg text-gray-600`}>No simulation questions loaded!</Text>
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-gray-100`}>
      <Header title={t('mainTitle')} showBackButton={true} />
      <View style={tw`flex-row justify-between items-center px-4 py-2 bg-blue-500`}>
        <Text style={tw`text-white font-bold text-xl`}>  {t('question')} {currentQuestionIndex + 1} {t('of')} {questions.length}
        </Text>
        <Text style={tw`text-white text-lg`}>{formatTime(timer)}</Text>
      </View>

      <ScrollView contentContainerStyle={tw`p-6`}>
        <View style={tw`bg-white p-6 rounded-lg mb-6 shadow`}>
          <Text style={tw`text-xl font-bold text-gray-800 mb-4`}>
            {currentQuestion.text}
          </Text>

          {currentQuestion.options.map((option, index) => (
            <Pressable
              key={index}
              onPress={() => handleSelectOption(index)}
              style={tw`${userAnswers[currentQuestionIndex] === index ? 'bg-blue-500' : 'bg-gray-100'} p-4 rounded-lg mb-4`}
            >
              <Text style={tw`${userAnswers[currentQuestionIndex] === index ? 'text-white' : 'text-gray-700'} text-lg`}>
                {option}
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
              onPress={handleFinish}
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
