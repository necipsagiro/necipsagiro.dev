const COURSE_INPUT_PLACEHOLDER = 'CMPE 321.01';
const COURSE_INPUT_REGEX = '^([a-zA-Z]+)\\s([0-9]+)\\.([0-9]+)$';
const DRAG_BUTTON_DEFAULT_TITLE = 'seçmek istediğiniz dersleri ekleyin';

export default (req, res) => {
  let courses = [];

  try {
    const parsed = JSON.parse(req.cookies.courses);

    if (Array.isArray(parsed))
      courses = parsed;
  } catch (err) {
    console.error('No courses found in cookies');
  };

  return res.render('boun-senlikci/index', {
    page: 'boun-senlikci/index',
    title: 'boun şenlikçi',
    includes: {
      css: ['page', 'general', 'form'],
      js: ['page', 'form', 'serverRequest', 'course-input', 'cookie-api']
    },
    courses: courses,
    course_input_placeholder: COURSE_INPUT_PLACEHOLDER,
    course_input_pattern: COURSE_INPUT_REGEX,
    drag_button_default_title: DRAG_BUTTON_DEFAULT_TITLE
  });
};
