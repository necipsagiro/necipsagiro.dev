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
};

window.addEventListener('load', () => {
  const dragButton = document.getElementById('drag-button');

  document.addEventListener('input', event => {
    if (event.target.closest('#courses-input')) {
      const coursesArray = event.target.closest('#courses-input').value.split('\n').filter(ders => ders.trim() != "");

      dragButton.setAttribute('href', `javascript: (() => { ${fillCourses.toString()}; ${fillCourses.name}(${JSON.stringify(coursesArray)}); })();`);
    };
  });
});
