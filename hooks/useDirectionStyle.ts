import { useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { StyleSheet } from 'react-native';

type StyleInput = {
  start?: number | string;
  end?: number | string;
  marginStart?: number;
  marginEnd?: number;
  paddingStart?: number;
  paddingEnd?: number;
  borderStartWidth?: number;
  borderEndWidth?: number;
  flexDirection?: 'row' | 'row-reverse';
};

export const useDirectionStyle = (styleInput: StyleInput = {}) => {
  const { direction } = useLanguage();
  
  return useMemo(() => {
    const {
      start,
      end,
      marginStart,
      marginEnd,
      paddingStart,
      paddingEnd,
      borderStartWidth,
      borderEndWidth,
      flexDirection = 'row',
    } = styleInput;

    const isRTL = direction === 'rtl';

    return StyleSheet.create({
      style: {
        ...(start !== undefined && { 
          [isRTL ? 'right' : 'left']: start 
        }),
        ...(end !== undefined && { 
          [isRTL ? 'left' : 'right']: end 
        }),
        ...(marginStart !== undefined && {
          [isRTL ? 'marginRight' : 'marginLeft']: marginStart
        }),
        ...(marginEnd !== undefined && {
          [isRTL ? 'marginLeft' : 'marginRight']: marginEnd
        }),
        ...(paddingStart !== undefined && {
          [isRTL ? 'paddingRight' : 'paddingLeft']: paddingStart
        }),
        ...(paddingEnd !== undefined && {
          [isRTL ? 'paddingLeft' : 'paddingRight']: paddingEnd
        }),
        ...(borderStartWidth !== undefined && {
          [isRTL ? 'borderRightWidth' : 'borderLeftWidth']: borderStartWidth
        }),
        ...(borderEndWidth !== undefined && {
          [isRTL ? 'borderLeftWidth' : 'borderRightWidth']: borderEndWidth
        }),
        flexDirection: isRTL ? 
          (flexDirection === 'row' ? 'row-reverse' : 'row') : 
          flexDirection,
      }
    }).style;
  }, [direction, styleInput]);
};
