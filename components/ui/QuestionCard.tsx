import React, { useState } from 'react';
import { View, Text, Pressable, Image, ImageSourcePropType } from 'react-native';
import tw from 'twrnc';
import { Card } from './card';

interface QuestionCardProps {
  question: string;
  options: string[];
  correctOptionIndex: number;
  imageSource?: ImageSourcePropType;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  options,
  correctOptionIndex,
  imageSource,
}) => {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [imageError, setImageError] = useState(false); // <-- new state

  const handleOptionPress = (index: number) => {
    if (selectedOptionIndex === null) {
      setSelectedOptionIndex(index);
    }
  };

  const getOptionStyle = (index: number) => {
    if (selectedOptionIndex === null) {
      return 'bg-white border border-gray-300';
    }

    if (index === correctOptionIndex) {
      return 'bg-green-500';
    }

    if (index === selectedOptionIndex) {
      return 'bg-red-500';
    }

    return 'bg-white border border-gray-300';
  };

  return (
    <Card>
      <Text style={tw`text-lg font-bold mb-4 text-center`}>{question}</Text>
      {/* Smart Image Handling */}
      {imageSource && !imageError ? (
      <View style={tw`w-full`}>
        <Image
          source={imageSource}
          style={tw`h-48 rounded-lg mb-4`}
          resizeMode="cover"
          onError={() => setImageError(true)}
        />
      </View>
    ) : imageSource && imageError ? (
      <View style={tw`w-full h-48 rounded-lg mb-4 bg-gray-300 items-center justify-center`}>
        <Text style={tw`text-gray-600`}>No Image Available</Text>
      </View>
    ) : null}


      {options.map((option, index) => (
        <Pressable
          key={index}
          onPress={() => handleOptionPress(index)}
          style={tw`${getOptionStyle(index)} p-3 rounded-md mb-2`}
        >
          <Text style={tw`text-center text-gray-800 font-medium`}>
            {option}
          </Text>
        </Pressable>
      ))}
    </Card>
  );
};
