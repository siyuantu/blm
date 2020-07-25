import { useMemo } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

const query = graphql`
  query pages {
    pages: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/pages/" } }
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

export default function usePages() {
  const data = useStaticQuery(query);

  const { nodes: pageNodes } = data.pages;

  return useMemo(() => pageNodes.map(({ frontmatter }) => frontmatter), [
    pageNodes,
  ]);
}
