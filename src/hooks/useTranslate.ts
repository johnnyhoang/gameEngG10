import { useSect } from '../contexts/SectContext';

export function useTranslate() {
  const { activeSectId } = useSect();
  const isEnglish = activeSectId === 'english';
  
  const t = (vi: string, en: string) => {
    return isEnglish ? en : vi;
  };
  
  return { t, isEnglish };
}
