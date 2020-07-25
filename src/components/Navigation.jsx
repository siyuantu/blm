import React, { useContext } from 'react';
import useTabs from '../hooks/useTabs';
import I18nContext from '../contexts/I18nContext';
import NavigationItem from './NavigationItem';
import LanguageToggle from './LanguageToggle';
import './all.sass';

const Navigation = () => {
  const tabs = useTabs();
  const { language } = useContext(I18nContext);

  return (
    /* eslint-disable camelcase */
    <div className="navigation">
      {tabs.map(({ title, title_zh, url }) => (
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
