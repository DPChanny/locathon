import React from 'react';
import {TouchableOpacity, ViewStyle} from 'react-native';
import {sva, VariantProps} from '@/lib/sva';
import {styles} from '@/styles/components/ui/Button';
import {ms} from '@/lib/ms';

export const buttonVariants = sva(styles.button, {
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

type ButtonProps = {
  children?: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
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
  const {button} = buttonVariants({
    intent: variantIntent,
    size: variantSize,
  });
  return (
    <TouchableOpacity style={ms(button, style)} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};
