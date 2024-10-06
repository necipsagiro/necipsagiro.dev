export function fillCourses(courses) {
  courses = courses.split(',').filter(course => course);

  const iframe = document.getElementById('fCPL')?.contentDocument;

  courses.forEach((course, i) => {
    if (!course || typeof course !== 'string' || course.trim().length === 0)
      return;

    const courseName = course.split(' ')[0]
    const courseCode = course.split(' ')[1]?.split('.')[0];
    const courseSection = course.split('.')[1];

    console.log(`Course ${i + 1}: ${courseName} ${courseCode} ${courseSection}`);

    if (!iframe) return;

    iframe.querySelector(`[name='abbr${i + 1}']`).value = courseName;
    iframe.querySelector(`[name='code${i + 1}']`).value = courseCode;
    iframe.querySelector(`[name='section${i + 1}']`).value = courseSection;
  });

  if (iframe)
    iframe?.querySelector('input[value=\'Quick Add\']').click();
};
