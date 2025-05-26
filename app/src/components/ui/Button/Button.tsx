import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {sva, VariantProps} from '@/lib/sva';
import {styles} from '@/styles/components/ui/Button';
import {ms} from '@/lib/ms';

const buttonVariants = sva('button', styles, {
  variants: {
    intent: {
      primary: 'button--primary',
      ghost: 'button--ghost',
    },
    size: {
      sm: 'button--sm',
      lg: 'button--lg',
    },
  },
  defaultVariants: {
    intent: 'primary',
    size: 'sm',
  },
});

type ButtonProps = {
  children: React.ReactNode;
  onPress: () => void;
  style?: object;
  variantIntent?: VariantProps<typeof buttonVariants>['intent'];
  variantSize?: VariantProps<typeof buttonVariants>['size'];
};

export const Button = ({
  children,
  onPress,
  style,
  variantIntent,
  variantSize,
}: ButtonProps) => {
  const {button, text} = buttonVariants({
    intent: variantIntent,
    size: variantSize,
  });
  return (
    <TouchableOpacity style={ms(button, style)} onPress={onPress}>
      <Text style={ms(text, style)} />
      {children}
    </TouchableOpacity>
  );
};
