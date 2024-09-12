function fillCourses(courses) {
  const iframe = document.getElementById('fCPL');

  courses.forEach((course, i) => {
    const courseName = course.split(' ')[0];
    const courseCode = course.split(' ')[1].split('.')[0];
    const courseSection = course.split('.')[1];

    iframe.querySelector(`[name='abbr${i + 1}']`).value = courseName;
    iframe.querySelector(`[name='code${i + 1}']`).value = courseCode;
    iframe.querySelector(`[name='section${i + 1}']`).value = courseSection;
  });

  iframe.querySelector('input[value=\'Quick Add\']').click();
};

function getCoursesArrayFromInputs() {
  return Array.from(document.querySelectorAll('.each-course-input'))
    .map(input => input.value.toUpperCase())
    .filter(ders => ders.trim());
};

function setDragButtonSrc(coursesArray) {
  const dragButton = document.getElementById('drag-button');

  dragButton.setAttribute('href', `javascript: (() => { ${fillCourses.toString()}; ${fillCourses.name}(${JSON.stringify(coursesArray)}); })();`);
  dragButton.setAttribute('title', coursesArray.join('\n') || dragButton.getAttribute('data-default-title'));
};

function setCoursesInSession(coursesArray) {
  serverRequest('/boun-senlikci', 'POST', {
    courses: coursesArray
  }, (err, res) => {
    if (err || !res.ok)
      return console.error(err);
  });
};

window.addEventListener('load', () => {
  setDragButtonSrc(getCoursesArrayFromInputs());

  const COURSE_INPUT_PLACEHOLDER = document.querySelector('.each-course-input').getAttribute('placeholder');
  const COURSE_INPUT_PATTERN = document.querySelector('.each-course-input').getAttribute('pattern');

  document.addEventListener('input', event => {
    if (event.target.closest('.each-course-input')) {
      const changedInput = event.target.closest('.each-course-input');

      if (changedInput.value && changedInput == changedInput.parentElement.lastElementChild && document.querySelectorAll('.each-course-input').length < 10 && changedInput.checkValidity()) {
        changedInput.insertAdjacentHTML('afterend', courseInputTemplate({
          value: '',
          course_input_placeholder: COURSE_INPUT_PLACEHOLDER,
          course_input_pattern: COURSE_INPUT_PATTERN
        }));
      };

      setDragButtonSrc(getCoursesArrayFromInputs());
    };
  });

  document.addEventListener('focusout', event => {
    if (event.target.closest('.each-course-input')) {
      const courseInputs = document.querySelectorAll('.each-course-input');

      for (let i = 0; i < courseInputs.length - 1; i++)
        if (!courseInputs[i].value)
          courseInputs[i].remove();

      setCoursesInSession(getCoursesArrayFromInputs());
    };
  });

  document.addEventListener('keyup', event => {
    if (event.key == 'Enter' && document.activeElement.closest('.each-course-input') && document.activeElement != document.activeElement.parentElement.lastElementChild) {
      const focusedInput = document.activeElement.closest('.each-course-input');

      focusedInput.value = focusedInput.value.trim();
      focusedInput.nextElementSibling.focus();
    };
  });
});
