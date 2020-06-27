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

  const talkingPoints = useMemo(
    () =>
      nodes.map((node, i) => {
        const random = seedrandom(i);
        const randomHue = 20 + 20 * random();
        const randomSaturation = 30 + 50 * random();
        const randomLightness = 10 + 70 * random();

        const color = tinycolor(
          `hsla(${randomHue}, ${randomSaturation}%, ${randomLightness}%, 1)`
        ).toHexString();

        const contrastColor = tinycolor
          .mostReadable(color, ['#000', '#fff'])
          .toHexString();

        return {
          ...node.frontmatter,
          color,
          contrastColor,
        };
      }),
    [nodes]
  );

  return talkingPoints;
}
