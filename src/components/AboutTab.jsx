import React, { useContext } from 'react';
import Markdown from 'react-markdown';
import I18nContext from '../contexts/I18nContext';
import useTabs from '../hooks/useTabs';

const AboutTab = () => {
  const { language } = useContext(I18nContext);
  const tab = useTabs().find(({ url }) => url === '/about');

  return (
    <div className="tab-content">
      <Markdown className="markdown">
        {language === 'en' ? tab.content : tab.content_zh}
      </Markdown>
    </div>
  );
};

export default AboutTab;
