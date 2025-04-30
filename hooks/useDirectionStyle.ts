// hooks/useDirectionStyle.ts
import { useLanguage } from '../context/LanguageContext';

export function useDirectionStyle() {
  const { direction } = useLanguage();
  const isRTL = direction === 'rtl';

  return {
    textAlign: isRTL ? 'right' : 'left',
    flexDirection: isRTL ? 'row-reverse' : 'row',
    marginStart: (value: number) => isRTL ? { marginRight: value } : { marginLeft: value },
    marginEnd: (value: number) => isRTL ? { marginLeft: value } : { marginRight: value },
    paddingStart: (value: number) => isRTL ? { paddingRight: value } : { paddingLeft: value },
    paddingEnd: (value: number) => isRTL ? { paddingLeft: value } : { paddingRight: value },
  };
}
