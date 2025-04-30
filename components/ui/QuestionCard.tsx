import React, { useState } from 'react';
import { View, Text, Pressable, Image, ImageSourcePropType } from 'react-native';
import tw from 'twrnc';
import { Card } from './card'; // Assuming './card' exists and exports a Card component

// Interface defines the props the component expects
interface QuestionCardProps {
  id: number; // Unique identifier for the question
  question: string;
  options: string[];
  correctOptionIndex: number;
  imageSource?: ImageSourcePropType; // Use specific type instead of any
  selectedOptionIndex: number | null; // The selected index provided by the parent
  onSelectOption: (index: number) => void; // Callback function to notify parent of selection
  disabled?: boolean; // Optional: Add a prop to disable selection after an answer
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  id,
  question,
  options,
  correctOptionIndex,
  imageSource,
  selectedOptionIndex, // Directly use the prop for selected index
  onSelectOption,      // Directly use the prop callback
  disabled = false,    // Default disabled to false
}) => {
  // State only for handling image loading errors
  const [imageError, setImageError] = useState(false);

  // Function to determine background style based on selection and correctness
  // Uses the selectedOptionIndex prop directly
  const getOptionStyle = (index: number): string => {
    // If nothing is selected yet, return default style
    if (selectedOptionIndex === null) {
      return 'bg-white border border-gray-300';
    }

    // If the correct option is selected OR this is the correct option
    if (index === correctOptionIndex) {
      return 'bg-green-500 border border-green-600'; // Correct answer is always green
    }

    // If this option was selected but is incorrect
    if (index === selectedOptionIndex) {
      return 'bg-red-500 border border-red-600'; // Incorrectly selected answer is red
    }

    // If an option has been selected, but this wasn't the selected or correct one
    // Make it look less prominent / disabled visually
    return 'bg-gray-200 border border-gray-300 opacity-70';
  };

  // Function to determine text color based on selection and correctness
  // Uses the selectedOptionIndex prop directly
  const getTextColor = (index: number): string => {
    // If an option has been selected
    if (selectedOptionIndex !== null) {
      // Make text white for the selected/correct answers (which have colored backgrounds)
      if (index === correctOptionIndex || index === selectedOptionIndex) {
        return 'text-white';
      }
      // Make text darker gray for unselected/incorrect options after selection
      return 'text-gray-600';
    }
    // Default text color before any selection
    return 'text-gray-800';
  };

  return (
    <Card>
      <Text style={tw`text-lg font-bold mb-4 text-center text-gray-900`}>{question}</Text>

      {/* Render Image or Placeholder if imageSource is provided */}
      {imageSource && (
          <View style={tw`w-full mb-4`}>
              {imageError ? (
                  // Placeholder if image fails to load
                  <View style={tw`h-48 rounded-lg bg-gray-200 items-center justify-center`}>
                      <Text style={tw`text-gray-500`}>Image unavailable</Text>
                  </View>
              ) : (
                  // Actual Image
                  <Image
                      source={imageSource}
                      style={tw`h-48 w-full rounded-lg`}
                      resizeMode="contain"
                      onError={() => setImageError(true)}
                  />
              )}
          </View>
      )}


      {/* Map over options to render Pressable buttons */}
      {options.map((option, index) => (
        <Pressable
          key={index}
          // Call the onSelectOption callback passed from the parent
          // Only allow selection if nothing is selected yet OR if not disabled
          onPress={() => !disabled && selectedOptionIndex === null && onSelectOption(index)}
          // Apply dynamic styles based on selection state
          style={tw`${getOptionStyle(index)} p-4 rounded-lg mb-3`} // Added slight margin bottom
          // Disable button interaction visually and functionally after selection or if disabled prop is true
          disabled={disabled || selectedOptionIndex !== null}
        >
          <Text style={tw`${getTextColor(index)} text-base font-medium`}> {/* Adjusted text size/weight */}
            {option}
          </Text>
        </Pressable>
      ))}
    </Card>
  );
};