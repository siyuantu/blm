import React from 'react';
import { I18nProvider } from '../contexts/I18nContext';
import { SelectionProvider } from '../contexts/SelectionContext';
import useTalkingPoints from '../hooks/useTalkingPoints';
import IndexPageTemplate from '../templates/IndexPage';

const IndexPage = () => {
  const talkingPoints = useTalkingPoints();

  return (
    <I18nProvider>
      <SelectionProvider>
        <IndexPageTemplate talkingPoints={talkingPoints} />
      </SelectionProvider>
    </I18nProvider>
  );
};

export default IndexPage;
