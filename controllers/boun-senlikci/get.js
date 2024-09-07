const COURSES_PLACEHOLDER = [
  'HUM 101.03',
  'PE 152.02',
  'PHIL 112.01'
];

export default (req, res) => {
  return res.render('boun-senlikci/index', {
    page: 'boun-senlikci/index',
    title: 'boun şenlikçi',
    includes: {
      css: ['page', 'general', 'form'],
      js: ['page', 'form']
    },
    courses_placeholder: COURSES_PLACEHOLDER,
    is_mobile: req.useragent.isMobile
  });
};
