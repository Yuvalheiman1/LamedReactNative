import React from 'react';
import { Pressable, Text, ActivityIndicator } from 'react-native';
import tw from 'twrnc'; // <-- correct import for twrnc

export type ButtonVariant = 'default' | 'outline' | 'ghost' | 'link' | 'destructive' | 'secondary';
export type ButtonSize = 'sm' | 'default' | 'lg' | 'icon';

export interface ButtonProps {
  title?: string;
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  disabled?: boolean;
  onPress?: () => void;
}

export const Button = ({
  title,
  children,
  variant = 'default',
  size = 'default',
  isLoading = false,
  disabled = false,
  onPress,
}: ButtonProps) => {
  const baseStyle = 'flex-row items-center justify-center rounded-md';

  const variantStyles: Record<ButtonVariant, string> = {
    default: 'bg-blue-500',
    outline: 'border border-gray-300',
    ghost: 'bg-transparent',
    link: 'bg-transparent',
    destructive: 'bg-red-600',
    secondary: 'bg-gray-100',
  };

  const textVariantStyles: Record<ButtonVariant, string> = {
    default: 'text-white',
    outline: 'text-gray-800',
    ghost: 'text-gray-800',
    link: 'text-blue-500 underline',
    destructive: 'text-white',
    secondary: 'text-gray-800',
  };

  const sizeStyles: Record<ButtonSize, string> = {
    sm: 'h-9 px-3',
    default: 'h-10 px-4 py-2',
    lg: 'h-12 px-6',
    icon: 'h-10 w-10',
  };

  const disabledStyle = disabled ? 'opacity-50' : '';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || isLoading}
      style={tw`${baseStyle} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyle}`}
    >
      {isLoading ? (
        <ActivityIndicator color="white" />
      ) : children ? (
        children
      ) : (
        <Text style={tw`${textVariantStyles[variant]} text-center font-medium`}>
          {title}
        </Text>
      )}
    </Pressable>
  );
};
