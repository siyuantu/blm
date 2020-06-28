import { useMemo } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import seedrandom from 'seedrandom';
import tinycolor from 'tinycolor2';

const query = graphql`
  query IndexPageTemplate {
    allMarkdownRemark {
      nodes {
        frontmatter {
          title
          title_zh
          rebuttal
          rebuttal_zh
        }
      }
    }
  }
`;

export default function useTalkingPoints() {
  const data = useStaticQuery(query);

  const { nodes } = data.allMarkdownRemark;

  const isTestMode = window.location.search === '?test';

  const entries = isTestMode
    ? new Array(16).fill(null).map((_, i) => ({
        ...nodes[0],
        frontmatter: {
          ...nodes[0].frontmatter,
          title: `${nodes[0].frontmatter.title} ${i}`,
        },
      }))
    : nodes;

  const talkingPoints = useMemo(
    () =>
      entries.map((entry, i) => {
        const random = seedrandom(i);
        const randomHue = 15 + 20 * random();
        const randomSaturation = 30 + 20 * random();
        const randomLightness = 5 + 60 * random() ** 2;

        const color = tinycolor(
          `hsla(${randomHue}, ${randomSaturation}%, ${randomLightness}%, 1)`
        ).toHexString();

        const contrastColor = tinycolor
          .mostReadable(color, ['#000', '#fff'])
          .toHexString();

        return {
          ...entry.frontmatter,
          color,
          contrastColor,
        };
      }),
    [entries]
  );

  return talkingPoints;
}
