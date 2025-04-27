import { View, Text } from 'react-native';
import { Card } from '../components/ui/card';
import tw from 'twrnc';

export default function CardTestScreen() {
  return (
    <View style={tw`flex-1 items-center justify-center bg-gray-100 p-4`}>
      <Card>
        <Text style={tw`text-lg font-bold text-gray-800 mb-2`}>Basic Card</Text>
        <Text style={tw`text-gray-600`}>This is a simple card using the Card component.</Text>
      </Card>

      <View style={tw`h-6`} />

      <Card className="bg-blue-100 border-blue-300">
        <Text style={tw`text-lg font-bold text-blue-800 mb-2`}>Custom Colored Card</Text>
        <Text style={tw`text-blue-600`}>This card uses extra classes passed via `className` prop.</Text>
      </Card>
    </View>
  );
}
