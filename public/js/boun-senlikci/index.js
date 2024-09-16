function fillCourses(courses) {
  const iframe = document.getElementById('fCPL').contentDocument;

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

      currentCoursesArray = getCoursesArrayFromInputs();

      Cookies.set('courses', JSON.stringify(currentCoursesArray), {
        domain: window.location.hostname,
        expires: 7,
        path: window.location.pathname,
        sameSite: 'strict',
        secure: true
      });

      setDragButtonSrc(currentCoursesArray);
    };
  });

  document.addEventListener('focusout', event => {
    if (event.target.closest('.each-course-input')) {
      const courseInputs = document.querySelectorAll('.each-course-input');

      for (let i = 0; i < courseInputs.length - 1; i++)
        if (!courseInputs[i].value)
          courseInputs[i].remove();
    };
  });
});
