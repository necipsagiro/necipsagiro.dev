import { JSX } from 'preact';

export function TextInput(props: JSX.HTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      class={`w-fit p-2 border border-[#BA9780] bg-[#FFFFF] text-sm outline-none placeholder:font-light ${props.class}`}
    />
  );
};
