export default {
  index: {
    title: 'Introduction',
    type: 'page',
    display: 'hidden'
  },
  about: {
    type: 'page',
    title: 'About',
  },
  tags: {
    type: 'page',
    title: 'Tags',
    theme: {
      sidebar: true,
      toc: true,
    }
  },
  posts: {
    type: 'page',
    title: 'Blog',
    theme: {
      sidebar: false,
      toc: true,
      breadcrumb: true,
      typesetting: 'article'
    }
  },
}
