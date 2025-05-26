import {StyleMap} from '@/lib/sva';
import {colors} from '@/styles/tokens/colors';
import {spacing} from '@/styles/tokens/spacing';
import {ViewStyle} from 'react-native';

export const styles: StyleMap<{button: ViewStyle}> = {
  button: {
    button: {borderRadius: 8, alignItems: 'center', alignSelf: 'center'},
  },
  'button--primary': {
    button: {backgroundColor: colors.primary},
  },
  'button--ghost': {
    button: {backgroundColor: 'transparent', borderWidth: 1},
  },
  'button--sm': {
    button: {paddingVertical: spacing.sm, paddingHorizontal: spacing.sm * 2},
  },
  'button--lg': {
    button: {paddingVertical: spacing.lg, paddingHorizontal: spacing.lg * 2},
  },
};
