import React from 'react';
import { View, ViewProps } from 'react-native';
import tw from 'twrnc';

export interface CardProps extends ViewProps {
  className?: string;
}

export const Card: React.FC<CardProps> = ({ className = '', children, ...props }) => {
  return (
    <View
      {...props}
      style={[
        tw`rounded-lg border bg-white shadow-sm p-4`, // default card style
        className ? tw`${className}` : null,           // optional extra classes
        props.style                                    // allow passing custom styles if needed
      ]}
    >
      {children}
    </View>
  );
};
