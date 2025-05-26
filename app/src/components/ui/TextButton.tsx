import React from 'react';
import {TouchableOpacity, Text, ViewStyle, TextStyle} from 'react-native';
import {sva, VariantProps} from '@/lib/sva';
import {ms} from '@/lib/ms';
import {styles} from '@/styles/components/ui/TextButton';

export const textButtonVariants = sva(styles.button, {
  variants: {
    intent: {
      primary: styles['button--primary'],
      ghost: styles['button--ghost'],
    },
    size: {
      sm: styles['button--sm'],
      lg: styles['button--lg'],
    },
  },
  defaultVariants: {
    intent: 'primary',
    size: 'sm',
  },
});

type TextButtonProps = {
  children?: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  variantIntent?: VariantProps<typeof textButtonVariants>['intent'];
  variantSize?: VariantProps<typeof textButtonVariants>['size'];
};

export const TextButton = ({
  children,
  onPress,
  style,
  textStyle,
  variantIntent,
  variantSize,
}: TextButtonProps) => {
  const {button, text} = textButtonVariants({
    intent: variantIntent,
    size: variantSize,
  });

  return (
    <TouchableOpacity style={ms(button, style)} onPress={onPress}>
      <Text style={ms(text, textStyle)}>{children}</Text>
    </TouchableOpacity>
  );
};
