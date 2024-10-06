import { Separator } from "../components/Separator.tsx";
import { VerticalSeparator } from "../components/VerticalSeparator.tsx";

const LINKS = [
  {
    name: 'github',
    url: 'https://github.com/necipsagiro'
  },
  {
    name: 'e-mail',
    url: 'mailto:necipsagiroglu@gmail.com'
  },
  {
    name: 'linkedin',
    url: 'https://www.linkedin.com/in/necipsagiroglu/'
  },
  {
    name: 'x',
    url: 'https://x.com/necipsagiro'
  }
];

export default function Home() {
  return (
    <>
      <h1 class='text-3xl'>necipsagiro.dev</h1>
      <Separator />
      <div class='flex gap-2'>
        {LINKS.map((link, index) => (
          <>
            <a target='_blank' href={link.url} class='hover:underline'>{link.name}</a>
            {index !== LINKS.length - 1 && <VerticalSeparator/>}
          </>
        ))}
      </div>
    </>
  );
};
