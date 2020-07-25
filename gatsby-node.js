exports.onCreatePage = ({ page, actions }) => {
  const { createPage } = actions;
  if (page.path === '/') {
    // eslint-disable-next-line no-param-reassign
    page.matchPath = '/*';

    createPage(page);
  }
};
