window.addEventListener('load', () => {
  const textareaLineHeight = getComputedStyle(document.documentElement).getPropertyValue('--textarea-line-height');

  document.addEventListener('input', event => {
    if (event.target.closest('textarea')) {
      const textarea = event.target.closest('textarea');

      textarea.style.height = 0;
      textarea.style.height = `${textarea.scrollHeight + 2}px`;
    };
  });
});
