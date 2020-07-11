import { useMemo } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

const query = graphql`
  query IndexPageTemplate {
    talkingPointData: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/talking_points/" } }
    ) {
      nodes {
        frontmatter {
          category
          color
          title
          title_zh
          rebuttal
          rebuttal_zh
          ask_yourself
          ask_yourself_zh
          background_image_alignment
          background_image_url
          read_more {
            link_title
            source
            url
          }
        }
      }
    }

    categoryData: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/categories/" } }
    ) {
      nodes {
        frontmatter {
          title
          title_zh
        }
      }
    }
  }
`;

export default function useTalkingPoints() {
  const data = useStaticQuery(query);

  const { nodes: talkingPointNodes } = data.talkingPointData;
  const { nodes: categoryNodes } = data.categoryData;

  const isTestMode =
    typeof window !== 'undefined' && window.location.search === '?test';

  const entries = isTestMode
    ? new Array(16).fill(null).map((_, i) => ({
        ...talkingPointNodes[0],
        frontmatter: {
          ...talkingPointNodes[0].frontmatter,
          title: `${talkingPointNodes[0].frontmatter.title} ${i}`,
        },
      }))
    : talkingPointNodes;

  const talkingPoints = useMemo(
    () =>
      entries.map(({ frontmatter }) => {
        const categoryEntry = categoryNodes.find(
          (category) => category.frontmatter.title === frontmatter.category
        );

        return {
          ...frontmatter,
          category: categoryEntry.frontmatter,
        };
      }),
    [entries, categoryNodes]
  );

  return talkingPoints;
}
