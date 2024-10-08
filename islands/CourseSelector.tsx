import { useSignal } from '@preact/signals';
import { TextInput } from '../components/TextInput.tsx';
import { fillCourses } from '../utils/fillCourses.js';

const COURSE_CODE_REGEX = /([a-zA-Z0-9]+)\s([a-zA-Z0-9]+)\.(\d+)/;
const COURSE_PLACEHOLDER = 'CMPE 321.01';

interface CourseSelectorProps {
  courses: string[];
};

const isCourseCodeValid = (course: string) => {
  return !course || COURSE_CODE_REGEX.test(course);
};

export function CourseSelector(props: CourseSelectorProps) {
  const courses = useSignal(props.courses);

  const updateCourseInputValues = (index: number, input_value: string) => {
    let updatedCourses = [...courses.value];

    updatedCourses[index] = input_value;

    if (index === courses.value.length - 1 && input_value !== '' && isCourseCodeValid(input_value))
      updatedCourses = [...updatedCourses, ''];

    courses.value = updatedCourses;

    globalThis.document.cookie = `courses=${JSON.stringify(courses.value.filter((course: string) => course !== '')) + '; path=/boun-senlikci; max-age=2400000'}`;
  };

  const removeEmptyCourseInputs = (index: number, input_value: string) => {
    if (!input_value && index !== courses.value.length - 1)
      courses.value = [...courses.value.filter((course: string) => course !== ''), ''];
  };

  const dragButtonHref = `javascript: (() => { ${fillCourses.toString()}; ${fillCourses.name}('${String(courses)}'); })();`;

  return (
    <>
      {courses.value.map((course: string, index: number) => (
        <TextInput
          key={index}
          type='text'
          placeholder={COURSE_PLACEHOLDER}
          value={course}
          class={isCourseCodeValid(course) ? '' : 'border-[#F15A0E]'}
          onInput={(event: InputEvent) => updateCourseInputValues(index, event.currentTarget.value)}
          onBlur={(event: FocusEvent) => removeEmptyCourseInputs(index, event.currentTarget.value)}
        />
      ))}
      <a
        href={dragButtonHref}
        class='p-2 px-3 border border-[#BA9780] outline-none w-fit bg-[#BA9780] text-sm'
      >
        sürükle
      </a>
    </>
  );
};
