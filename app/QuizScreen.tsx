import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import tw from 'twrnc';
import { QuestionCard } from '../components/ui/QuestionCard'; // Adjust the import if needed

const images = {
  "paris": require('../assets/paris.jpg'),
  "london": require('../assets/london.jpg'),
  //"berlin": require('../assets/berlin.jpg'),
};

const questions = [
  {
    question: 'Which city is shown?',
    options: ['Paris', 'London', 'Berlin'],
    correctOptionIndex: 0,
    imageSource: images['paris'],
  },
  {
    question: 'Capital of United Kingdom?',
    options: ['Berlin', 'London', 'Madrid'],
    correctOptionIndex: 1,
    imageSource: images['london'],
  },
  {
    question: 'Where is the Brandenburg Gate?',
    options: ['Berlin', 'Paris', 'Rome'],
    correctOptionIndex: 0,
    imageSource: images['london'],
  },
];

export default function QuizScreen() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (selectedIndex: number) => {
    if (!answered) {
      setAnswered(true);
      if (selectedIndex === currentQuestion.correctOptionIndex) {
        setScore(prev => prev + 1);
      }
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
      setAnswered(false);
    } else {
      // TODO: navigate to SummaryScreen or show score
      alert(`Quiz finished! Your score: ${score}/${questions.length}`);
    }
  };

  return (
    <View style={tw`flex-1 items-center justify-center bg-gray-100 p-4`}>
      <QuestionCard
        question={currentQuestion.question}
        options={currentQuestion.options}
        correctOptionIndex={currentQuestion.correctOptionIndex}
        imageSource={currentQuestion.imageSource}
        // This part lets us detect answer selection
        // We'll add a small extra prop to QuestionCard for this (next step)
      />

      {answered && (
        <Button
          title="Next"
          onPress={handleNext}
          color="#4F46E5" // Tailwind indigo-600
        />
      )}
    </View>
  );
}
