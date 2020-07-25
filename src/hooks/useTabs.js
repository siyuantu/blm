import { useMemo } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

const query = graphql`
  query tabs {
    tabs: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/tabs/" } }
      sort: { fields: frontmatter___order }
    ) {
      nodes {
        frontmatter {
          title
          title_zh
          content
          content_zh
          url
        }
      }
    }
  }
`;

export default function useTabs() {
  const data = useStaticQuery(query);

  const { nodes: tabNodes } = data.tabs;

  return useMemo(() => tabNodes.map(({ frontmatter }) => frontmatter), [
    tabNodes,
  ]);
}
