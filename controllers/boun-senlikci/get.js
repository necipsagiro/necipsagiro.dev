export default (req, res) => {
  return res.render('boun-senlikci/index', {
    page: 'boun-senlikci/index',
    title: 'Boun Şenlikçi',
    includes: {
      css: ['page', 'general', 'form'],
      js: ['page', 'form']
    }
  });
};
