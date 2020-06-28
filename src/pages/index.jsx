import React from 'react';
import { I18nProvider } from '../contexts/I18nContext';
import { SelectionProvider } from '../contexts/SelectionContext';
import IndexPageTemplate from '../templates/IndexPage';

const IndexPage = () => (
  <I18nProvider>
    <SelectionProvider>
      <div className="page-wrapper">
        <div className="page">
          <IndexPageTemplate />
        </div>
      </div>
    </SelectionProvider>
  </I18nProvider>
);

export default IndexPage;
