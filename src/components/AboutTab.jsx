import React, { useContext } from 'react';
import Markdown from 'react-markdown';
import I18nContext from '../contexts/I18nContext';
import useTabs from '../hooks/useTabs';

const AboutTab = () => {
  const { language } = useContext(I18nContext);
  const tab = useTabs().find(({ url }) => url === '/about');

  return (
    <Markdown>{language === 'en' ? tab.content : tab.content_zh}</Markdown>
  );
};

export default AboutTab;
