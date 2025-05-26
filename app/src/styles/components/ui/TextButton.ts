import {StyleMap} from '@/lib/sva';
import {colors} from '@/styles/tokens/colors';
import {styles as buttonStyles} from '@/styles/components/ui/Button';
import {TextStyle, ViewStyle} from 'react-native';

export const styles: StyleMap<{button: ViewStyle; text: TextStyle}> = {
  button: {
    ...buttonStyles.button,
  },
  'button--primary': {
    ...buttonStyles['button--primary'],
    text: {
      color: '#ffffff',
    },
  },
  'button--ghost': {
    ...buttonStyles['button--ghost'],
    text: {
      color: colors.primary,
    },
  },
  'button--sm': {
    ...buttonStyles['button--sm'],
    text: {
      fontSize: 12,
    },
  },
  'button--lg': {
    ...buttonStyles['button--lg'],
    text: {
      fontSize: 18,
    },
  },
};
