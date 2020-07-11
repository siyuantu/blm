import React from 'react';
import LanguageToggle from '../components/LanguageToggle';
import TalkingPointsGrid from '../components/TalkingPointsGrid';

const IndexPageTemplate = () => (
  <>
    <div className="page__header">
      <a className="page__header-link" href="/#">
        About this project
      </a>
      <div className="page__header-spacer" />
      <LanguageToggle />
    </div>
    <TalkingPointsGrid />
  </>
);

export default IndexPageTemplate;
