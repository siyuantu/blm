import React, { useContext } from 'react';
import usePages from '../hooks/usePages';
import I18nContext from '../contexts/I18nContext';
import NavigationItem from './NavigationItem';
import LanguageToggle from './LanguageToggle';
import './all.sass';

const Navigation = () => {
  const pages = usePages();
  const { language } = useContext(I18nContext);

  return (
    /* eslint-disable camelcase */
    <div className="navigation">
      {pages.map(({ title, title_zh, url }) => (
        <NavigationItem
          className="navigation__item"
          key={url}
          title={language === 'en' ? title : title_zh}
          url={url}
        />
      ))}
      <div className="navigation__spacer" />
      <LanguageToggle />
    </div>
    /* eslint-enable camelcase */
  );
};

export default Navigation;
