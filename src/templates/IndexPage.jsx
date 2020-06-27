import React, { useCallback, useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import I18nContext from '../contexts/I18nContext';
import SelectionContext from '../contexts/SelectionContext';
import LanguageToggle from '../components/LanguageToggle';
import RebuttalPane from '../components/RebuttalPane';
import TalkingPointBlock from '../components/TalkingPointBlock';

const IndexPageTemplate = ({ talkingPoints }) => {
  const { language } = useContext(I18nContext);
  const blockRefs = useRef({});

  const {
    selectedTalkingPointTitle,
    setSelectedTalkingPointTitle,
  } = useContext(SelectionContext);

  const handleBlockRef = useCallback((title, ref) => {
    if (ref) {
      blockRefs.current[title] = ref;
    } else {
      delete blockRefs.current[title];
    }
  }, []);

  const handleCloseButtonClick = useCallback(() => {
    if (selectedTalkingPointTitle) {
      blockRefs.current[selectedTalkingPointTitle].focus();
    }

    setSelectedTalkingPointTitle(undefined);
  }, [selectedTalkingPointTitle, setSelectedTalkingPointTitle]);

  const makeHandleKeyDown = useCallback(
    (title, i) => (evt) => {
      switch (evt.key) {
        case 'ArrowLeft':
          if (i > 0) {
            const newTitle = talkingPoints[i - 1].title;

            if (blockRefs.current[newTitle]) {
              blockRefs.current[newTitle].focus();
            }

            setSelectedTalkingPointTitle(newTitle);
          }
          break;

        case 'ArrowRight':
          if (i < talkingPoints.length - 1) {
            const newTitle = talkingPoints[i + 1].title;

            if (blockRefs.current[newTitle]) {
              blockRefs.current[newTitle].focus();
            }

            setSelectedTalkingPointTitle(newTitle);
          }
          break;

        case 'Enter':
          setSelectedTalkingPointTitle(title);
          break;

        case 'Escape':
          if (selectedTalkingPointTitle) {
            blockRefs.current[selectedTalkingPointTitle].focus();
          }

          setSelectedTalkingPointTitle(undefined);
          break;

        default:
      }
    },
    [setSelectedTalkingPointTitle, selectedTalkingPointTitle, talkingPoints]
  );

  /* eslint-disable camelcase */
  return (
    <>
      <LanguageToggle />
      <div>
        {talkingPoints.map(
          (
            { color, contrastColor, rebuttal, rebuttal_zh, title, title_zh },
            i
          ) => (
            <>
              <TalkingPointBlock
                backgroundColor={color}
                key={title}
                ref={(ref) => handleBlockRef(title, ref)}
                textColor={contrastColor}
                title={language === 'en' ? title : title_zh}
                onKeyDown={makeHandleKeyDown(title, i)}
                onClick={
                  selectedTalkingPointTitle !== title
                    ? () => {
                        setSelectedTalkingPointTitle(title);
                      }
                    : undefined
                }
              />
              {selectedTalkingPointTitle === title && (
                <RebuttalPane
                  key="rebuttal"
                  backgroundColor={color}
                  content={language === 'en' ? rebuttal : rebuttal_zh}
                  tabIndex={0}
                  textColor={contrastColor}
                  onCloseButtonClick={handleCloseButtonClick}
                />
              )}
            </>
          )
        )}
      </div>
    </>
  );
  /* eslint-enable camelcase */
};

IndexPageTemplate.propTypes = {
  talkingPoints: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      title_zh: PropTypes.string,
    })
  ),
};

IndexPageTemplate.defaultProps = {
  talkingPoints: [],
};

export default IndexPageTemplate;
