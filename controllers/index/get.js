export default (req, res) => {
  return res.render('index/index', {
    page: 'index/index',
    title: 'necipsagiro.dev',
    includes: {
      css: ['page', 'general'],
      js: ['page']
    }
  });
};
