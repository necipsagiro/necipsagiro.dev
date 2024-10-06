import { JSX } from 'preact';

export function Title(props: JSX.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      {...props}
      class='text-3xl'
    />
  );
};
