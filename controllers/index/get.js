const LINKS = [
  {
    name: 'github',
    url: 'https://github.com/necipsagiro'
  },
  {
    name: 'e-mail',
    url: 'mailto:necipsagiroglu@gmail.com'
  },
  {
    name: 'linkedin',
    url: 'https://linkedin.com/in/necipsagiro'
  },
  {
    name: 'x',
    url: 'https://x.com/necipsagiro'
  }
];

export default (req, res) => {
  return res.render('index/index', {
    page: 'index/index',
    title: 'necipsagiro.dev',
    includes: {
      css: ['page', 'general'],
      js: ['page']
    },
    links: LINKS,
  });
};
