import React from 'react';
import {
  TouchableOpacity,
  Image,
  ImageStyle,
  ViewStyle,
  ImageSourcePropType,
} from 'react-native';
import {sva, VariantProps} from '@/lib/sva';
import {styles} from '@/styles/components/ui/IconButton';
import {ms} from '@/lib/ms';

export const iconButtonVariants = sva(styles.button, {
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

type IconButtonProps = {
  icon: ImageSourcePropType;
  onPress?: () => void;
  style?: ViewStyle;
  iconStyle?: ImageStyle;
  variantIntent?: VariantProps<typeof iconButtonVariants>['intent'];
  variantSize?: VariantProps<typeof iconButtonVariants>['size'];
};

export const IconButton = ({
  icon,
  onPress,
  style,
  iconStyle,
  variantIntent,
  variantSize,
}: IconButtonProps) => {
  const {button, icon: iconVariant} = iconButtonVariants({
    intent: variantIntent,
    size: variantSize,
  });

  return (
    <TouchableOpacity style={ms(button, style)} onPress={onPress}>
      <Image
        source={icon}
        style={ms(iconVariant, iconStyle)}
        onError={error =>
          console.error('Icon failed to load:', error.nativeEvent)
        }
      />
    </TouchableOpacity>
  );
};
