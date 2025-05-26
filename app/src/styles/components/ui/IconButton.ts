import {StyleMap} from '@/lib/sva';
import {styles as buttonStyles} from '@/styles/components/ui/Button';
import {ImageStyle, ViewStyle} from 'react-native';

export const styles: StyleMap<{button: ViewStyle; icon: ImageStyle}> = {
  button: {
    ...buttonStyles.button,
  },
  'button--primary': {
    ...buttonStyles['button--primary'],
  },
  'button--ghost': {
    ...buttonStyles['button--ghost'],
  },
  'button--sm': {
    ...buttonStyles['button--sm'],
    icon: {
      width: 16,
      height: 16,
    },
  },
  'button--lg': {
    ...buttonStyles['button--lg'],
    icon: {
      width: 24,
      height: 24,
    },
  },
  'button--icon': {
    ...buttonStyles['button--icon'],
    icon: {
      width: 20,
      height: 20,
    },
  },
};
