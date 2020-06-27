import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import I18nContext, { I18nProvider } from '../../contexts/I18nContext';
import LanguageToggle from '../../components/LanguageToggle';
import RebuttalPane from '../../components/RebuttalPane';
import TalkingPointBlock from '../../components/TalkingPointBlock';

const TalkingPointPreview = ({ entry }) => {
  const { language } = useContext(I18nContext);
  const data = entry.getIn(['data']).toJS();

  if (data) {
    let rebuttal;
    let title;
    if (language !== 'en') {
      rebuttal = data[`rebuttal_${language}`];
      title = data[`title_${language}`];
    } else {
      ({ rebuttal, title } = data);
    }

    return (
      <>
        <LanguageToggle />
        <TalkingPointBlock
          backgroundColor="rgb(174, 118, 89)"
          title={title}
          textColor="black"
        />
        <RebuttalPane
          backgroundColor="rgb(174, 118, 89)"
          content={rebuttal}
          textColor="black"
        />
      </>
    );
  }

  return <div>Loading...</div>;
};

TalkingPointPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }).isRequired,
};

export default (props) => (
  <I18nProvider>
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <TalkingPointPreview {...props} />
  </I18nProvider>
);
