import React from 'react';
import LanguageToggle from '../components/LanguageToggle';
import TalkingPointsGrid from '../components/TalkingPointsGrid';

const IndexPageTemplate = () => (
  <>
    <LanguageToggle />
    <div className="page-header">[header]</div>
    <TalkingPointsGrid />
    <div className="page-footer">[footer]</div>
  </>
);

export default IndexPageTemplate;
