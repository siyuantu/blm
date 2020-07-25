import React, { useContext } from 'react';
import Markdown from 'react-markdown';
import I18nContext from '../contexts/I18nContext';
import usePages from '../hooks/usePages';

const AboutPage = () => {
  const { language } = useContext(I18nContext);
  const page = usePages().find(({ url }) => url === '/about');

  return (
    <Markdown>{language === 'en' ? page.content : page.content_zh}</Markdown>
  );
};

export default AboutPage;
