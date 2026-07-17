import { useCallback } from 'react';
import { useSect } from '../contexts/SectContext';

export function useTranslate() {
  const { activeSectId } = useSect();
  const isEnglish = activeSectId === 'english';
  
  const t = useCallback((vi: string, en: string) => {
    return activeSectId === 'english' ? en : vi;
  }, [activeSectId]);
  
  return { t, isEnglish };
}
