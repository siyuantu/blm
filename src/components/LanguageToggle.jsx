import React, { useCallback, useContext } from 'react';
import I18nContext from '../contexts/I18nContext';
import './all.sass';

const LanguageToggle = () => {
  const { language, setLanguage } = useContext(I18nContext);

  const setEnglish = useCallback(() => {
    setLanguage('en');
  }, [setLanguage]);

  const setMandarin = useCallback(() => {
    setLanguage('zh');
  }, [setLanguage]);

  return (
    <div className="buttons is-large">
      <button
        className={`button is-text ${
          language === 'en' ? 'is-info is-selected' : ''
        }`}
        type="button"
        onClick={language !== 'en' ? setEnglish : undefined}
      >
        English
      </button>
      |
      <button
        className={`button is-text ${
          language === 'zh' ? 'is-info is-selected' : ''
        }`}
        type="button"
        onClick={language !== 'zh' ? setMandarin : undefined}
      >
        中文
      </button>
    </div>
  );
};

export default LanguageToggle;
