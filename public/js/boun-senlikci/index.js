function fillCourses(courses) {
  const iframe = document.getElementById("ifCPL");

  courses.forEach((course, i) => {
    const courseName = course.split(" ")[0];
    const courseCode = course.split(" ")[1].split(".")[0];
    const courseSection = course.split(".")[1];

    iframe.querySelector(`[name="abbr${i + 1}"]`).value = courseName;
    iframe.querySelector(`[name="code${i + 1}"]`).value = courseCode;
    iframe.querySelector(`[name="section${i + 1}"]`).value = courseSection;
  });

  iframe.querySelector('input[value=\'Quick Add\']').click();
};

window.addEventListener('load', () => {
  const COURSE_INPUT_REGEX = /^([a-zA-Z]+)\s([0-9]+)\.([0-9]+)$/;
  const COURSE_INPUT_PLACEHOLDER = document.querySelector('.each-course-input').getAttribute('placeholder');

  const dragButton = document.getElementById('drag-button');

  document.addEventListener('input', event => {
    if (event.target.closest('.each-course-input')) {
      const changedInput = event.target.closest('.each-course-input');

      if (changedInput.value) {
        if (COURSE_INPUT_REGEX.test(changedInput.value)) {
          changedInput.classList.remove('each-course-input-invalid');
        };

        if (!changedInput.nextElementSibling.classList.contains('each-course-input') && document.querySelectorAll('.each-course-input').length < 10) {
          const newInput = document.createElement('input');

          newInput.classList.add('each-course-input');
          newInput.setAttribute('placeholder', COURSE_INPUT_PLACEHOLDER);

          changedInput.after(newInput);
        }
      } else {
        if (changedInput.nextElementSibling.classList.contains('each-course-input')) {
          changedInput.nextElementSibling.remove();
        };
      };

      const coursesArray = Array.from(document.querySelectorAll('.each-course-input'))
        .map(input => input.value.toUpperCase())
        .filter(ders => ders.trim() != "");

      console.log(coursesArray);

      dragButton.setAttribute('href', `javascript: (() => { ${fillCourses.toString()}; ${fillCourses.name}(${JSON.stringify(coursesArray)}); })();`);
    };
  });

  document.addEventListener('focusout', event => {
    if (event.target.closest('.each-course-input')) {
      const focusLostInput = event.target.closest('.each-course-input');

      focusLostInput.classList.toggle('each-course-input-invalid',
        focusLostInput.value && !COURSE_INPUT_REGEX.test(focusLostInput.value)
      );
    };
  });

  document.addEventListener('keyup', event => {
    if (event.key == 'Enter' && document.activeElement.closest('.each-course-input')) {
      const focusedInput = document.activeElement.closest('.each-course-input');

      focusedInput.value = focusedInput.value.trim();
      focusedInput.nextElementSibling.focus();
    };

    if (event.key == 'Backspace' && document.activeElement.closest('.each-course-input')) {
      const focusedInput = document.activeElement.closest('.each-course-input');

      if (!focusedInput.nextElementSibling.classList.contains('each-course-input')) {
        focusedInput.previousElementSibling.focus();
        focusedInput.setSelectionRange(focusedInput.value.length, focusedInput.value.length);
      };
    };
  });
});
