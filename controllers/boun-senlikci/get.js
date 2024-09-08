const COURSE_PLACEHOLDER = 'CMPE 321.01';

export default (req, res) => {
  return res.render('boun-senlikci/index', {
    page: 'boun-senlikci/index',
    title: 'boun şenlikçi',
    includes: {
      css: ['page', 'general', 'form'],
      js: ['page', 'form']
    },
    course_placeholder: COURSE_PLACEHOLDER,
    is_mobile: req.useragent.isMobile
  });
};
