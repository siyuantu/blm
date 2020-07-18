import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import PropTypes from 'prop-types';

import I18nContext from '../contexts/I18nContext';
import SelectionContext from '../contexts/SelectionContext';
import useTalkingPoints from '../hooks/useTalkingPoints';
import RebuttalPane from './RebuttalPane';
import TalkingPointBlock from './TalkingPointBlock';
import './all.sass';

const TalkingPointsGrid = ({ maxBlockSizePx, minBlockSizePx }) => {
  const talkingPoints = useTalkingPoints();
  const { language } = useContext(I18nContext);
  const blockRefs = useRef({});

  const {
    getHashForTitle,
    selectedTalkingPointTitle,
    setSelectedTalkingPointTitle,
  } = useContext(SelectionContext);

  const resizeObserver = useRef(null);
  const rebuttalPaneRef = useRef(null);
  const prevSelectedTalkingPointTitle = useRef(null);

  const [containerRef, setContainerRef] = useState(null);
  const [availableWidthPx, setAvailableWidthPx] = useState(0);
  const [rebuttalPaneHeightPx, setRebuttalPaneHeightPx] = useState(0);
  const [rebuttalPaneIsVisible, setRebuttalPaneVisible] = useState(false);
  const [rebuttalPaneOpacity, setRebuttalPaneOpacity] = useState(1);

  const [
    rebuttalPaneHeightIsAnimating,
    setRebuttalPaneHeightIsAnimating,
  ] = useState(false);

  const minBlockCountPerRow = Math.ceil(availableWidthPx / maxBlockSizePx);

  let blockCountPerRow = minBlockCountPerRow;
  let blockSizePx = Math.floor(availableWidthPx / blockCountPerRow);

  if (blockSizePx < minBlockSizePx) {
    blockCountPerRow = Math.floor(availableWidthPx / minBlockSizePx);
    blockSizePx = Math.floor(availableWidthPx / blockCountPerRow);
  }

  const handleBlockRef = useCallback((title, ref) => {
    if (ref) {
      blockRefs.current[title] = ref;
    } else {
      delete blockRefs.current[title];
    }
  }, []);

  const handleCloseButtonClick = useCallback(() => {
    if (selectedTalkingPointTitle) {
      blockRefs.current[selectedTalkingPointTitle].focus({
        preventScroll: true,
      });
    }

    setSelectedTalkingPointTitle(undefined);
  }, [selectedTalkingPointTitle, setSelectedTalkingPointTitle]);

  const selectTalkingPointAtIndex = useCallback(
    (index) => {
      if (index < 0 || index >= talkingPoints.length) {
        return;
      }

      const newTitle = talkingPoints[index].title;

      if (blockRefs.current[newTitle]) {
        blockRefs.current[newTitle].focus({ preventScroll: true });
      }

      setSelectedTalkingPointTitle(newTitle);
    },
    [setSelectedTalkingPointTitle, talkingPoints]
  );

  const makeHandleKeyDown = useCallback(
    (title, i) => (evt) => {
      switch (evt.key) {
        case 'ArrowUp':
          selectTalkingPointAtIndex(i - blockCountPerRow);
          break;

        case 'ArrowDown':
          selectTalkingPointAtIndex(i + blockCountPerRow);
          break;

        case 'ArrowLeft':
          selectTalkingPointAtIndex(i - 1);
          break;

        case 'ArrowRight':
          selectTalkingPointAtIndex(i + 1);
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
    [
      blockCountPerRow,
      selectTalkingPointAtIndex,
      selectedTalkingPointTitle,
      setSelectedTalkingPointTitle,
    ]
  );

  const totalHeightPx =
    (Math.ceil(talkingPoints.length / blockCountPerRow) + 1) * blockSizePx;

  let displayedTitle = selectedTalkingPointTitle;
  if (!selectedTalkingPointTitle && rebuttalPaneIsVisible) {
    displayedTitle = prevSelectedTalkingPointTitle.current;
  }

  const selectedTalkingPointIndex =
    displayedTitle &&
    talkingPoints.findIndex(({ title }) => title === displayedTitle);

  const selectedTalkingPoint =
    typeof selectedTalkingPointIndex === 'number' &&
    talkingPoints[selectedTalkingPointIndex];

  const selectedTalkingPointRowIndex = Math.floor(
    selectedTalkingPointIndex / blockCountPerRow
  );

  const updateRebuttalPaneHeight = useCallback(() => {
    if (!rebuttalPaneRef.current) {
      return;
    }

    const rect = rebuttalPaneRef.current.getBoundingClientRect();
    setRebuttalPaneHeightPx(rect.height);
  }, []);

  const handleResize = useCallback(
    ([entry]) => {
      setAvailableWidthPx(entry.contentRect.width);
      updateRebuttalPaneHeight();
    },
    [updateRebuttalPaneHeight]
  );

  const handleRebuttalPaneRef = useCallback(
    (ref) => {
      rebuttalPaneRef.current = ref;
      updateRebuttalPaneHeight();
    },
    [updateRebuttalPaneHeight]
  );

  const handleRebuttalPaneTransitionEnd = useCallback(
    (evt) => {
      if (parseInt(evt.target.style.height, 10) === 0) {
        setRebuttalPaneVisible(false);
      } else if (blockRefs.current[selectedTalkingPointTitle]) {
        blockRefs.current[selectedTalkingPointTitle].scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }

      setRebuttalPaneHeightIsAnimating(false);
    },
    [selectedTalkingPointTitle]
  );

  useEffect(() => {
    if (selectedTalkingPointTitle) {
      prevSelectedTalkingPointTitle.current = selectedTalkingPointTitle;
    }
  });

  useEffect(() => {
    if (containerRef) {
      resizeObserver.current = new ResizeObserver(handleResize);
      resizeObserver.current.observe(containerRef);
    }

    return () => {
      if (resizeObserver.current) {
        resizeObserver.current.disconnect();
      }
    };
  }, [containerRef, handleResize]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    setRebuttalPaneHeightIsAnimating(true);

    if (!selectedTalkingPointTitle) {
      updateRebuttalPaneHeight();

      window.requestAnimationFrame(() => {
        setRebuttalPaneHeightPx(0);
        setRebuttalPaneOpacity(0);
      });
    } else {
      blockRefs.current[selectedTalkingPointTitle].focus({
        preventScroll: true,
      });

      setRebuttalPaneVisible(true);
      setRebuttalPaneOpacity(1);

      window.requestAnimationFrame(() => {
        updateRebuttalPaneHeight();
      });
    }
  }, [selectedTalkingPointTitle, updateRebuttalPaneHeight]);

  /* eslint-disable camelcase */
  return (
    <div className="talking-points-grid" ref={setContainerRef}>
      <ul
        className="talking-points-grid__talking-points-wrapper"
        style={{ height: totalHeightPx }}
      >
        {talkingPoints.map(({ category, color, title, title_zh }, i) => {
          const rowIndex = Math.floor(i / blockCountPerRow);
          const columnIndex = i % blockCountPerRow;
          const isSelected = displayedTitle === title;

          let categoryDisplayName;
          if (category) {
            categoryDisplayName =
              language === 'en' ? category.title : category.title_zh;
          }

          const xOffset = columnIndex * blockSizePx;
          let yOffset = rowIndex * blockSizePx;

          if (rowIndex > selectedTalkingPointRowIndex) {
            yOffset += rebuttalPaneHeightPx;
          }

          return (
            <TalkingPointBlock
              aria-haspopup
              aria-expanded={isSelected}
              backgroundColor={color}
              category={categoryDisplayName}
              component="li"
              id={getHashForTitle(title)}
              isSelected={isSelected}
              key={title}
              ref={(ref) => handleBlockRef(title, ref)}
              style={{
                width: blockSizePx,
                height: blockSizePx,
                transform: `translate3d(${xOffset}px, ${yOffset}px, 0)`,
              }}
              textColor="white"
              title={language === 'en' ? title : title_zh}
              onKeyDown={makeHandleKeyDown(title, i)}
              onClick={
                !isSelected
                  ? () => {
                      setSelectedTalkingPointTitle(title);
                    }
                  : undefined
              }
            />
          );
        })}
      </ul>
      {rebuttalPaneIsVisible && (
        <div
          className="talking-points-grid__rebuttal-pane-wrapper"
          style={{
            position: 'absolute',
            transform: `translate3d(0, ${
              (selectedTalkingPointRowIndex + 1) * blockSizePx
            }px, 0)`,
            overflow: 'hidden',
            height: rebuttalPaneHeightIsAnimating
              ? rebuttalPaneHeightPx
              : 'auto',
            opacity: rebuttalPaneOpacity,
          }}
          onTransitionEnd={handleRebuttalPaneTransitionEnd}
        >
          <RebuttalPane
            key="rebuttal"
            askYourselfContent={
              language === 'en'
                ? selectedTalkingPoint.ask_yourself
                : selectedTalkingPoint.ask_yourself_zh
            }
            askYourselfSectionTitle={language !== 'en' ? '问问自己' : undefined}
            backgroundColor={selectedTalkingPoint.color}
            backgroundImageAlignment={
              selectedTalkingPoint.background_image_alignment
            }
            backgroundImageUrl={selectedTalkingPoint.background_image_url}
            content={
              language === 'en'
                ? selectedTalkingPoint.rebuttal
                : selectedTalkingPoint.rebuttal_zh
            }
            isSingleColumnLayout={availableWidthPx < 840}
            readMoreLinks={selectedTalkingPoint.read_more}
            readMoreSectionTitle={language !== 'en' ? '了解更多' : undefined}
            ref={handleRebuttalPaneRef}
            tabIndex={0}
            textColor={selectedTalkingPoint.contrastColor}
            onCloseButtonClick={handleCloseButtonClick}
          />
        </div>
      )}
    </div>
  );
  /* eslint-enable camelcase */
};

TalkingPointsGrid.propTypes = {
  maxBlockSizePx: PropTypes.number,
  minBlockSizePx: PropTypes.number,
};

TalkingPointsGrid.defaultProps = {
  maxBlockSizePx: 420,
  minBlockSizePx: 340,
};

export default TalkingPointsGrid;
