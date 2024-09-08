const COURSE_PLACEHOLDER = 'CMPE 321.01';
const DRAG_BUTTON_DEFAULT_TITLE = 'seçmek istediğiniz dersleri ekleyin';

export default (req, res) => {
  return res.render('boun-senlikci/index', {
    page: 'boun-senlikci/index',
    title: 'boun şenlikçi',
    includes: {
      css: ['page', 'general', 'form'],
      js: ['page', 'form']
    },
    course_placeholder: COURSE_PLACEHOLDER,
    is_mobile: req.useragent.isMobile,
    drag_button_default_title: DRAG_BUTTON_DEFAULT_TITLE
  });
};
