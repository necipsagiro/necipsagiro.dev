const COURSE_INPUT_PLACEHOLDER = 'CMPE 321.01';
const COURSE_INPUT_REGEX = '^([a-zA-Z]+)\\s([0-9]+)\\.([0-9]+)$';
const DRAG_BUTTON_DEFAULT_TITLE = 'seçmek istediğiniz dersleri ekleyin';

export default (req, res) => {
  const courses = Array.isArray(req.session.courses) ? req.session.courses : [];

  return res.render('boun-senlikci/index', {
    page: 'boun-senlikci/index',
    title: 'boun şenlikçi',
    includes: {
      css: ['page', 'general', 'form'],
      js: ['page', 'form', 'serverRequest', 'course-input']
    },
    courses: courses,
    course_input_placeholder: COURSE_INPUT_PLACEHOLDER,
    course_input_pattern: COURSE_INPUT_REGEX,
    drag_button_default_title: DRAG_BUTTON_DEFAULT_TITLE
  });
};
