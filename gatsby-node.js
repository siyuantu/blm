exports.onCreatePage = ({ page, actions }) => {
  const { createPage } = actions;
  if (page.path === '/') {
    createPage({
      ...page,
      matchPath: '/*',
    });
  }
};
