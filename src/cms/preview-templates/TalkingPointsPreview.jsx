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
    let askYourself;
    let askYourselfSectionTitle;
    let rebuttal;
    let title;
    let readMoreSectionTitle;

    if (language !== 'en') {
      rebuttal = data[`rebuttal_${language}`];
      title = data[`title_${language}`];
      askYourself = data[`ask_yourself_${language}`];

      askYourselfSectionTitle = '问问自己';
      readMoreSectionTitle = '了解更多信息';
    } else {
      ({ ask_yourself: askYourself, rebuttal, title } = data);
    }

    return (
      <>
        <LanguageToggle />
        <TalkingPointBlock
          backgroundColor={data.color}
          category={data.category}
          title={title}
          textColor="white"
        />
        <RebuttalPane
          askYourselfContent={askYourself}
          askYourselfSectionTitle={askYourselfSectionTitle}
          backgroundColor={data.color}
          backgroundImageAlignment={data.background_image_alignment}
          backgroundImageUrl={data.background_image_url}
          content={rebuttal}
          readMoreLinks={data.read_more}
          readMoreSectionTitle={readMoreSectionTitle}
          textColor="white"
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
