import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Keyboard, Platform } from 'react-native';
import tw from 'twrnc';
import { useLanguage } from '../context/LanguageContext'; // adjust path

interface QuestionNavigatorInputProps {
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  questions: any[];
}


const QuestionNavigatorInput: React.FC<QuestionNavigatorInputProps> = ({
  currentIndex,
  setCurrentIndex,
  questions,
}) => {
  const totalQuestions = questions.length;
  const currentQuestionDisplay = (currentIndex + 1).toString();

  const [inputValue, setInputValue] = useState(currentQuestionDisplay);
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const { t, language, direction } = useLanguage();

  useEffect(() => {
    if (!isFocused) {
      setInputValue((currentIndex + 1).toString());
      setIsValid(true);
    }
  }, [currentIndex, isFocused]);

  const handleInputChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, '');
    if (numericText.length > String(totalQuestions).length + 1) {
        return;
    }
    setInputValue(numericText);
    setIsValid(true);
    
  };

  const validateAndNavigate = () => {
    const num = parseInt(inputValue, 10);

    if (
      !isNaN(num) &&
      num >= 1 &&
      num <= totalQuestions
    ) {
      setIsValid(true);
      if (num - 1 !== currentIndex) {
         setCurrentIndex(num - 1);
         
      }
      setInputValue(num.toString());
    } else {
      setIsValid(false);
      setTimeout(() => {
        setInputValue((currentIndex + 1).toString());
        setIsValid(true);
      }, 800);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    validateAndNavigate();
  };

  const handleFocus = () => {
    setIsFocused(true);
    setIsValid(true);
  };

  const isDisabled = totalQuestions === 0;

  return (
    <View style={tw`flex-row justify-center items-center mb-4 ${direction === 'rtl' ? 'flex-row-reverse' : 'flex-row'}`}>
      <TextInput
        value={inputValue}
        onChangeText={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onSubmitEditing={validateAndNavigate}
        keyboardType="numeric"
        style={[
          tw`bg-blue-50 rounded-xl px-3 py-1 text-center text-base font-semibold text-blue-700 w-16 h-10 border shadow-sm`,
          tw`${!isValid ? 'border-red-500' : 'border-blue-200'}`,
          tw`${isDisabled ? 'bg-gray-200 text-gray-500' : ''}`,
          { textAlign: 'center' },
        ]}
        returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
        maxLength={String(totalQuestions).length || 1}
        editable={!isDisabled}
        selectTextOnFocus={true}
      />
      <Text style={tw`text-lg font-semibold ${isDisabled ? 'text-gray-400' : 'text-gray-700'} mx-2`}>
        {t('of')} {totalQuestions}
      </Text>
    </View>
  );
};

export default QuestionNavigatorInput;