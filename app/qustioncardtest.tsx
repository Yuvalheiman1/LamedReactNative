import { View } from 'react-native';
import { QuestionCard } from '../components/ui/QuestionCard'; // Adjust the import if needed
import tw from 'twrnc';

const images = {
  "paris": require('../assets/paris.jpg'),
  "london": require('../assets/london.jpg'),

};

export default function QuestionTestScreen() {
  return (
    <View style={tw`flex-1 items-center justify-center bg-gray-100 p-4`}>
      <QuestionCard
        question="Which city is shown?"
        options={['Paris', 'London', 'Berlin']}
        correctOptionIndex={0}
        imageSource={images["london"]}
      />
    </View>
  );
}
